import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { useAppSelector, useAppDispatch } from "app/hooks";

import { signUp } from "redux/authUserSlice";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2rem 12rem",
    },
    form: {
        width: "50%", // Fix IE 11 issue.
        margin: "0 auto",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();

    const authSate = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "username") setUsername(value);
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };

    const handleSignUpClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setErrorMessage(
                "Error: Unable to signup, please fill all the details."
            );

            return;
        }
        dispatch(signUp({ username, email, password }));
    };

    const renderForm = () => {
        return (
            <form
                className={classes.form}
                noValidate
                onSubmit={handleSignUpClick}
            >
                <Grid container spacing={2}>
                    {errorMessage && (
                        <p
                            id="signup_error"
                            style={{ color: "red", fontSize: "0.8rem" }}
                        >
                            {errorMessage}
                        </p>
                    )}
                    <Grid item xs={12}>
                        <TextField
                            name="username"
                            value={username}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                            id="username_field"
                            label="Username"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            value={email}
                            onChange={handleChange}
                            required
                            fullWidth
                            id="email_field"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            value={password}
                            onChange={handleChange}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password_field"
                            autoComplete="current-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    id="signup_button"
                    className={classes.submit}
                    disabled={authSate.status === "loading"}
                    // onClick={handleSignUpClick}
                >
                    Signup
                </Button>
            </form>
        );
    };

    return (
        <section className={classes.container}>
            <h2 style={{ margin: "1rem 0 2rem 0" }} id="registration_heading">
                Registration
            </h2>
            {renderForm()}
        </section>
    );
};

export default SignUp;
