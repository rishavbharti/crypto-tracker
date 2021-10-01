import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useAppDispatch, useAppSelector } from "app/hooks";

import { logout } from "redux/authUserSlice";

import logo from "assets/logo.png";

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
    let history = useHistory();
    const dispatch = useAppDispatch();

    const authState = useAppSelector((state) => state.auth);

    function handleLogout() {
        dispatch(logout());
        history.push("/");
    }

    return (
        <nav>
            <AppBar position='static' color='transparent'>
                <div className={classes.container}>
                    <Toolbar>
                        <img
                            src={logo}
                            alt='Crypto Tracker logo'
                            className={classes.logo}
                            id='logo'
                        />
                        <Typography
                            variant='h5'
                            component='div'
                            id='company_name'
                            style={{ flexGrow: 1 }}
                        >
                            Crypto Tracker
                        </Typography>

                        {authState.isAuthenticated && (
                            <Button id='logout_link' onClick={handleLogout}>
                                Logout
                            </Button>
                        )}
                    </Toolbar>
                </div>
            </AppBar>
        </nav>
    );
}
