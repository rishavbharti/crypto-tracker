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
                <h1>
                    Get real time insights <br /> of your crypto investments
                </h1>
                <p className={classes.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div>
                <img src={Banner1} alt="banner" />
            </div>
        </header>
    );
};

export default Banner;
