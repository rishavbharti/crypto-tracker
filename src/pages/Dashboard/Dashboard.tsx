import React from "react";

// import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AssetsTable from "./components/AssetsTable";

// const useStyles = makeStyles((theme) => ({}));

const Dashboard = () => {
    // const classes = useStyles();

    return (
        <Container maxWidth='lg'>
            <h2 id='dashboard_heading'>Dashboard</h2>
            <AssetsTable />
        </Container>
    );
};

export default Dashboard;
