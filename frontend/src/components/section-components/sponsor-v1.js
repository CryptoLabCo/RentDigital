import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Sponsor extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="ltn__brand-logo-area ltn__brand-logo-1 section-bg-1 pt-110 pb-110 plr--9 d-none---">
			  <div className="container-fluid">
			    <div className="row ltn__brand-logo-active">
			      <div className="col-lg-12">
			        <div className="ltn__brand-logo-item">
			          <img src={publicUrl+"assets/img/brand-logo/forbes.png"} alt="Brand Logo" />
			        </div>
			      </div>
			      <div className="col-lg-12">
			        <div className="ltn__brand-logo-item">
			          <img src={publicUrl+"assets/img/brand-logo/techcrunch.png"} alt="Brand Logo" />
			        </div>
			      </div>
			      <div className="col-lg-12">
			        <div className="ltn__brand-logo-item">
			          <img src={publicUrl+"assets/img/brand-logo/fox.png"} alt="Brand Logo" />
			        </div>
			      </div>
			      
			    </div>
			  </div>
			</div>
        }
}

export default Sponsor