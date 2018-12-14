// imports:

import React, { Component } from "react";
import Popup from "react-popup";
import AddUserPopup from "./AddUserPopup";

// component's class definition including it's export:

export default class AddUserButton extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleAddUserPopup = this.handleAddUserPopup.bind(this);
  }

  // function, which handles 'add user' button click (opening add user popup):

  handleAddUserPopup() {
    Popup.registerPlugin("prompt", function() {
      this.create({
        content: <AddUserPopup />
      });
    });

    Popup.plugins().prompt();
  }

  render() {
    // rendering html elements:

    return (
      <button className="button" onClick={this.handleAddUserPopup}>
        Dodaj użytkownika
      </button>
    );
  }
}
