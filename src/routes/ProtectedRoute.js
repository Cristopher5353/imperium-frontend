import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "../custom/decodeToken";

export const ProtectedRoute = ({roles, redirectTo="/login"}) => {
    let isAuthenticated = !!decodeToken() && roles.includes(decodeToken().role);

    if(!isAuthenticated) {
        return <Navigate to={redirectTo}/>
    }

    return <Outlet/>;
}