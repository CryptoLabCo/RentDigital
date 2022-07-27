//import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

// @useState remember variables on page
import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';

// Allows us to connect to our SMart Contract through this JSON file
import RDAsset_abi from '../../RDAsset_abi.json';

// Allows us to use the dotenv file
require('dotenv').config()

//const RDAssetAddress = process.env.RENTDIGITAL_SMART_CONTRACT_ADDR;



//class CaetV1 extends Component {
	
	
	const CartV1 = () => {
    
        let publicUrl = process.env.PUBLIC_URL+'/'
		
		// Declare Variables and the functions to update them
		const [errorMessage, setErrorMessage] = useState(null);
		const [defaultAccount, setDefaultAccount] = useState(null);
		const [userBalance, setUserBalance] = useState(null);
		const [connButtonText, setConnButtonText] = useState('Connect Wallet');
		const [provider, setProvider] = useState(null);
		const [signer, setSigner] = useState(null);
		const [contract, setContract] = useState(null);

		const [userTokenBalance, setUserTokenBalance] = useState(null);
		const [tokenName, setTokenName] = useState(null);

		const [contractBalance, setContractBalance] = useState(null);

		const [totalIncome, setTotalIncome] = useState(null);
		////////////////////////////////////////////////////////////////////////////////////////

		const [transferHash, setTransferHash] = useState();

		const [totalTokenSupply, setTotalTokenSupply] = useState(null);

		const RDAssetAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
		const USDTAddress = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";

		//async function handleMint(){
		{/* */}
		const handleMint = async () => {
			if (window.ethereum){
				
					// Creates an edit connection to our Smart Contract on TestNet
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const signer = provider.getSigner();
					const contract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, signer);
				
				try{
					//const response = await contract.fixedSupply;
					//setFixedSupply("100");
					//console.log("Response: ", response);
					//setErrorMessage(response);

				} catch (err){
					console.log("Error: ", err);
					setErrorMessage(err);
				}


			} else if (!window.ethereum){
				console.log('Need to install MetaMask');
				setErrorMessage('Please install MetaMask browser extension to interact');
			}

		}
		
		////////////////////////////////////////////////////////////////////////////////////////

		// Set these the Smart Contract connection so it can be used accross all functions on this page
		const updateEthers = () => {

			// Creates a read/write connection to our Smart Contract on TestNet/Mainnet
			let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
			setProvider(tempProvider);

			let tempSigner = tempProvider.getSigner();
			setSigner(tempSigner);

			let tempContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, tempSigner);
			setContract(tempContract);
		}
		
		// This runs when page is first rendered and everytime the item in the [] gets changed. It can be a state variable or the smart contract
		// In this case everytime the Contract changes this block of code runs
		useEffect(() => {
			if(contract != null){
				updateBalance();
				updateTokenName();
				getTotalTokenSupply();
				getContractBalance();
				getTotalIncome();
			};
		}, [contract]);

		//const transferShares = async (_amountShares) => {
		const purchaseShares = async (e) => {

			// Prevent from reloading the page
			e.preventDefault();

			// Get form values
			let amountShares = e.target.amountShares.value;
			

			// Call Smart Contract and Transfer shares to users account 
			let txt = await contract.purchaseShares(ethers.utils.parseEther(amountShares))
			
			// Set the Transaction Hash Code
			setTransferHash("Transfer confirmation hash: " + txt.hash);
			//setTransferHash("Transfer confirmation hash: " + amountShares);
		}






		const getContractBalance = async () => {

			// Get Token amount for the selected user account
			let balanceBigN = await contract.balanceOf("0x6C6f3Ed0E1b821e9Dd7C9774c1BBbd52EF0a4F8D");

			// Get number of decimals for Smart Contract
			let tokenDecimals = await contract.decimals();

			// Convert Big Numbers
			let tokenBalance = balanceBigN / Math.pow(10, tokenDecimals);

			// Gets rid of scientific notation
			//setContractBalance(ethers.utils.formatEther(tokenBalance));
			//setContractBalance(toFixed(tokenBalance));	
			//setContractBalance(tokenBalance);	
			setContractBalance(ethers.utils.formatEther(tokenBalance));


			
		}

		const updateBalance = async () => {

			// Get Token amount for the selected user account
			let balanceBigN = await contract.balanceOf(defaultAccount);

			// Get number of decimals for Smart Contract
			let tokenDecimals = await contract.decimals();

			// Convert Big Numbers
			let tokenBalance = balanceBigN / Math.pow(10, tokenDecimals);

			// Gets rid of scientific notation
			setUserTokenBalance(toFixed(tokenBalance));	
			//setUserTokenBalance(ethers.utils.formatEther(tokenBalance));
		}

		// Gets rid of scientific notation
		function toFixed(x) {
			if (Math.abs(x) < 1.0) {
			   var e = parseInt(x.toString().split('e-')[1]);
			   if (e) {
				  x *= Math.pow(10, e - 1);
				  x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
			   }
			} else {
			   var e = parseInt(x.toString().split('+')[1]);
			   if (e > 20) {
				  e -= 20;
				  x /= Math.pow(10, e);
				  x += (new Array(e + 1)).join('0');
			   }
			}
			return x;
		 }

		const updateTokenName = async () => {

			setTokenName(await contract.name());
		}

		// Gets the Total Supply of Tokens created for this Smart Contract
		const getTotalTokenSupply = async () => {

			// Get Total Tokens in Smart Contract
			let tempTotalTokenSupply = await contract.totalSupply();

			// Get number of decimals for Smart Contract
			let tokenDecimals = await contract.decimals();

			// Convert Big Numbers
			let TotalTokenSupply = tempTotalTokenSupply / Math.pow(10, tokenDecimals);

			// Gets rid of scientific notation
			setTotalTokenSupply(toFixed(TotalTokenSupply));	
		}

		// Gets the Total Income of the Smart Contract
		const getTotalIncome = async () => {

			let tempTotalIncome = await contract.totalIncome();

			// Get number of decimals for Smart Contract
			let tokenDecimals = await contract.decimals();

			// Convert Big Numbers
			let TotalIncome = tempTotalIncome / Math.pow(10, tokenDecimals);

			// Gets rid of scientific notation
			setTotalIncome(toFixed(TotalIncome));	
		}


		//const transferShares = async (_amountShares) => {
		const transferShares = async (e) => {

			// Prevent from reloading the page
			e.preventDefault();

			// Get form values
			let transferAmount = e.target.transferAmount.value;
			let recieverAddress = e.target.recieverAddress.value;

			// Call Smart Contract and Transfer shares to users account 
			let txt = await contract.transferShares(recieverAddress, ethers.utils.parseEther(transferAmount))
			
			// Set the Transaction Hash Code
			setTransferHash("Transfer confirmation hash: " + txt.hash);
		}

		
		//const transferShares = async (_amountShares) => {
		const depositRent = async (e) => {

			// Account 1:  
			// 0.2473
			// 1749000

			// Jane:  2 entry at 0.1 1 entry at 0.006
			// 0
			// 1000
			
			// RenterBob:  
			// 0.2
			// 0

			// Prevent from reloading the page
			e.preventDefault();

			// Get form values
			let rentAmount = e.target.rentAmount.value;
			
			// Call Smart Contract and Deposit Rent to Smart Contract
			//let txt = await contract.transferShares(ethers.utils.parseEther(rentAmount))
			//let txt = await contract.transferShares("1000")
			
			
			//let txt = await contract.transferFrom(defaultAccount, RDAssetAddress, rentAmount)

			let txt = await signer.sendTransaction({
                to: RDAssetAddress,
                value: ethers.utils.parseEther(rentAmount),
            }) 


			// Set the Transaction Hash Code
			setTransferHash("Transfer confirmation hash: " + txt.hash);
			//setTransferHash(rentAmount);
			

		}

		const connectWalletHandler = async () => {
			if (window.ethereum && defaultAccount == null) {
				
				
				
				// set ethers provider
				setProvider(new ethers.providers.Web3Provider(window.ethereum));

				// connect to metamask
				window.ethereum.request({ method: 'eth_requestAccounts'})
				.then(result => {
					setDefaultAccount(result[0]);
					setConnButtonText('Wallet Connected');
					//setConnButtonText(defaultAccount);
					
					// Set the Smart Contract Variables and Connection
					updateEthers();
					
				})
				.catch(error => {
					setErrorMessage(error.message);
				});

			} else if (!window.ethereum){
				console.log('Need to install MetaMask');
				setErrorMessage('Please install MetaMask browser extension to interact');
			}
		}
		
		// This runs when page is first rendered and everytime the item in the [] gets changed. It can be a state variable or the smart contract
		// In this case everytime the defaultAccount changes this block of code runs
		useEffect(() => {
			if(defaultAccount){
			provider.getBalance(defaultAccount)
			.then(balanceResult => {
				setUserBalance(ethers.utils.formatEther(balanceResult));
			})
			};
		}, [defaultAccount]);
		
		window.ethereum.on('accountsChanged', connectWalletHandler);

		window.ethereum.on('chainChanged', connectWalletHandler);

		return (
			<div>
				

				
				<div className="liton__shoping-cart-area mb-120">
					<div className="container">
					<div className="row">
						<div className="col-lg-12">
						<div className="shoping-cart-inner">
							<div className="shoping-cart-table table-responsive">
							<table className="table">
								<tbody>
								<tr>
									<td className="cart-product-price" colSpan={5}>
									<form className="m-4" onSubmit={purchaseShares}>
											<h6 className="text-xl font-semibold text-gray-700 text-left"> Buy Shares </h6>
											<p> Send Amount </p>
											<input type='text' id='amountShares' />

											<button type="submit" className="btn bg-red text-uppercase">Buy Shares</button>
											<div>
												{transferHash}
											</div>
									</form>
									</td>
								</tr>
								<tr>
									<td className="cart-product-price" colSpan={5}>
									<form className="m-4" onSubmit={depositRent}>
											<h6 className="text-xl font-semibold text-gray-700 text-left"> Pay Rent </h6>
											<p> Send Amount </p>
											<input type='text' id='rentAmount' />

											<button type="submit" className="btn bg-red text-uppercase">Pay Rent</button>
											<div>
												{transferHash}
											</div>
									</form>
									</td>
								</tr>
								<tr>
									<td className="cart-product-price" colSpan={5}>
									<form onSubmit={transferShares}>
											<h6> Transfer Coins </h6>
											<p> Reciever Address: </p>
											<input type='text' id='recieverAddress'/>  

											<p> Send Amount </p>
											<input type='number' id='transferAmount' min='0' step='100'/>

											<button type="submit" className="btn bg-red text-uppercase">Transfer Shares</button>
											<div>
												{transferHash}
											</div>
									</form>
									</td>
								</tr>
								<tr>
									<td className="cart-product-price" colSpan={2}>
										<b>Token Total Supply: </b>{totalTokenSupply}
									</td>
									
									
									<td className="cart-product-price" colSpan={2}>
									<b>Token Name: </b>{tokenName} <b>User Token Balanace: </b>{userTokenBalance}
									</td>

									<td className=""></td>
								</tr>
								<tr>
									<td className="cart-product-price" colSpan={2}>
										<b>Address: </b>{defaultAccount}
									</td>
									
									
									<td className="cart-product-price" colSpan={2}>
										<b>Balance: </b>{userBalance}
									</td>

									<td className=""><button className="btn bg-red text-uppercase" onClick={connectWalletHandler}>{connButtonText}</button></td>
								</tr>
								<tr>
									<td className="cart-product-price" colSpan={2}>
										<b>Contract Address: </b>{RDAssetAddress}
									</td>
									<b>Contract Total Income: </b>{totalIncome}
									<td className="">

									</td>

									<td className="cart-product-price" colSpan={2}>
										<b>Contract Balance: </b>{contractBalance}
									</td>
								</tr>
								<tr>
									<td className="cart-product-image">
										<img src={publicUrl+"assets/img/product/1.png"} alt="#" />
									</td>
									<td className="cart-product-info">
										<h4><Link to="/product-details">Luxurius Home </Link></h4>
									</td>
									<td className="cart-product-price">$1,750,000</td>
									<td className="cart-product-quantity">
										<div className="cart-plus-minus">
											<input type="text" defaultValue="2" name="qtybutton" className="cart-plus-minus-box" />
										</div>
									</td>
									<td className="cart-product-subtotal">$298.00</td>
								</tr>
								
								
								</tbody>
							</table>
							</div>
							
						</div>
						</div>
					</div>
					</div>
				</div>

				<div>
				Error Message Here: {errorMessage}
				</div>
			</div>
			
			
		);

       
	}

//}

export default CartV1