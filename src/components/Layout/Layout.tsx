import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "0.5rem 12rem",
    },
}));

const Layout = (props: any) => {
    const classes = useStyles();

    return <div className={classes.container}>{props.children}</div>;
};

export default Layout;
