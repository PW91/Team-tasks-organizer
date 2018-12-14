// imports:

import React, { Component } from "react";
import Popup from "react-popup";
import { deleteUser } from "../../reduxActions/calendarDataActions";
import store from "../../store/Store";

// component's class definition including it's export:

export default class DeleteUserPopup extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleCancelation = this.handleCancelation.bind(this);
  }

  // function, which handles confirm button click (deleting user and closing popup afterwards):

  handleConfirmation() {
    store.dispatch(deleteUser(this.props.id)).then(() => {
      Popup.close();
    });
  }

  // function, which handles cancel button click (closing popup):

  handleCancelation() {
    Popup.close();
  }

  render() {
    // rendering html elements:

    return (
      <div className="popup">
        <div className="popup__header">
          <h2>Czy na pewno chcesz usunąć użytkownika?</h2>
        </div>
        <div className="popup__cta">
          <button className="popup__button" onClick={this.handleConfirmation}>
            Tak
          </button>
          <button className="popup__button" onClick={this.handleCancelation}>
            Nie
          </button>
        </div>
      </div>
    );
  }
}
