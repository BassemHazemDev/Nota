import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import React from 'react';

let userEmail = ""
export const getEmail = (email)=>{
  userEmail = email
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  if(userEmail === decodedToken.email)
    localStorage.setItem('isAuthenticated',true)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/not-found"/>;
}
//<Navigate to={window.location.pathname === '/register' ? "/login" : "/not-found"}

export default PrivateRoute;
