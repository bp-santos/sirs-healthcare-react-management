import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import useToken from "./components/UseToken";
import Form from "./components/Form";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <Router>
          <Navbar />
          <Login setToken={setToken} />
        </Router>
      </>
    );
  }

  return (
    <>
      <Router>
        <Navbar />
        <Form />
      </Router>
    </>
  );
}

export default App;
