import React from "react";
import SignInForm from "../SignInForm";

import "../../App.css";

function Home() {
  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <SignInForm />
      </div>
    </div>
  );
}

export default Home;
