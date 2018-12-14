// imports:

import React, { Component } from "react";
import Popup from "react-popup";
import { connect } from "react-redux";
import store from "../../store/Store";
import {
  deleteTask,
  deleteLastTask
} from "../../reduxActions/calendarDataActions";

// component's class definition:

class TaskDeletePopup extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleConfirmation = this.handleConfirmation.bind(this);
    this.handleCancelation = this.handleCancelation.bind(this);
  }

  // function, which handles confirm button click (deleting task):

  handleConfirmation() {
    // based on last task flag, dispatch diffrent functions:

    if (this.props.lastFlag) {
      store
        .dispatch(
          deleteLastTask(
            this.props.taskId,
            this.props.cellId,
            this.props.weekNum,
            this.props.year
          )
        )
        .then(() => {
          Popup.close();
        });
    } else {
      store
        .dispatch(
          deleteTask(
            this.props.taskId,
            this.props.cellId,
            this.props.weekNum,
            this.props.year
          )
        )
        .then(() => {
          Popup.close();
        });
    }
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
          <h2>Czy na pewno chcesz usunąć?</h2>
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

// function, which maps redux store values to component props:

function mapStateToProps(state) {
  return {
    weekNum: state.calendarData.week,
    year: state.calendarData.year
  };
}

// exporting class after above mapping:

export default connect(mapStateToProps)(TaskDeletePopup);
