import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "components/Navbar";
import ProtectedRoute from "components/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
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
