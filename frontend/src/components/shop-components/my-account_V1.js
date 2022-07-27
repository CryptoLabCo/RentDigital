//import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import parse from 'html-react-parser';

// @useState remember variables on page
import React, {useState, useEffect} from 'react';
import {ethers} from 'ethers';

// Allows us to connect to our SMart Contract through this JSON file
import RDAsset_abi from '../../RDAsset_abi.json';
import USDT_abi from '../../USDT_abi.json';

// Allows us to use the dotenv file
require('dotenv').config()


//class MyAccount extends Component {

    //render() {

const MyAccount = () => {

    let publicUrl = process.env.PUBLIC_URL+'/'

	// Contract Addresses
	//const RDAssetAddress = process.env.RENTDIGITAL_SMART_CONTRACT_ADDR;
	//const USDTAddress = process.env.MOCHUSDT_SMART_CONTRACT_ADDR
	const RDAssetAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
	const USDTAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


	// Hooks for variables and there functions to update them
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contractRDAsset, setContractRDAsset] = useState(null);

	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');



	


	// My Properties Section
	const [currentShares, setCurrentShares] = useState(0);
	const [availableProceeds, setAvailableProceeds] = useState(0);

		

	

	

	const [userTokenBalance, setUserTokenBalance] = useState(null);
	
	const [contractAdmin, setContractAdmin] = useState(null);
	const [transferHash, setTransferHash] = useState();

	//const [userBalance, setUserBalance] = useState(null);

	const [errorMessage, setErrorMessage] = useState(null);

	
	

	// Set these the Smart Contract connection so it can be used accross all functions on this page
	const connectEthers = () => {

		// Creates a read/write connection to our Smart Contract on TestNet/Mainnet
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempRDAssetContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, tempSigner);
		//let tempRDAssetContract = new ethers.Contract(RDAsset_abi.address, RDAsset_abi.abi, tempSigner);
		
		setContractRDAsset(tempRDAssetContract);
	}

	// This runs when page is first rendered and everytime the item in the [] gets changed. It can be a state variable or the smart contract
	// In this case everytime the Contract changes this block of code runs
	useEffect(() => {
		if(contractRDAsset != null){
			

			//getCurrentShares();
			//getShareholderCurrentProceedsAvailable();


			//updateUserTokenBalance();
			//getContractAdmin();
			//updateBalance();
			//updateTokenName();
			//getTotalTokenSupply();
			//getContractBalance();
			//getTotalIncome();
		};
	}, [contractRDAsset, defaultAccount]);

	// Connect MetaMask Wallet
	const connectWallet = async () => {
		if (window.ethereum && defaultAccount == null) {
			
			// set ethers provider
			setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setDefaultAccount(result[0]);
				setConnButtonText('Wallet Connected');
								
				// Set the Smart Contract Variables and Connection
				connectEthers();
				//updateUserTokenBalance();
				
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
	
	
	window.ethereum.on('accountsChanged', connectWallet);
	window.ethereum.on('chainChanged', connectWallet);

	// Gets the Admin of the Smart Contract
	const getContractAdmin = async () => {

		let tempAdmin = await contractRDAsset.admin();

		setContractAdmin(tempAdmin);
	}


	// Gets the Shares currently held by the user for the investment property
	const getCurrentShares = async () => {

		let tempCurrentShares = await contractRDAsset.getShareBalance();
		setCurrentShares(tempCurrentShares);
	}

	// Gets the Shareholder Current Proceeds Availables for the invvestment property
	const getShareholderCurrentProceedsAvailable = async () => {

		let tempShareholderCurrentProceedsAvailables = await contractRDAsset.getShareholderCurrentProceedsAvailable();
		setAvailableProceeds(tempShareholderCurrentProceedsAvailables);
	}










	const updateUserTokenBalance = async () => {

		// Get Token amount for the selected user account
		let balanceBigN = await contractRDAsset.balanceOf(defaultAccount);

		// Get number of decimals for Smart Contract
		let tokenDecimals = await contractRDAsset.decimals();

		// Convert Big Numbers
		let tokenBalance = balanceBigN / Math.pow(10, tokenDecimals);

		// Gets rid of scientific notation
		setUserTokenBalance(toFixed(tokenBalance));	
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

	

	// Deposit the rent into the Smart Contract
	// It will be deposited it as Ether
	const depositRent = async (e) => {
		
		// Prevent from reloading the page
		e.preventDefault();

		if (window.ethereum && defaultAccount !== null) {
			
			// ToDo: Validate the user has enough in wallet to make a deposit
			
			// Get form values
			let rentAmount = e.target.rentAmount.value;
			
			// Deposit rent into the Smart Contract
			// It will be deposited it as Ether
			let txt = await signer.sendTransaction({
				to: RDAssetAddress,
				value: ethers.utils.parseEther(rentAmount),
			}) 

			// Set the Transaction Hash Code
			setTransferHash("Transfer confirmation hash: " + txt.hash);
			
		} else if (!window.ethereum){
			setErrorMessage('Please install MetaMask browser extension to interact');
		}

	}
	// Transfer shares to another account
	const purchaseShares = async (e) => {

		// Prevent from reloading the page
		e.preventDefault();

		if (window.ethereum && defaultAccount !== null) {

			//ToDo: Validate they have enough shares to transfer

			// Get form share amount value
			let amountShares = e.target.amountShares.value;

			// Call Smart Contract and Transfer shares to users account 
			let txt = await contractRDAsset.purchaseShares(ethers.utils.parseEther(amountShares))
			
			// Set the Transaction Hash Code
			setTransferHash("Transfer confirmation hash: " + txt.hash);

		} else if (!window.ethereum){
			setErrorMessage('Please install MetaMask browser extension to interact');
		}

	}
	
	
	// Transfer shares to another account
	const transferShares = async (e) => {
		
		// Prevent from reloading the page
		e.preventDefault();

		if (window.ethereum && defaultAccount !== null) {

			//ToDo: Validate they have enough shares to transfer

			// Get form values
			let recieverAddress = e.target.recieverAddress.value;
			let transferAmount = e.target.transferAmount.value;

			// Call Smart Contract and Transfer shares to users account 
			let txt = await contractRDAsset.transferShares(recieverAddress, ethers.utils.parseEther(transferAmount))
			
			// Set the Transaction Hash Code
			setTransferHash("Transfer confirmation hash: " + txt.hash);

		} else if (!window.ethereum){
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

    return (

	<div className="liton__wishlist-area pb-70">
	  <div className="container">
	  	<div className="row">
		  <div className="col-lg-12">
			{/* PRODUCT TAB AREA START */}
			<div className="ltn__product-tab-area">
			  <div className="container">
				<div className="row">
				  <div className="col-lg-4">
					<div className="ltn__tab-menu-list mb-50">
					  <div className="nav">                                            
						<a className="active show" data-bs-toggle="tab" href="#ltn_tab_1_1">Dashboard <i className="fas fa-home" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_2">Deposit Rent <i className="fas fa-user" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_3">Purchase Shares <i className="fas fa-user" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_4">My Properties <i className="fa-solid fa-list" /></a>
					  </div>
					</div>
				  </div>
				  <div className="col-lg-8">
					<div className="tab-content">

					  {/* Start Dashboard Section */}	
					  <div className="tab-pane fade active show" id="ltn_tab_1_1">
						<div className="ltn__myaccount-tab-content-inner">
						  <p><button className="btn bg-red text-uppercase" onClick={connectWallet}>{connButtonText}</button></p>
						  <p>Connect your wallet to see your investment information.</p>
						</div>
					  </div>
					  {/* End Dashboard Section */}

					  {/* Start Deposit Rent Section */}
					  <div className="tab-pane fade" id="ltn_tab_1_2">
						<div className="ltn__myaccount-tab-content-inner">
						<p>Deposit your rent directly to the Blockchain.</p>
						  
						  <div className="ltn__comment-area mb-50">
							
							<div className="ltn__form-box contact-form-box box-shadow white-bg">
							  <h4 className="title-2">Deposit Rent</h4>
							  <form id="contact-form" onSubmit={depositRent}>
		
								<div className="row">
								  <div className="col-md-12">
									<div className="input-item input-item-textarea">
										<input className="input-item input-item-name"  type="text" name="rentAmount" placeholder="Enter rent amount"/>
							  		</div>
								  </div>
								</div>

								<p className="form-messege mb-0 mt-20" />
								<div className="btn-wrapper mt-0">
									<button type="submit" className="btn bg-red text-uppercase">Pay Rent</button>
								</div>
								<p className="form-messege mb-0 mt-20" />

								<div className="col-md-12">
									{errorMessage}
								</div>
								<div className="col-md-12">
									{transferHash}
								</div>
							  </form>
							</div>
						  </div>
						</div>
					  </div>
					  {/* End Deposit Rent Section */}

					  {/* Start Purchase Shares Section */}
					  <div className="tab-pane fade" id="ltn_tab_1_3">
						<div className="ltn__myaccount-tab-content-inner">
						<p>Allows you to purchase shares on the investment property.</p>
						  
						  <div className="ltn__comment-area mb-50">
							
							<div className="ltn__form-box contact-form-box box-shadow white-bg">
							  <h4 className="title-2">Purchase Shares</h4>
							  <form id="contact-form" onSubmit={purchaseShares}>

								<div className="row">
								  <div className="col-md-12">
									<div className="input-item input-item-textarea">
										<label>Share Amount:</label>
										<input className="input-item input-item-name"  type="text" name="amountShares" placeholder="Amount of shares to purchase"/>
							  		</div>
								  </div>
								</div>

								<p className="form-messege mb-0 mt-20" />
								<div className="btn-wrapper mt-0">
									<button type="submit" className="btn bg-red text-uppercase">Purchase Shares</button>
								</div>
								<p className="form-messege mb-0 mt-20" />

								<div className="col-md-12">
									{errorMessage}
								</div>
								<div className="col-md-12">
									{transferHash}
								</div>
							  </form>
							</div>
						  </div>
						</div>
					  </div>
					  {/* End Transfer Shares Section */}
					  
					  {/* Start My Properties Section */}
					  <div className="tab-pane fade" id="ltn_tab_1_4">
						<div className="ltn__myaccount-tab-content-inner">
						  <div className="ltn__my-properties-table table-responsive">
							<table className="table">
							  <thead>
								<tr>
								  <th scope="col">My Properties</th>
								  <th scope="col" />
								  <th scope="col">Current Shares</th>
								  <th scope="col">Invest</th>
								  <th scope="col">Proceeds</th>
								</tr>
							  </thead>
							  <tbody>

								<tr>
								  <td className="ltn__my-properties-img go-top">
									<Link to="/product-details"><img src={publicUrl+"assets/img/product-3/HouseExtsmall.jpg"} alt="#" /></Link>
								  </td>
								  <td>
									<div className="ltn__my-properties-info">
									  <h6 className="mb-10 go-top"><Link to="/product-details">Luxurious Modern House</Link></h6>
									  <small><i className="ltn__secondary-color flaticon-pin" /> Miami Beach, Miami</small>
									</div>
								  </td>
								  <td>{currentShares}</td>
								  <td><Link to="#">Edit</Link></td>
								  <td>{availableProceeds}</td>
								</tr>
								
								
							  </tbody>
							</table>
						  </div>
						  <div className="ltn__pagination-area text-center">
							<div className="ltn__pagination">
							<ul>
								<li><Link to="#"><i className="fas fa-angle-double-left" /></Link></li>
								<li className="active"><Link to="#">1</Link></li>
								<li><Link to="#"><i className="fas fa-angle-double-right" /></Link></li>
							</ul>
							</div>
						</div>
						</div>
					  </div>
					  {/* End My Properties Section */}
					  
					</div>
				  </div>
				</div>
			  </div>
			</div>
			{/* PRODUCT TAB AREA END */}
		  </div>
		</div>
	  </div>
	</div>
	);
}

        //}
//}

export default MyAccount