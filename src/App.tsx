import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { useAppSelector } from "app/hooks";

import Navbar from "components/Navbar";
import ProtectedRoute from "components/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
    let history = useHistory();

    const authState = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (authState.isAuthenticated) {
            history.push("/dashboard");
        }
    }, [history, authState.isAuthenticated]);

    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/' component={Home} exact />
                <ProtectedRoute path='/dashboard' component={Dashboard} />
            </Switch>
        </>
    );
}

export default App;
