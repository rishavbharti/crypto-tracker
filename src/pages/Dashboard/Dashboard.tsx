import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import { Button, Grid, TextField } from "@material-ui/core";

import AssetsTable from "./components/AssetsTable";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { addAsset } from "redux/assetsSlice";

const Dashboard = () => {
    const assetsState = useAppSelector((state) => state.assets);
    const dispatch = useAppDispatch();

    const [token, setToken] = useState("");
    const [quantity, setQuantity] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [mode, setMode] = useState("Add");

    function handleEditClick(_token: string, _quantity: string) {
        setToken(_token);
        setQuantity(_quantity);
        setMode("Save");
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "token") setToken(value);
        if (name === "quantity") setQuantity(value);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!token || !quantity) {
            setErrorMessage("Error: Please fill all the details");

            return;
        }
        dispatch(addAsset({ token, quantity: +quantity }));
        setErrorMessage("");
    };

    const renderAddAssetForm = () => {
        return (
            <div style={{ marginTop: "-1.5rem" }}>
                <h3>Add asset</h3>
                {errorMessage && (
                    <p
                        id='add_asset_error'
                        style={{ color: "red", fontSize: "0.8rem" }}
                    >
                        {errorMessage}
                    </p>
                )}
                <form onSubmit={handleSave}>
                    <TextField
                        name='token'
                        value={token}
                        onChange={handleChange}
                        variant='outlined'
                        fullWidth
                        id='dashboard_token'
                        label='Token'
                    />

                    <TextField
                        name='quantity'
                        variant='outlined'
                        value={quantity}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9].*",
                        }}
                        label='Quantity'
                        id='dashboard_quantity'
                        margin='normal'
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        id={`dashboard_${mode.toLowerCase()}_button`}
                        disabled={assetsState.add.status === "loading"}
                    >
                        {mode} Asset
                    </Button>
                </form>
            </div>
        );
    };

    return (
        <Container maxWidth='lg'>
            <h2 id='dashboard_heading'>Dashboard</h2>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={8}>
                    <AssetsTable handleEditClick={handleEditClick} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    {renderAddAssetForm()}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
