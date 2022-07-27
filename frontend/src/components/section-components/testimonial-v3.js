import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class TestimonialV3 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="ltn__testimonial-area ltn__testimonial-4 pt-115 pb-100 plr--9 go-top">
			  <div className="container-fluid">
			    <div className="row">
			      <div className="col-lg-12">
			        <div className="section-title-area ltn__section-title-2--- text-center">
			          <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Testimonial</h6>
			          <h1 className="section-title">Clients Feedback</h1>
			        </div>
			      </div>
			    </div>
			    <div className="row">
			      <div className="col-lg-12">
			        <div className="ltn__testimonial-slider-4 ltn__testimonial-slider-4-active slick-arrow-1">
			          <div className="ltn__testimonial-item-5">
			            <div className="ltn__quote-icon">
			              <i className="far fa-comments" />
			            </div>
			            <div className="ltn__testimonial-image">
			              <img src={publicUrl+"assets/img/testimonial/Person1.jpg"} alt="quote" />
			            </div>
			            <div className="ltn__testimonial-info">
			              <p>This has provided me with a great source of high-yield passive income.</p>
			              <h4>Cathy Williams</h4>
			              <h6>USA</h6>
			            </div>
			          </div>
			          <div className="ltn__testimonial-item-5">
			            <div className="ltn__quote-icon">
			              <i className="far fa-comments" />
			            </div>
			            <div className="ltn__testimonial-image"><img src={publicUrl+"assets/img/testimonial/Person2.jpg"} alt="quote" /></div>
			            <div className="ltn__testimonial-info">
			              <p>Best investment I've made in the last 3 years.</p>
			              <h4>Ethan James</h4>
			              <h6>Canada</h6>
			            </div>
			          </div>
			          <div className="ltn__testimonial-item-5">
			            <div className="ltn__quote-icon">
			              <i className="far fa-comments" />
			            </div>
			            <div className="ltn__testimonial-image"><img src={publicUrl+"assets/img/testimonial/Person3.jpg"} alt="quote" /></div>
			            <div className="ltn__testimonial-info">
			              <p>This has made it really simple to start investing in real estate.</p>
			              <h4>Noah Alexander</h4>
			              <h6>USA</h6>
			            </div>
			          </div>
			          <div className="ltn__testimonial-item-5">
			            <div className="ltn__quote-icon">
			              <i className="far fa-comments" />
			            </div>
			            <div className="ltn__testimonial-image"><img src={publicUrl+"assets/img/testimonial/Person4.jpg"} alt="quote" /></div>
			            <div className="ltn__testimonial-info">
			              <p>Allowed me to invest in USA based real estate from Bali.</p>
			              <h4>Debbie Jones</h4>
			              <h6>Bali</h6>
			            </div>
			          </div>
			        </div>
			        <ul className="ltn__testimonial-quote-menu d-none d-lg-block">
			          <li><img src={publicUrl+"assets/img/testimonial/Person1.jpg"} alt="Quote image" /></li>
			          <li><img src={publicUrl+"assets/img/testimonial/Person2.jpg"} alt="Quote image" /></li>
			          <li><img src={publicUrl+"assets/img/testimonial/Person3.jpg"} alt="Quote image" /></li>
			          <li><img src={publicUrl+"assets/img/testimonial/Person4.jpg"} alt="Quote image" /></li>
			        </ul>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default TestimonialV3