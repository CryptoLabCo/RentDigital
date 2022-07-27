import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class Map extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

    return <div className="google-map mb-120">
			
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113545.1435869086!2d-114.17920488233003!3d51.03430847894804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537170039f843fd5%3A0x266d3bb1b652b63a!2sCalgary%2C%20AB!5e0!3m2!1sen!2sca!4v1658482952477!5m2!1sen!2sca" width="100%" height="100%"  frameBorder={0} allowFullScreen aria-hidden="false" tabIndex={0} />

            
            
		</div>
        }
}

export default Map