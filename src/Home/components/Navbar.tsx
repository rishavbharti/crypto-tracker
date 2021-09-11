import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import logo from "../../logo.png";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "0.5rem 9rem",
    },
    logo: {
        height: "4rem",
        cursor: "pointer",
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <nav>
            <AppBar position="static" color="transparent">
                <div className={classes.container}>
                    <Toolbar>
                        <img
                            src={logo}
                            alt="Crypto Tracker logo"
                            className={classes.logo}
                            id="logo"
                        />
                        <Typography variant="h5" id="company_name">
                            Crypto Tracker
                        </Typography>
                    </Toolbar>
                </div>
            </AppBar>
        </nav>
    );
}
