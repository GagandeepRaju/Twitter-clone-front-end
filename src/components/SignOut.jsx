import React, { Component } from "react";
import { logout } from "../utilities/authServices";

class SignOut extends Component {
  componentDidMount() {
    logout();
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h1>We are logging out your Profile</h1>
      </div>
    );
  }
}

export default SignOut;
