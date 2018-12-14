// imports:

import React, { Component } from "react";
import DeleteUserPopup from "./DeleteUserPopup";
import Popup from "react-popup";

// component's class definition including it's export:

export default class DeleteUserButton extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleDeleteUserPopup = this.handleDeleteUserPopup.bind(this);
  }

  // function, which handles delete button click (opening confirmation popup):

  handleDeleteUserPopup(e) {
    const userId = e.target.parentElement.parentElement.parentElement.getAttribute(
      "id"
    );

    Popup.registerPlugin("prompt", function() {
      this.create({
        content: <DeleteUserPopup id={userId} />
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
          onClick={this.handleDeleteUserPopup}
        >
          Usuń
        </button>
      </div>
    );
  }
}
