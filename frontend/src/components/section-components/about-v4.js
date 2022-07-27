import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV4 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return  <div className="ltn__about-us-area pt-120--- pb-90 mt--30 go-top">
				<div className="container">
				<div className="row">
					<div className="col-lg-6 align-self-center">
					<div className="about-us-img-wrap about-img-left">
						<img src={publicUrl+"assets/img/others/13.png"} alt="About Us Image" />
						<div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
						
						</div>
					</div>
					</div>
					<div className="col-lg-6 align-self-center">
					<div className="about-us-info-wrap">
						<div className="section-title-area ltn__section-title-2--- mb-20">
						<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">About Us</h6>
						<h1 className="section-title">The Leading Real Estate
							Investments<span>.</span></h1>
						<p>Over 5000 people from all around the world have invested in our real estate properties.</p>
						</div>
						<ul className="ltn__list-item-half clearfix">
						<li>
							<i className="flaticon-home-2" />
							High Yield
						</li>
						<li>
							<i className="flaticon-mountain" />
							Low buy-ins
						</li>
						<li>
							<i className="flaticon-heart" />
							Full Property Management
						</li>
						<li>
							<i className="flaticon-secure" />
							Completly Passive Income
						</li>
						</ul>
						<div className="ltn__callout bg-overlay-theme-05  mt-30">
						<p>"Invest from anywhere in the world" </p>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
        }
}

export default AboutV4