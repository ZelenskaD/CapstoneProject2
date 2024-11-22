
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";

// import "./Styles/Homepage.css";

function Homepage() {
    const { currentUser } = useContext(UserContext);



    return (
        <div>
            {currentUser ? (
                <div className="greetings">
                    <h1>Welcome back, {currentUser.firstName || currentUser.username}!</h1>
                </div>
            ) : (
                <div className="greetings">
                    <h1>Welcome to Nyxis!</h1>
                    <div className="button-container">
                        <Link to="/login" className="nav-link-log">Login</Link>
                        <Link to="/signup" className="nav-link-log">Sign Up</Link>
                    </div>
                </div>
            )}




        </div>
    );
}

export default Homepage;
