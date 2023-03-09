import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({isAuthenticated, redirectTo="/login"}) => {
    if(!isAuthenticated) {
        return <Navigate to={redirectTo}/>
    }
    return <Outlet/>;
}