import { Redirect, Route, RouteProps } from "react-router";

import { useAppSelector } from "app/hooks";

export default function ProtectedRoute({ ...routeProps }: RouteProps) {
    const authState = useAppSelector((state) => state.auth);

    if (authState.isAuthenticated) {
        return <Route {...routeProps} />;
    } else {
        return <Redirect to='/' />;
    }
}
