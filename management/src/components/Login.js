import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";

async function loginUser(credentials) {
  return fetch(
    "http://"
      .concat(window.location.hostname)
      .concat(":5000")
      .concat("/login-management"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  ).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="formCenter">
          <form className="formFields" onSubmit={handleLogin}>
            <h3>SIGN IN</h3>
            <br />
            <div className="formField">
              <label className="formFieldLabel" htmlFor="username">
                USERNAME
              </label>
              <input
                type="username"
                className="formFieldInput"
                placeholder="Enter your username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="formFieldInput"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="formField">
              <button className="formFieldButton" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = { setToken: PropTypes.func.isRequired };
