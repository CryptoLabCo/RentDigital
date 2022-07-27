import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import FeaturedItem from './section-components/featured-item-v1';
import CallToActionV1 from './section-components/call-to-action-v1';
import Footer from './global-components/footer';

const Portfolio_V1 = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Investment Marketplace" subheader="Marketplace" />
        <FeaturedItem />
        <CallToActionV1 />
        <Footer />
    </div>
}

export default Portfolio_V1

