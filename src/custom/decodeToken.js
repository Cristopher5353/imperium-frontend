import jwt_decode from "jwt-decode";

export const decodeToken = () => {
    let token = localStorage.getItem("token");
    if(token == null) return null;
    return jwt_decode(token);
}