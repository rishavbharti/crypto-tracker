import React, { useState } from "react";

import Container from "@material-ui/core/Container";

import AssetsTable from "./components/AssetsTable";
import { Button, Grid, TextField } from "@material-ui/core";

const Dashboard = () => {
    const [token, setToken] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "token") setToken(value);
        if (name === "quantity") setQuantity(value);
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // dispatch(addAsset({ token, quantity }));
    };

    const renderAddAssetForm = () => {
        return (
            <div style={{ marginTop: "-1.5rem" }}>
                <h3>Add asset</h3>
                <form onSubmit={handleSave}>
                    <TextField
                        name='token'
                        value={token}
                        onChange={handleChange}
                        variant='outlined'
                        required
                        fullWidth
                        id='dashboard_token'
                        label='Token'
                    />

                    <TextField
                        name='quantity'
                        variant='outlined'
                        value={quantity}
                        onChange={handleChange}
                        required
                        fullWidth
                        inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9].*",
                        }}
                        label='Quantity'
                        id='dashboard_quantity'
                        // helperText='Please enter a number'
                        margin='normal'
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        id='dashboard_add_button'
                        // disabled={assets.add.status === "loading"}
                    >
                        Add Asset
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
                    <AssetsTable />
                </Grid>
                <Grid item xs={12} sm={4}>
                    {renderAddAssetForm()}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
