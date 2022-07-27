import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class ShopDetails extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="ltn__shop-details-area pb-10">
				<div className="container">
				<div className="row">
					{/*col-lg-8 can up up to 12 columns*/}
					<div className="col-lg-10 col-md-12">
					<div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
						
						<h1>Luxurious Modern House</h1>
						<label><span className="ltn__secondary-color"><i className="flaticon-pin" /></span> Miami Beach, Miami</label>
						<h4 className="title-2">Description</h4>
						<p>Luxurious house in the heart of Miami Beach. Close to all the action.</p>
						<p>To the left is the modern kitchen with central island, leading through to the unique breakfast family room which feature glass walls and doors out onto the garden and access to the separate utility room.</p>
						<h4 className="title-2">Property Detail</h4>  
						<div className="property-detail-info-list section-bg-1 clearfix mb-60">                          
						<ul>
							<li><label>Property ID:</label> <span>RD001</span></li>
							<li><label>Home Area: </label> <span>3450 sqft</span></li>
							<li><label>Bedrooms:</label> <span>5</span></li>
							<li><label>Bathrooms:</label> <span>5</span></li>
							<li><label>Year built:</label> <span>2019</span></li>
						</ul>
						<ul>
							<li><label>Price:</label> <span>$1,750,000 </span></li>
							<li><label>Projected Appreciation:</label> <span>11%</span></li>
							<li><label>Cash on Cash Return:</label> <span>12%</span></li>
							<li><label>Cap Rate:</label> <span>12%</span></li>
							<li><label>Total Returns(IRR):</label> <span>23%</span></li>
						</ul>
						<ul>
							<li><label>Annual Gros Rent:</label> <span>$350,000 </span></li>
							<li><label>Property Tax:</label> <span>$35,000</span></li>
							<li><label>Homeowners Insurance:</label> <span>$15,000</span></li>
							<li><label>Property Management:</label> <span>$12,000</span></li>
							<li><span><Link className="btn bg-red text-uppercase" to="/my-account">Invest Now <i className="icon-next" /></Link></span></li>

							
							
						</ul>
						</div>
						<h4 className="title-2">Facts and Features</h4>
						<div className="property-detail-feature-list clearfix mb-45">                            
						<ul>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Living Room</h6>
								<small>20 x 16 sq feet</small>
								</div>
							</div>
							</li>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Garage</h6>
								<small>30 x 20 sq feet</small>
								</div>
							</div>
							</li>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Dining Area</h6>
								<small>20 x 16 sq feet</small>
								</div>
							</div>
							</li>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Bedroom</h6>
								<small>20 x 16 sq feet</small>
								</div>
							</div>
							</li>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Bathroom</h6>
								<small>20 x 16 sq feet</small>
								</div>
							</div>
							</li>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Gym Area</h6>
								<small>20 x 16 sq feet</small>
								</div>
							</div>
							</li>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Garden</h6>
								<small>20 x 16 sq feet</small>
								</div>
							</div>
							</li>
							<li>
							<div className="property-detail-feature-list-item">
								<i className="flaticon-double-bed" />
								<div>
								<h6>Parking</h6>
								<small>20 x 16 sq feet</small>
								</div>
							</div>
							</li>
						</ul>
						</div>
						
						<h4 className="title-2 mb-10">Amenities</h4>
						<div className="property-details-amenities mb-60">
						<div className="row">
							<div className="col-lg-4 col-md-6">
							<div className="ltn__menu-widget">
								<ul>
								<li>
									<label className="checkbox-item">Air Conditioning
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Gym
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Microwave
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Swimming Pool
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">WiFi
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								</ul>
							</div>
							</div>
							<div className="col-lg-4 col-md-6">
							<div className="ltn__menu-widget">
								<ul>
								<li>
									<label className="checkbox-item">Barbeque
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Recreation
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Microwave
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Basketball Cout
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Fireplace
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								</ul>
							</div>
							</div>
							<div className="col-lg-4 col-md-6">
							<div className="ltn__menu-widget">
								<ul>
								<li>
									<label className="checkbox-item">Refrigerator
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Window Coverings
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Washer
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">24x7 Security
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								<li>
									<label className="checkbox-item">Indoor Game
									<input type="checkbox" defaultChecked="checked" />
									<span className="checkmark" />
									</label>
								</li>
								</ul>
							</div>
							</div>
						</div>
						</div>
						<h4 className="title-2">Location</h4>
						<div className="property-details-google-map mb-60">
						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7183.0924780850855!2d-80.13898742333241!3d25.818539992322776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b372313dad1b%3A0xbadca3785d105a5a!2sNautilus%2C%20Miami%20Beach%2C%20FL%2033140%2C%20USA!5e0!3m2!1sen!2sca!4v1658335973569!5m2!1sen!2sca" width="100%" height="100%" frameBorder={0} allowFullScreen aria-hidden="false" tabIndex={0} />
						</div>

					</div>
					</div>

				</div>
				</div>
			</div>
        }
}

export default ShopDetails