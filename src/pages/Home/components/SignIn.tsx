import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { useAppSelector, useAppDispatch } from "app/hooks";

import { logIn } from "redux/authUserSlice";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem 12rem",
        width: "50%",
    },
    form: {
        margin: "0 auto",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    const classes = useStyles();

    const authState = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage(authState.errorMessage);
    }, [authState.errorMessage]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    };

    const handleSignInClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !password) {
            setErrorMessage(
                "Error: Unable to login, please fill all the details."
            );

            return;
        }
        dispatch(logIn({ username, password }));
        setErrorMessage("");
    };

    const renderForm = () => {
        return (
            <form
                className={classes.form}
                noValidate
                onSubmit={handleSignInClick}
            >
                <Grid container spacing={1}>
                    {errorMessage && (
                        <p
                            id='login_error'
                            style={{ color: "red", fontSize: "0.8rem" }}
                        >
                            {errorMessage}
                        </p>
                    )}
                    <Grid item xs={12}>
                        <TextField
                            name='username'
                            value={username}
                            onChange={handleChange}
                            variant='outlined'
                            required
                            fullWidth
                            id='login_username_field'
                            label='Username'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant='outlined'
                            value={password}
                            onChange={handleChange}
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='login_password_field'
                        />
                    </Grid>
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    id='login_button'
                    className={classes.submit}
                    disabled={authState.status === "loading"}
                >
                    Login
                </Button>
            </form>
        );
    };

    return (
        <section className={classes.container}>
            <h2 style={{ margin: "1rem 0 2rem 0" }} id='login_heading'>
                Login
            </h2>
            {renderForm()}
        </section>
    );
};

export default SignIn;
