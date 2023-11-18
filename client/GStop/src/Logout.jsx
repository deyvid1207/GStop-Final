import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './UserContext';
import API_URL from "./API_URL";
import * as jwt from 'jwt-decode';
 

function Logout() {
    localStorage.clear();
    window.location.reload(false);
   console.log("clear")
   
}
export default Logout