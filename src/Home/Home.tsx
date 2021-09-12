import React from "react";

import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Features from "./components/Features";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <Banner />
            <Features />
            <SignUp />
            <Footer />
        </>
    );
};

export default Home;
