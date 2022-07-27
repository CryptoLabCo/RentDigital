import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import {ethers} from 'ethers';
import React, {Component, useState, useEffect} from 'react';

// ABI/JSON Files from smart contracts
import RDAsset_abi from '../../RDAsset_abi.json';
import USDT_abi from '../../USDT_abi.json';


//function MyAccount() {
const MyAccount = () => {

//class MyAccount extends Component {

	let publicUrl = process.env.PUBLIC_URL+'/'

	// *** Start Custom Code ***
	
	// Set the RDAsset and USDT smart contract addresses
	const RDAssetAddress = process.env.REACT_APP_RDASSET_SMART_CONTRACT_ADDR;
	const USDTAddress = process.env.REACT_APP_MOCH_USDT_SMART_CONTRACT_ADDR;
	
	// State Variables
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [signerAddress, setSignerAddress] = useState(null);
	const [contractRDAsset, setContractRDAsset] = useState(null);

	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	// My Properties Section
	const [currentShares, setCurrentShares] = useState(null);
	const [availableProceeds, setAvailableProceeds] = useState(null);
	
	// Message Section
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		const init = async () => {

			const provider = await new ethers.providers.Web3Provider(window.ethereum)
			setProvider(provider)
						
			const contractRDAsset = await new ethers.Contract(RDAssetAddress, RDAsset_abi.abi)
			setContractRDAsset(contractRDAsset)
		}
		init();
	}, [])

	//window.ethereum.on('accountsChanged', connect);
	//window.ethereum.on('chainChanged', connect);

	const isConnected = () => (signer !== undefined)
	
	const getSigner = async provider => {

		provider.send("eth_requestAccounts", [])
		.then(result => {
			const defaultAccount = result[0];
			setDefaultAccount(defaultAccount);
			setConnButtonText('Connected: ' + result[0].slice(0, 9) + "...");
		})

		const signer = provider.getSigner();

		signer.getAddress()
			.then(address => {
			setSignerAddress(address)
			
			})

		return signer
	}

	const connect = () => {
		
		setErrorMessage("");

		getSigner(provider)
			.then(signer => {
				setSigner(signer)
			});
	}

	// Section: My Properties
	const getPropertyDetails = async () => {

		try{
			// Need to fix error: not picking up these page based items
			const gpdProvider = new ethers.providers.Web3Provider(window.ethereum);
			const gpdSigner = gpdProvider.getSigner();
			const gpdRDAssetContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, gpdSigner);
			
			// Get number of decimals for Smart Contract
			const tokenDecimals = await gpdRDAssetContract.decimals();
			
			// Call Smart Contract and set Current Shares of property
			const sharesBigN = await gpdRDAssetContract.getShareBalance();
				
			// Convert Big Numbers
			const bigNCurrentShares = sharesBigN / Math.pow(10, tokenDecimals);

			// Gets rid of scientific notation
			const currentShares = Math.round(fixScientific(bigNCurrentShares));
			setCurrentShares(currentShares);	

			// Call Smart Contract and set Current Proceeds of property
			const proceedsBigN = await gpdRDAssetContract.getShareholderCurrentProceedsAvailable();

			// Convert Big Numbers
			let bigNCurrentProceeds = proceedsBigN / Math.pow(10, tokenDecimals);
			
			// Gets rid of scientific notation
			const availableProceeds = fixScientific(bigNCurrentProceeds).toFixed(2);
			setAvailableProceeds(availableProceeds);	

		}
		catch(e){
			console.log("getPropertyDetails - Error: ", e);
		}

	}

	// Gets rid of scientific notation
	function fixScientific(x) {
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
	
	// Section: Withdraw Proceeds
	const withdrawProceeds = async (e) => {
		
		// Prevent from reloading the page
		e.preventDefault();

		let errorMessage = "";
		setErrorMessage(errorMessage);

		// Need to fix error: not picking up these page based items
		const gpdProvider = new ethers.providers.Web3Provider(window.ethereum);
		const gpdSigner = gpdProvider.getSigner();
		const gpdRDAssetContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, gpdSigner);
		
		// Get number of decimals for Smart Contract
		const tokenDecimals = await gpdRDAssetContract.decimals();

		// Call Smart Contract and set Current Proceeds of property
		const proceedsBigN = await gpdRDAssetContract.getShareholderCurrentProceedsAvailable();

		// Convert Big Numbers
		let bigNCurrentProceeds = proceedsBigN / Math.pow(10, tokenDecimals);

		let tempNum = "1000";

		if (window.ethereum && defaultAccount !== null && bigNCurrentProceeds > 0) {
	
			try{

				const usdtTokenContract = new ethers.Contract(USDTAddress, USDT_abi.abi);
				await usdtTokenContract.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther(bigNCurrentProceeds.toString()))
				.then(() => {
					contractRDAsset.connect(signer).withdrawProceeds();
				});

				// Up Property Info
				getPropertyDetails();
			}
			catch(e){
				  console.log("withdrawProceeds - Error: ", e);
			}
		} 
		else if (!window.ethereum){
			let errorMessage = "Please install MetaMask browser extension to interact";
			setErrorMessage(errorMessage);
		}
		else if (defaultAccount === null){
			let errorMessage = "Please login to MetaMask browser extension or connect to site to interact";
			setErrorMessage(errorMessage);
		}
		else if (bigNCurrentProceeds <= 0){
			let errorMessage = "Investment property proceeds amount must be greater than 0";
			setErrorMessage(errorMessage);
		} 
	}

	// Section: Purchase Shares
	const purchaseShares = async (e) => {
		
		// Prevent from reloading the page
		e.preventDefault();

		let errorMessage = "";
		setErrorMessage(errorMessage);

		// Get form purchase share amount value
		const amountPurchaseShares = e.target.amountPurchaseShares.value;

		if (window.ethereum && defaultAccount !== null && amountPurchaseShares > 0) {
	
			try{
				const usdtTokenContract = new ethers.Contract(USDTAddress, USDT_abi.abi);
				usdtTokenContract.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther(amountPurchaseShares))
				.then(() => {
					contractRDAsset.connect(signer).purchaseShares(ethers.utils.parseEther(amountPurchaseShares));
				});
			
				// Up Property Info
				getPropertyDetails();
			}
			catch(e){
				  console.log("purchaseShares - Error: ", e);
			}
		} 
		else if (!window.ethereum){
			let errorMessage = "Please install MetaMask browser extension to interact";
			setErrorMessage(errorMessage);
		}
		else if (defaultAccount === null){
			let errorMessage = "Please login to MetaMask browser extension or connect to site to interact";
			setErrorMessage(errorMessage);
		}
		else if (amountPurchaseShares <= 0){
			let errorMessage = "Purchase shares amount must be greater than 0";
			setErrorMessage(errorMessage);
		} 

	}

	// Section: Sell Shares 
	const sellShares = async (e) => {
		
		// Prevent from reloading the page
		e.preventDefault();

		let errorMessage = "";
		setErrorMessage(errorMessage);

		// Get form rent amount value
		const amountSellShares = e.target.amountSellShares.value;
		
		if (window.ethereum && defaultAccount !== null && amountSellShares > 0) {
	
			try{
				// Call smart contract
				const usdtTokenContract = new ethers.Contract(USDTAddress, USDT_abi.abi);
				await usdtTokenContract.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther(amountSellShares))
				.then(() => {
					contractRDAsset.connect(signer).sellShares(ethers.utils.parseEther(amountSellShares));
				});
				
				// Up Property Info
				getPropertyDetails();
			}
			catch(e){
				  console.log("sellShares - Error: ", e);
			}
		} 
		else if (!window.ethereum){
			let errorMessage = "Please install MetaMask browser extension to interact";
			setErrorMessage(errorMessage);
		}
		else if (defaultAccount === null){
			let errorMessage = "Please login to MetaMask browser extension or connect to site to interact";
			setErrorMessage(errorMessage);
		}
		else if (amountSellShares <= 0){
			let errorMessage = "Shares to sell amount must be greater than 0";
			setErrorMessage(errorMessage);
		} 
	}

	// Section: Deposit rent into the Smart Contract using USDT Ether
	const depositRent = async (e) => {
		
		// Prevent from reloading the page
		e.preventDefault();

		let errorMessage = "";
		setErrorMessage(errorMessage);

		// Get form rent amount value
		const rentAmount = e.target.rentAmount.value;

		if (window.ethereum && defaultAccount !== null && rentAmount > 0) {
	
			try{
				// Call smart contract
				const usdtTokenContract = new ethers.Contract(USDTAddress, USDT_abi.abi);
				await usdtTokenContract.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther(rentAmount))
				.then(() => {
					contractRDAsset.connect(signer).depositRent(ethers.utils.parseEther(rentAmount));
				});
			
				// Up Property Info
				getPropertyDetails();
			}
			catch(e){
				  console.log("depositRent - Error: ", e);
			}
		} 
		else if (!window.ethereum){
			let errorMessage = "Please install MetaMask browser extension to interact";
			setErrorMessage(errorMessage);
		}
		else if (defaultAccount === null){
			let errorMessage = "Please login to MetaMask browser extension or connect to site to interact";
			setErrorMessage(errorMessage);
		}
		else if (rentAmount <= 0){
			let errorMessage = "Rent amount must be greater than 0";
			setErrorMessage(errorMessage);
		} 
	}

	// *** End Custom Code ***

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
						<a data-bs-toggle="tab" href="#ltn_tab_1_2">My Investments <i className="fas fa-user" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_3">Purchase Shares <i className="fa-solid fa-money-check-dollar" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_4">Sell Shares <i className="fas fa-user" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_5">Pay Rent <i className="fa-solid fa-list" /></a>
					  </div>
					</div>
				  </div>
				  <div className="col-lg-8">
					<div className="tab-content">
					  
					  {/* Start Dashboard Section */}	
					  <div className="tab-pane fade active show" id="ltn_tab_1_1">
						<div className="ltn__myaccount-tab-content-inner">
						  <p>
							<button className="btn bg-red text-uppercase" onClick={() => connect()}>{connButtonText}</button><br></br>
							Connect your wallet to see your investment information.
						  </p>
						  <p>
							<button className="btn bg-red text-uppercase" onClick={() => getPropertyDetails()}>Latest Proceeds</button><br></br>
						  	Get the lastest updates on your investment property proceeds. 
						  </p>
						</div>
					  </div>
					  {/* End Dashboard Section */}
					  
					  {/* Start My Properties Section */}
					  <div className="tab-pane fade" id="ltn_tab_1_2">
						<div className="ltn__myaccount-tab-content-inner">
						<form id="contact-form" onSubmit={withdrawProceeds}>
						  <div className="ltn__my-properties-table table-responsive">
							<table className="table">
							  <thead>
								<tr>
								  <th scope="col">Property</th>
								  <th scope="col" />
								  <th scope="col" align="left">Your Shares</th>
								  <th scope="col" align="left">Available Rewards</th>
								  <th scope="col" align="left">Claim Rewards</th>
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
								  <td align="left">{currentShares}</td>
								  <td align="left">${availableProceeds}</td>
								  <td align="left"><button type="submit" className="btn bg-red text-uppercase">Claim</button></td>
								</tr>
							  </tbody>
							</table>
						  </div>
						  </form>
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
										<input className="input-item input-item-name"  type="text" name="amountPurchaseShares" placeholder="Amount of shares to purchase"/>
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
							  </form>
							</div>
						  </div>
						</div>
					  </div>
					  {/* End Purchase Shares Section */}
					  
					  {/* Start Sell Shares Section */}
					  <div className="tab-pane fade" id="ltn_tab_1_4">
						<div className="ltn__myaccount-tab-content-inner">
						<p>Allows you to sell shares on the investment property.</p>
						  
						  <div className="ltn__comment-area mb-50">
							
							<div className="ltn__form-box contact-form-box box-shadow white-bg">
							  <h4 className="title-2">Sell Shares</h4>
							  <form id="contact-form" onSubmit={sellShares}>

								<div className="row">
								  <div className="col-md-12">
									<div className="input-item input-item-textarea">
										<label>Share Amount:</label>
										<input className="input-item input-item-name"  type="text" name="amountSellShares" placeholder="Amount of shares to sell"/>
							  		</div>
								  </div>
								</div>

								<p className="form-messege mb-0 mt-20" />
								<div className="btn-wrapper mt-0">
									<button type="submit" className="btn bg-red text-uppercase">Sell Shares</button>
								</div>
								<p className="form-messege mb-0 mt-20" />

								<div className="col-md-12">
									{errorMessage}
								</div>
							  </form>
							</div>
						  </div>
						</div>
					  </div>
					  {/* End Sell Shares Section */}

					  {/* Start Deposit Rent Section */}
					  <div className="tab-pane fade" id="ltn_tab_1_5">
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
							  </form>
							</div>
						  </div>
						</div>
					  </div>
					  {/* End Deposit Rent Section */}

					</div>
				  </div>
				</div>
			  </div>
			</div>
			{/* PRODUCT TAB AREA END */}
		  </div>
		</div>
	  </div>
	</div>);
	
    //} Render Tag
//} Class Tag
}
export default MyAccount