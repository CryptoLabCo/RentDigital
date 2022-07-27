// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import './USDT.sol';
//import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SignedMath.sol";

contract RDAsset is ERC20 {

    // Contracts Section
    address public admin;
    IERC20 public usdt; // Pointer to the IERC20 USDT Token smart contract

    // Deployment Section
    uint256 public fixedSupply; // Total supply of tokens which represents 1 share per token. This is equal to the Investment Asset price.

    // Renter Section
    uint256 public totalRentalIncome;
    mapping(address => uint256) public rentalBalances; // The rental balances for all accounts the paid rent 

    // Shareholder Section
    uint256 public totalSharesPurchased;
    struct Shareholder {

        uint256 totalProceedsGained;
        uint256 currentProceedsAvailable;
        uint256 totalShares;
        bool isActive; // Default is false. If set to true then this Shareholder has been initalized and we are using it
    }
    address[] shareholderList; // Arrary of Shareholders
    mapping(address => Shareholder) shareholderInfo; // Mapping of Shareholder Struct
    
    // Events Section
    //event DepositRent (address indexed sender, uint256 amount);
    //event PurchaseShares (address indexed sender, uint256 amount);
    //event SellShares (address indexed sender, uint256 amount);
    //event WithdrawProceeds(address indexed sender, uint256 amount);

    // DEFINE: General Constructor
    // @_fixedSupply: Number of shares(tokens) that will be available. Should be EXACT same price as the Investment Asset price
    // @_usdtAddress: USDT smart contract address is always the same on Mainnet. But, we want to pass it into this contract when on localhost/testnet. 
    // Will create a moch USDT smart contract for testing 
    constructor(uint256 _fixedSupply, address usdtAddress) ERC20('Rent Digital Asset 1', 'RDA1') {
            
        // Set global variables
        admin = msg.sender;
        usdt = IERC20(usdtAddress); // Use OZ Interface to set the address of USDT; localhost, Testnet, Mainnet
        fixedSupply = _fixedSupply; 

        // Use the ERC20 Smart Contract built-in function
        _mint(admin, _fixedSupply); 
    }

    // DEFINE: Deposit tokens into the RDAsset smart contract to pay for investment peoperty rent
    // @_tokenAmount: Amount of tokens being deposited into this smart contract
    function depositRent(uint256 _tokenAmount) external payable {
            
        totalRentalIncome += _tokenAmount;

        // Add rent to this account total
        rentalBalances[msg.sender] += _tokenAmount;

        // Used to transfer tokens on behalf of someone else: Renter 
        // Use TransferFrom so we can react to the incoming transfer
        // PARAMS: from address, to this smart contract, amount of tokens
        usdt.transferFrom(msg.sender, address(this), _tokenAmount);
                
        // Calculate and Assign proceeds of the rent that was just deposited to 
        // the existing shareholders based on there current share percentage
        _assignProceeds(_tokenAmount);        

        //emit DepositRent(msg.sender, _tokenAmount);
    }

    // DEFINE: Assigns the Rent Deposits to each shareholder based on proration of share count
    // @_rent: The amount of investment property rent that was just deposited
    function _assignProceeds(uint256 _rent) private {

        // Set the shareholderList array length to save gas
        uint256 shareholderCount = shareholderList.length;

        address shareholderCurrentAddress;
        uint256 shareholderTotalProceedsGained;
        uint256 shareholderCurrentProceedsAvailable;
        uint256 shareholderCurrentTotalShares;

        // Factor: Used to get rid of decimal issues in math calculations. Based on number of token decimals
        uint256 factor = 10**18;

        // Iterate through shareholder List and update Shareholder Information
  	    for (uint i = 0; i < shareholderCount; i++){
            
            shareholderCurrentAddress = shareholderList[i];

            // Current number of shares of the Shareholder
  		    shareholderCurrentTotalShares = shareholderInfo[shareholderCurrentAddress].totalShares;
            
            // Calculate the amount of proceeds the shareholder receives based on the number of shares they currently have 
            // Factor: Used to get rid of decimal issues in math calculations. Based on number of token decimals
            shareholderTotalProceedsGained = shareholderInfo[shareholderCurrentAddress].totalProceedsGained + ((((shareholderCurrentTotalShares * factor) / fixedSupply) * _rent) / factor); 
            shareholderCurrentProceedsAvailable = shareholderInfo[shareholderCurrentAddress].currentProceedsAvailable + ((((shareholderCurrentTotalShares * factor) / fixedSupply) * _rent) / factor); 
            
            // Create a new Struct Shareholder that will be used to update the Shareholder Info for mapping address
            Shareholder memory updateShareholder = Shareholder(shareholderTotalProceedsGained, shareholderCurrentProceedsAvailable, shareholderCurrentTotalShares, true);

            // Update the Shareholder Info mapping with new Struct Info
            shareholderInfo[shareholderList[i]] = updateShareholder;            
  	    }
    }

    // DEFINE: Gets the USDT balance for all rent paid based on selected account
    function getRentalBalance() external view returns(uint256) {
        return rentalBalances[msg.sender];
    }

    // DEFINE: Gets the USDT for Total Proceeds Gained on all rent proceeds on selected account
    function getShareholderTotalProceedsGained() external view returns(uint256) {
        return shareholderInfo[msg.sender].totalProceedsGained;
    }

    // DEFINE: Gets the USDT balance for Current Proceeds Gained on all rent proceeds on selected account
    function getShareholderCurrentProceedsAvailable() external view returns(uint256) {
        return shareholderInfo[msg.sender].currentProceedsAvailable;
    }

    // DEFINE: Purchase shares of the investment property using USDT  
    // @_amountShares: Amount of shares to buy. Each USDT gets 1 share
    function purchaseShares(uint256 _amountShares) external payable {

        totalSharesPurchased += _amountShares;

        
        // IF: Existing Shareholder Struct in mapping
        // ELSE: New Shareholder: Must create new Shareholder in a mapping
        if (shareholderInfo[msg.sender].isActive == true) {
        
            // Update shares amount for this account
            shareholderInfo[msg.sender].totalShares += _amountShares;
        }
        else{
            shareholderList.push(msg.sender); // Add to arrary of Shareholders

            // Create a new Struct Shareholder that will be used to update the Shareholder Info for mapping address
            Shareholder memory newShareholder = Shareholder(0, 0, _amountShares, true);

            // Add the Shareholder information mapping with new Struct Info
            shareholderInfo[msg.sender] = newShareholder;            
        }
        
        // Used to transfer tokens on behalf of someone else: Shareholder 
        // Use PurchaseShares so we can react to the incoming transfer
        // PARAMS: from address, to this smart contract, amount of tokens
        usdt.transferFrom(msg.sender, address(this), _amountShares);
    }

    // DEFINE: Sell shares of the investment property using USDT  
    // @_amountShares: Amount of shares to sell. Each share gets 1 USDT
    function sellShares(uint256 _amountShares) external payable {
        
        require(shareholderInfo[msg.sender].isActive == true, 'You are not a shareholder');
        require(shareholderInfo[msg.sender].totalShares >= _amountShares, 'You do not have enough shares to sell selected amount');
        require(usdt.balanceOf(address(this)) >= _amountShares, 'Rent Digital Asset contract does not have enough USDT to refund this amount');
        
        totalSharesPurchased -= _amountShares;

        // Update shares amount for this account
        shareholderInfo[msg.sender].totalShares -= _amountShares;
        
        // Used to transfer tokens on behalf of someone else: Shareholder 
        // Use PurchaseShares so we can react to the incoming transfer
        // PARAMS: from this contract, to adddress, amount of tokens
        //usdt.transferFrom(address(this), msg.sender, _amountShares);
        usdt.transfer(msg.sender, _amountShares);
    }

    // DEFINE: Gets the invested shares on selected account
    function getShareBalance() external view returns(uint256) {
        return shareholderInfo[msg.sender].totalShares;
    }

    // Withdraw all outstanding proceeds to the shareholder
    function withdrawProceeds() public {
        
        // Validate the sender address is a shareholder
        require(shareholderInfo[msg.sender].isActive == true, 'You are not a shareholder');

        // Validate the shareholder has proceeds to withdraw
        require(shareholderInfo[msg.sender].currentProceedsAvailable > 0, 'You do not have any proceeds to withdraw');

        // Call private function to withdraw proceeds for the shareholder
        _withdrawProceeds(msg.sender);

        //emit WithdrawProceeds(msg.sender, shareholderInfo[msg.sender].currentProceedsAvailable);
    } 

    // Private function to perform shareholder Withdraw Proceeds
    function _withdrawProceeds(address sharehoder) private {

        uint256 shareholderCurrentProceedsAvailable  = shareholderInfo[msg.sender].currentProceedsAvailable;

        // Reset the Current proceeds available to 0
        shareholderInfo[msg.sender].currentProceedsAvailable = 0;

        // Used to transfer tokens on behalf of someone else: Shareholder 
        // Use WithdrawProceeeds so we can react to the incoming transfer
        // PARAMS: from this contract, to adddress, amount of tokens
        //usdt.transferFrom(address(this), sharehoder, shareholderCurrentProceedsAvailable);
        usdt.transfer(sharehoder, shareholderCurrentProceedsAvailable);
    }

    // DEFINE: General deposit function for adding ether to smart contract for general processing of transactions
    receive() external payable {
        
    }

}