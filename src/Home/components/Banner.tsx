import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Banner1 from "../../assets/banner_1.svg";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        padding: "0.5rem 12rem",
        background: "hsl(233, 12%, 13%)",
        color: "white",
    },
    leftSection: {
        padding: "10rem 0",
        textAlign: "left",
    },
    description: {
        fontSize: "1.2rem",
    },
}));

const Banner = () => {
    const classes = useStyles();

    return (
        <header className={classes.container}>
            <div className={classes.leftSection}>
                <h1 id="product_headline">
                    Crypto Tracker: All your crypto in one place
                </h1>
                <p className={classes.description} id="product_description">
                    Crypto Tracker is a web app that allows you to easily manage
                    your Crypto currency holdings in one place. Keep track of
                    the prices and your profit/loss trends.
                </p>
            </div>
            <div>
                <img src={Banner1} alt="banner" />
            </div>
        </header>
    );
};

export default Banner;
