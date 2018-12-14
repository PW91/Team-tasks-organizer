// imports:

import React, { Component } from "react";
import Popup from "react-popup";
import UserDetailsPopup from "./UserDetailsPopup";

// component's class definition including it's export:

export default class UserDetailsButton extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleUserDetailsPopup = this.handleUserDetailsPopup.bind(this);
  }

  // function, which handles user details button click (showing user details popup):

  handleUserDetailsPopup(e) {
    const user = this.props.user;

    Popup.registerPlugin("prompt", function() {
      this.create({
        content: <UserDetailsPopup userInfo={user} />
      });
    });

    Popup.plugins().prompt();
  }

  render() {
    // rendering html elements:

    return (
      <div>
        <button
          className="calendar__cell-button"
          style={{ backgroundColor: this.props.color }}
          onClick={this.handleUserDetailsPopup}
        >
          Szczegóły
        </button>
      </div>
    );
  }
}
