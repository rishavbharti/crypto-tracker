import React from "react";

import Banner from "./components/Banner";
import Features from "./components/Features";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";

const Home = () => {
    return (
        <>
            <Banner />
            <Features />
            <div style={{ display: "flex" }}>
                <SignUp />
                <SignIn />
            </div>
            <Footer />
        </>
    );
};

export default Home;
