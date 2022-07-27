import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class FeaturedItemV1 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div>
			<div className="ltn__product-slider-area ltn__product-gutter pt-115 pb-90">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-12">
			        <div className="section-title-area ltn__section-title-2--- text-center">
			          <h1 className="section-title">Marketplace Listings</h1>
			        </div>
			      </div>
			    </div>
			    <div className="row ltn__product-slider-item-three-active slick-arrow-1">
			      {/* ltn__product-item */}
			      <div className="col-lg-12">
			        <div className="ltn__product-item ltn__product-item-4 text-center---">
			          <div className="product-img go-top">
			            <img src={publicUrl+"assets/img/product-3/Apt1Extsmall.jpg"} alt="#" />
			            <div className="product-badge">
			              <ul>
			                <li className="sale-badge bg-red">Sold Out</li>
			              </ul>
			            </div>
			            <div className="product-img-location-gallery">
			              <div className="product-img-location go-top">
			                <ul>
			                  <li>
			                    Fort Worth, Texas
			                  </li>
			                </ul>
			              </div>
			              <div className="product-img-gallery go-top">
			                <ul>
			                  <li>
			                    <i className="fas fa-camera" /> 4
			                  </li>
			                  <li>
			                    <i className="fas fa-film" /> 2
			                  </li>
			                </ul>
			              </div>
			            </div>
			          </div>
			          <div className="product-info">
			            <div className="product-price">
			              <span>$420,00</span>
			            </div>
			            <h2 className="product-title go-top">Penthouse Lake Views</h2>
			            <div className="product-description">
			              <p>Beautiful Huge 2 Bedrrom Penthouse. Views of the beach, with easy access to your boat.</p>
			            </div>
			            <ul className="ltn__list-item-2 ltn__list-item-2-before">
			              <li><span>2 <i className="flaticon-bed" /></span>
			                Bedrooms
			              </li>
			              <li><span>2 <i className="flaticon-clean" /></span>
			                Bathrooms
			              </li>
			              <li><span>2150 <i className="flaticon-square-shape-design-interface-tool-symbol" /></span>
			                square Ft
			              </li>
			            </ul>
			          </div>
			          
			        </div>
			      </div>
			      {/* ltn__product-item */}
			      <div className="col-lg-12">
			        <div className="ltn__product-item ltn__product-item-4 text-center---">
			          <div className="product-img go-top">
			            <Link to="/product-details"><img src={publicUrl+"assets/img/product-3/HouseExtsmall.jpg"} alt="#" /></Link>
			            <div className="product-img-location-gallery">
			              <div className="product-img-location go-top">
			                <ul>
			                  <li>Miami Beach, Miami</li>
			                </ul>
			              </div>
			              <div className="product-img-gallery go-top">
			                <ul>
			                  <li>
			                    <i className="fas fa-camera" /> 4
			                  </li>
			                </ul>
			              </div>
			            </div>
			          </div>
			          <div className="product-info">
			            <div className="product-price">
			              <span>$1,750,000</span>
			            </div>
			            <h2 className="product-title go-top"><Link to="/product-details">Luxurious Modern House</Link></h2>
			            <div className="product-description">
			              <p>Luxurious house in the heart of Miami Beach. Close to all the action.</p>
			            </div>
			            <ul className="ltn__list-item-2 ltn__list-item-2-before">
			              <li><span>5 <i className="flaticon-bed" /></span>
			                Bedrooms
			              </li>
			              <li><span>5 <i className="flaticon-clean" /></span>
			                Bathrooms
			              </li>
			              <li><span>3450 <i className="flaticon-square-shape-design-interface-tool-symbol" /></span>
			                square Ft
			              </li>
			            </ul>
			          </div>
			        </div>
			      </div>
			      {/* ltn__product-item */}
			      <div className="col-lg-12">
			        <div className="ltn__product-item ltn__product-item-4 text-center---">
			          <div className="product-img go-top">
			            <img src={publicUrl+"assets/img/product-3/Apt2Extsmall.jpg"} alt="#" />
						<div className="product-badge">
			              <ul>
			                <li className="sale-badge bg-red">Sold Out</li>
			              </ul>
			            </div>
			            <div className="product-img-location-gallery">
			              <div className="product-img-location go-top">
			                <ul>
			                  <li>
			                    San Diego, California
			                  </li>
			                </ul>
			              </div>
			              <div className="product-img-gallery go-top">
			                <ul>
			                  <li>
			                    <i className="fas fa-camera" /> 4
			                  </li>
			                </ul>
			              </div>
			            </div>
			          </div>
			          <div className="product-info">
			            <div className="product-price">
						<span>$550,000</span>
			            </div>
			            <h2 className="product-title go-top">Beach Views</h2>
			            <div className="product-description">
			              <p>Beautiful 1 Bedroom in the Gaslamp Quarter with beach views.</p>
			            </div>
			            <ul className="ltn__list-item-2 ltn__list-item-2-before">
			              <li><span>1 <i className="flaticon-bed" /></span>
			                Bedrooms
			              </li>
			              <li><span>1 <i className="flaticon-clean" /></span>
			                Bathrooms
			              </li>
			              <li><span>1025 <i className="flaticon-square-shape-design-interface-tool-symbol" /></span>
			                square Ft
			              </li>
			            </ul>
			          </div>
			          
			        </div>
			      </div>
			      
			      
			    </div>
			  </div>
			</div>
			

			

			
		   </div>
        }
}

export default FeaturedItemV1