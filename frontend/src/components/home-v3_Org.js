import React from 'react';
import Navbar from './global-components/navbar-v3';
import Banner from './section-components/banner-v3';
import Features from './section-components/features-v1';
import FeaturedItem from './section-components/featured-item-v1';
import Video from './section-components/video-v1';

import Testimonial from './section-components/testimonial-v3';

import Sponsor from './section-components/sponsor-v1';

import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const Home_V3 = () => {
    return <div>
        <Navbar />
        <Banner />
        <Features customClass="ltn__feature-area section-bg-1--- pt-115 pb-90 mb-120---"/>
        <FeaturedItem />
        <Video />

        <Testimonial />

        <Sponsor />


        
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Home_V3

