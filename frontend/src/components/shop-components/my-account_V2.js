 //import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import parse from 'html-react-parser';

// @useState remember variables on page
import React, {useState, useEffect} from 'react';
import {Contract, ethers, utils} from 'ethers';

// Allows us to connect to our SMart Contract through this JSON file
import RDAsset_abi from '../../RDAsset_abi.json';
import USDT_abi from '../../USDT_abi.json';

const MyAccount = () => {

    let publicUrl = process.env.PUBLIC_URL+'/'

	// Set the RDAsset smart contract address
	const RDAssetAddress = process.env.REACT_APP_RDASSET_SMART_CONTRACT_ADDR;
	const USDTAddress = process.env.REACT_APP_MOCH_USDT_SMART_CONTRACT_ADDR;

	// Hooks for variables and there functions to update them
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contractRDAsset, setContractRDAsset] = useState(null);
	const [contractUSDT, setContractUSDT] = useState(null);
	
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	
	// My Properties Section
	const [currentShares, setCurrentShares] = useState(null);
	const [availableProceeds, setAvailableProceeds] = useState(null);
	const [sharesExchanged, setSharesExchanged] = useState(null);

	// Message Section
	const [transferHash, setTransferHash] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	// Connect MetaMask Wallet
	const connectWallet_Org = async () => {

		if (window.ethereum && defaultAccount == null) {
			
			// set ethers provider
			//setProvider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setDefaultAccount(result[0]);
				setConnButtonText('Connected: ' + result[0].slice(0, 9) + "...");
								
				// Set the Smart Contract Variables and Connection
				connectEthers();
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
	
	// Connect MetaMask Wallet
	const connectWalletV1 = async () => {

		console.log("connectWallet: In");

		//window.addEventListener('load', async () => {
			console.log("connectWallet: Loaded");
			if (window.ethereum && defaultAccount == null) {
				console.log("connectWallet: If");
				//await window.etherium.enable();
				console.log("connectWallet: enabled");
				const Provider = new ethers.providers.Web3Provider(window.ethereum);
				const Signer = Provider.getSigner();
				console.log("connectWallet: Before txt");
				
				/*const tempRDAssetContract = new Contract(

					RDAsset_abi.networks[window.ethereum.networkVersion].address,
					RDAsset_abi.abi,
					Signer
				);*/

				window.ethereum.request({ method: 'eth_requestAccounts'})
				//
				.catch(error => {
					setErrorMessage(error.message);
				});

				console.log("connectWallet: After txt");
				//setContractRDAsset(tempRDAssetContract);


			} else if (!window.ethereum){
				setErrorMessage('Please install MetaMask browser extension to interact');
			}
		//});
	};


	const connectWallet = async () => {
			
			if (window.ethereum && defaultAccount == null) {

				try{
					const Provider = new ethers.providers.Web3Provider(window.ethereum);

					const Signer = Provider.getSigner();
					setSigner(Signer);

					const tempRDAssetContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, Signer);
					setContractRDAsset(tempRDAssetContract);

					const tempUSDTContract = new ethers.Contract(RDAssetAddress, USDT_abi.abi, Signer);
					setContractUSDT(tempUSDTContract);

					await window.ethereum.request({ method: "eth_requestAccounts" })
					.then(result => {
						setDefaultAccount(result[0]);
						setConnButtonText('Connected: ' + result[0].slice(0, 9) + "...");
					});

				}
				catch(e){
					console.log(e);

				}

			} else if (!window.ethereum){
				setErrorMessage('Please install MetaMask browser extension to interact');
			}
	};

	const connectWallet_GoodBBuild = async () => {

		console.log("connectWallet: In");

		//window.addEventListener('load', async () => {
			//console.log("connectWallet: Loaded");
			if (window.ethereum && defaultAccount == null) {
				console.log("connectWallet: If");

				//await window.etherium.enable();
				//console.log("connectWallet: enabled");

				const Provider = new ethers.providers.Web3Provider(window.ethereum);

				const Signer = Provider.getSigner();
				setSigner(Signer);

				const tempRDAssetContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, Signer);
				setContractRDAsset(tempRDAssetContract);

				const tempUSDTContract = new ethers.Contract(RDAssetAddress, USDT_abi.abi, Signer);
				setContractUSDT(tempUSDTContract);

				console.log("connectWallet: Before txt");
				
				/*const tempRDAssetContract = new Contract(

					RDAsset_abi.networks[window.ethereum.networkVersion].address,
					RDAsset_abi.abi,
					Signer
				);*/
				
				/*
				window.ethereum.request({ method: 'eth_requestAccounts'})
				.then(result => {
					setDefaultAccount(result[0]);
					setConnButtonText('Connected: ' + result[0].slice(0, 9) + "...");
									
					// Set the Smart Contract Variables and Connection
					//connectEthers();
				})
				.catch(error => {
					setErrorMessage(error.message);
				});

				console.log("connectWallet: After txt");
				setContractRDAsset(tempRDAssetContract);
				*/

				try{
					console.log("connectWallet: Before connect");
					// Connected to MetaMask
					//await window.ethereum.request({ method: "eth_requestAccounts" });

					await window.ethereum.request({ method: "eth_requestAccounts" })
					.then(result => {
						setDefaultAccount(result[0]);
						setConnButtonText('Connected: ' + result[0].slice(0, 9) + "...");
					});

					// Add is connected
					console.log("connectWallet: After Connect");

					//let connectedProvider = new ethers.providers.Web3Provider(window.ethereum)
					//setSigner(connectedProvider.getSigner());
				}
				catch(e){
					console.log(e);

				}
				console.log("connectWallet: After txt");

			} else if (!window.ethereum){
				setErrorMessage('Please install MetaMask browser extension to interact');
			}
		//});
	};

	//////////////////////////////////////////////////////////////////////////////////////////////
	const [signerAddress, setSignerAddress] = useState(undefined);
	const [tokenContracts, setTokenContracts] = useState({});

	
	useEffect(() => {
		console.log("In New useEffect");

		const init = async () => {

			try{
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			setProvider(provider);

			//const Signer = Provider.getSigner();
			//setSigner(Signer);

			//const tempRDAssetContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, Signer);
			const contractRDAsset = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi);
			setContractRDAsset(contractRDAsset);




			//const provider = await new ethers.providers.Web3Provider(window.ethereum)
			//setProvider(provider)
		
			//const contractRDAsset = await new ethers.Contract("0x0351D71Db579225051182B3192d27971c24D1A42", RDAsset_abi.abi)
			//setContractRDAsset(contractRDAsset)
			}
			catch(e){
				console.log(e);

			}
	
		}
		init();
	  }, [])

	/*
	const getSigner = async provider => {

		console.log("getSigner In");

		try{
			console.log("getSigner Provider");

			//provider.send("eth_requestAccounts", []);

			await window.ethereum.request({ method: 'eth_requestAccounts'})

			console.log("getSigner Signer");

			const tempsigner = provider.getSigner();

			console.log("getSigner Signer After");

			console.log("getSigner Address: ", tempsigner.getAddress());

			tempsigner.getAddress()
				.then(address => {
				setSignerAddress(address)
				});

			return signer;
		}
		catch(e){
			console.log(e);

		}
	}
	*/

	const getSigner = async provider => {

		try{
			//console.log("GetSigner: In");
			provider.send("eth_requestAccounts", []);

			//console.log("GetSigner: signer before");
			const signer = provider.getSigner();

			//console.log("GetSigner: Before");
			signer.getAddress()
			.then(address => {
				setSignerAddress(address)
				
			});
			//console.log("GetSigner: After");
			return signer
		}
		catch(e){
			console.log(e);

		}
	  }

	const connect = () => {

		try{
			//console.log("Connect: In");
				
			getSigner(provider)
				.then(signer => {
				setSigner(signer);
				
				
				//console.log("Connect setsigner: ");
				
				//console.log("Connect setsigner object: ", signer);
				
				signer.getAddress()
				.then(address => {
					//setSignerAddress(address)
					//console.log("Connect setsigner address1: ", address.slice(0, 9) + "...");
					setConnButtonText('Connected: ' + address.slice(0, 9) + "...");
				});
				
				//console.log("Connect setsigner address2: ", signer.getAddress());
				
				//setConnButtonText('Connected: ' + signerAddress.slice(0, 9) + "...");

			});
			
			//console.log("Connect setsigner after address: ", signer.getAddress());

			//window.ethereum.request({ method: 'eth_requestAccounts'});
			/*
			const Signer = provider.getSigner()
			.then(signer => {
				setSigner(signer);
				setConnButtonText('Connected: ' + signerAddress.slice(0, 9) + "...");

			});
			*/
			

			//console.log("Connect Signer Address: ", signerAddress.slice(0, 9) + "...");
			
			//console.log("Connect: End");
		}
		catch(e){
			console.log(e);

		}
	}

	const depositTokens = async () => {
		
		try{
			
			console.log("DepositToken in");

			//const tokenContract = tokenContracts[ symbol ]
			const tokenContract = 0xe9f8348d06AcA48Df07DA6fB4Ba1C0327Ff7E5DA;
			
			/*
			tokenContract.connect(signer).approve(bankContract.address, wei)
				.then(() => {
				bankContract.connect(signer).depositTokens(wei, toBytes32(symbol));
				})
			*/
			
			/*
			signer.getAddress()
				.then(address => {
					//setSignerAddress(address)
					//console.log("Connect setsigner address1: ", address.slice(0, 9) + "...");
					setConnButtonText('Connected: ' + address.slice(0, 9) + "...");
				});
			*/
			console.log("DepositToken Before Approve");
			const txt1 = await contractUSDT.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther("500000"));

			console.log("DepositToken Before Allowance");
			const txt2 = await contractUSDT.connect(signer).increaseAllowance(contractRDAsset.address, ethers.utils.parseEther("500000"));
			/*.then(() => {
				contractRDAsset.connect(signer).purchaseShares(ethers.utils.parseEther("1000"));
			});
			*/
			console.log("DepositToken Before Purchase");
			const txt3 = await contractRDAsset.connect(signer).purchaseShares(ethers.utils.parseEther("1000"));

			console.log("DepositToken After Purchase");
			/*
			.then(() => {
				contractRDAsset.connect(signer).depositTokens(ethers.utils.parseEther("1000"));
			});
			*/

			/*
			console.log("Deposit Tokens: In");
			const tokenContract = 0xe9f8348d06AcA48Df07DA6fB4Ba1C0327Ff7E5DA;
			
			console.log("Deposit Tokens: tokencontract");

			//const txt1 = await contractUSDT.connect(Signer).approve(contractRDAsset.address, ethers.utils.parseEther(amountShares));
			console.log("Deposit Tokens signer address: ", signer.address);
			contractUSDT.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther("10000"));

			console.log("Deposit Tokens signer address after: ", signer.address);
			*/

			/*
			contractUSDT.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther("10000"))
			.then(() => {
				contractRDAsset.connect(signer).depositTokens(ethers.utils.parseEther("1000"));
			});
			*/
		}
		catch(e){
			console.log(e);

		}

		console.log("Deposit Tokens: Done")

	}



	
	const connectBlockchain = async () => {

		console.log("connectBlockchain: In");
		if (window.ethereum && defaultAccount == null) {

			console.log("connectBlockchain: If");

			await window.ethereum.send("eth_requestAccounts");

			const Provider = new ethers.providers.Web3Provider(window.ethereum);
			const Signer = Provider.getSigner();
			
			// Validates the address is correct and not just some random test
			//ethers,utils.getAddress(user enter address);




		}
		else{
			setErrorMessage('Please install MetaMask browser extension to interact');		
		}
			
	};

	//////////////////////////////////////////////////////////////////////////////////////////////

	// Set Smart Contract connection so it can be used accross all functions on this page
	const connectEthers = () => {

		// Creates a read/write connection to our Smart Contract on TestNet/Mainnet
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempRDAssetContract = new ethers.Contract(RDAssetAddress, RDAsset_abi.abi, tempSigner);
		setContractRDAsset(tempRDAssetContract);
	}

	// This runs when page is first rendered and everytime the item in the [] gets changed. It can be a state variable or the smart contract
	// In this case everytime the Contract changes this block of code runs
	useEffect(() => {
		try{
			if(contractRDAsset != null){
				getPropertyDetails();

				console.log("In Org useEffect");
			};
		}
		catch(e){
			console.log(e);

		}
	}, [sharesExchanged, contractRDAsset, defaultAccount]);

	window.ethereum.on('accountsChanged', connectWallet);
	window.ethereum.on('chainChanged', connectWallet);

	// Section: My Properties
	const getPropertyDetails = async () => {

		// Get number of decimals for Smart Contract
		let tokenDecimals = await contractRDAsset.decimals();


		// Call Smart Contract and set Current Shares of property
		let sharesBigN = await contractRDAsset.getShareBalance()

		// Convert Big Numbers
		let tempCurrentShares = sharesBigN / Math.pow(10, tokenDecimals);

		// Gets rid of scientific notation
		setCurrentShares(Math.round(fixScientific(tempCurrentShares)));	

		// Call Smart Contract and set Current Proceeds of property
		let proceedsBigN = await contractRDAsset.getShareholderCurrentProceedsAvailable()

		// Convert Big Numbers
		let tempCurrentProceeds = proceedsBigN / Math.pow(10, tokenDecimals);

		// Gets rid of scientific notation
		setAvailableProceeds(fixScientific(tempCurrentProceeds).toFixed(2));	
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

		if (window.ethereum && defaultAccount !== null) {

			// Call Smart Contract and Transfer shares to users account 
			let txt = await contractRDAsset.withdrawProceeds()
			
			setSharesExchanged("1000");

			// Set the Transaction Hash Code
			//setTransferHash("Transfer confirmation hash: " + txt.hash);

		} else if (!window.ethereum){
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// Section: Purchase Shares
	const purchaseShares = async (e) => {

		console.log("purchaseShares: Start");

		// Prevent from reloading the page
		e.preventDefault();
		try{
			//if (window.ethereum && defaultAccount !== null) {
			if (window.ethereum) {

				console.log("purchaseShares: If");

				// Get form share amount value
				let amountShares = e.target.amountShares.value;

				try{
					/*const tokenContract = tokenContracts[ symbol ]
					
					tokenContract.connect(signer).approve(bankContract.address, wei)
					.then(() => {
						bankContract.connect(signer).depositTokens(wei, toBytes32(symbol));
					})
					*/


					console.log("Purchase Shares: In");
					const tokenContract = 0xe9f8348d06AcA48Df07DA6fB4Ba1C0327Ff7E5DA;
					
					//console.log("Purchase Shares Signer: ", signer);
					//console.log("Purchase Shares Signer: ", signer.getAddress());
					
					contractUSDT.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther("10000"))
					.then(() => {
						//console.log("Purchase Shares: Then");
						contractRDAsset.connect(signer).depositTokens(ethers.utils.parseEther("100"));
					});

					console.log("Purchase Shares : Current Shares", currentShares);

					//const txt1 = await contractUSDT.connect(Signer).approve(contractRDAsset.address, ethers.utils.parseEther(amountShares));
					
					/*
					contractUSDT.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther("10000"))
					.then(() => {
						contractRDAsset.connect(signer).depositTokens(ethers.utils.parseEther("100"));
					});
					*/

					//let txt1 = await contractUSDT.connect(signer).approve(contractRDAsset.address, ethers.utils.parseEther("10000"));
					//let txt = await contractRDAsset.connect(signer).depositTokens(ethers.utils.parseEther("100"));
					//let txt = await contractRDAsset.depositTokens(ethers.utils.parseEther("100"));
					
					// Set the Transaction Hash Code
					//setTransferHash("Transfer confirmation hash: " + txt.hash);

				}
				catch(e){
					console.log(e);
		
				}
		


				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

				// Triggers useEffect to refresh Property Info
				//setSharesExchanged(amountShares);

				// Set the Transaction Hash Code
				//setTransferHash("Transfer confirmation hash: " + txt.hash);

			} else if (!window.ethereum){
				setErrorMessage('Please install MetaMask browser extension to interact');
			}
		}
		catch(e){
			console.log(e);
		}
		console.log("purchaseShares: End");
	}

	// Section: Purchase Shares
	const sellShares = async (e) => {

		// Prevent from reloading the page
		e.preventDefault();

		if (window.ethereum && defaultAccount !== null) {

			// Get form share amount value
			let amountShares = e.target.amountShares.value;

			// Call Smart Contract and Transfer shares to users account 
			let txt = await contractRDAsset.sellShares(ethers.utils.parseEther(amountShares));
			
			// Triggers useEffect to refresh Property Info
			setSharesExchanged(amountShares);

			// Set the Transaction Hash Code
			//setTransferHash("Transfer confirmation hash: " + txt.hash);

		} else if (!window.ethereum){
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// Deposit the rent into the Smart Contract using USDT Ether
	const depositRent = async (e) => {
		
		// Prevent from reloading the page
		e.preventDefault();

		if (window.ethereum && defaultAccount !== null) {
						
			// Get form values
			let rentAmount = e.target.rentAmount.value;
			
			/// Call Smart Contract and Transfer shares to users account 
			let txt = await contractRDAsset.depositRent(ethers.utils.parseEther(rentAmount));
			
			// Triggers useEffect to refresh Property Info
			setSharesExchanged(rentAmount);

			// Set the Transaction Hash Code
			//setTransferHash("Transfer confirmation hash: " + txt.hash);
			
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
						<a data-bs-toggle="tab" href="#ltn_tab_1_2">My Properties <i className="fa-solid fa-list" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_3">Purchase Shares <i className="fa-solid fa-money-check-dollar" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_4">Sell Shares <i className="fa-solid fa-money-check-dollar" /></a>
						<a data-bs-toggle="tab" href="#ltn_tab_1_5">Deposit Rent <i className="fa-solid fa-money-check-dollar" /></a>
					  </div>
					</div>
				  </div>
				  <div className="col-lg-8">
					<div className="tab-content">

					  {/* Start Dashboard Section */}	
					  <div className="tab-pane fade active show" id="ltn_tab_1_1">
						<div className="ltn__myaccount-tab-content-inner">
						  <p><button className="btn bg-red text-uppercase" onClick={() => connectWallet()}>{connButtonText}</button></p>
						  <p><button className="btn bg-red text-uppercase" onClick={() => connect()}>{connButtonText}</button><button onClick={depositTokens} className="btn bg-red text-uppercase">Deposit Tokens</button></p>
						  <p>Connect your wallet to see your investment information.</p>
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
										<input className="input-item input-item-name"  type="text" name="amountShares" placeholder="Amount of shares to sell"/>
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
								<div className="col-md-12">
									{transferHash}
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
								<div className="col-md-12">
									{transferHash}
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
	</div>
	);
}

export default MyAccount