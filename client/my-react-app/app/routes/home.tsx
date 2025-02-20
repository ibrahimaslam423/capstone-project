import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Logo in the top-left corner */}
      <div className="logo">
        <img
          src="https://offcampushousing.utc.edu/assets/campus_assets/tennessee-chattanooga/images/logo.svg?v=99999"
          alt="UTC Off-Campus Housing Logo"
        />
      </div>

      {/* Login Buttons */}
      <div className="login-buttons">
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/auth/google/utc`}
          className="login-button utc-login"
          aria-label="Login with UTC Google Account"
        >
          UTC Login
        </a>
        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/auth/google/property`}
          className="login-button property-login"
          aria-label="Login as Property Manager"
        >
          Property Login
        </a>

         {/* Bypass Student Landing Button */}
         <a
          href="/student-landing"
          className="login-button bypass-login"
          aria-label="Bypass Login to Student Landing"
        >
          Bypass Login
        </a>

      </div>
    </div>
  );
}
