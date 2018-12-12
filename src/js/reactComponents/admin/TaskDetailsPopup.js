// imports:

import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store/Store";
import { updateTask } from "../../reduxActions/calendarDataActions";

// component's class definition:

class TaskDetailsPopup extends Component {
  constructor() {
    super();

    // component's own state:

    this.state = {
      editModeFlag: false
    };

    // component's functions 'this' context bindings:

    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // function, which handles submit button click (sending update to database):

  handleSubmit() {
    const taskObj = {
      name: this.refs.nameInput.value,
      description: this.refs.descriptionInput.value,
      link: this.refs.linkInput.value,
      type: this.refs.typeInput.value
    };

    store
      .dispatch(
        updateTask(
          taskObj,
          this.props.taskDetails.id,
          this.props.cellId,
          this.props.weekNum,
          this.props.year
        )
      )
      .then(() => {
        this.setState({ editModeFlag: false });
      });
  }

  // function, which handles starting edit mode (changing component's state):

  handleEdit() {
    this.setState({ editModeFlag: true });
  }

  // function, which handles canceling edit mode (changing component's state):

  handleCancel() {
    this.setState({ editModeFlag: false });
  }

  render() {
    let structure = "",
      taskType = "";

    // map task type to proper text:

    if (parseInt(this.props.taskDetails.type, 10) === 1) {
      taskType = "Zadanie";
    } else if (parseInt(this.props.taskDetails.type, 10) === 2) {
      taskType = "Urlop";
    }

    // prepare html structure based on edit mode flag:

    if (this.state.editModeFlag) {
      structure = (
        <div>
          <div className="popup__header">
            <h2>Edytuj zadanie</h2>
          </div>
          <div className="popup__content">
            <div className="popup__input-wrapper">
              <label className="popup__label">Typ zadania:</label>
              <select
                className="popup__input"
                ref="typeInput"
                defaultValue={this.props.taskDetails.type}
              >
                <option value="1">Zadanie</option>
                <option value="2">Urlop</option>
              </select>
            </div>
            <div className="popup__input-wrapper">
              <label className="popup__label">Nazwa zadania:</label>
              <input
                className="popup__input"
                ref="nameInput"
                defaultValue={this.props.taskDetails.name}
              />
            </div>
            <div className="popup__input-wrapper">
              <label className="popup__label">Opis zadania:</label>
              <input
                className="popup__input"
                ref="descriptionInput"
                defaultValue={this.props.taskDetails.description}
              />
            </div>
            <div className="popup__input-wrapper">
              <label className="popup__label">Link:</label>
              <input
                className="popup__input"
                ref="linkInput"
                defaultValue={this.props.taskDetails.link}
              />
            </div>
          </div>
          <div className="popup__cta">
            <button className="popup__button" onClick={this.handleSubmit}>
              Aktualizuj
            </button>
            <button className="popup__button" onClick={this.handleCancel}>
              Anuluj
            </button>
          </div>
        </div>
      );
    } else {
      structure = (
        <div>
          <div className="popup__header">
            <h2>Szczegóły zadania</h2>
          </div>
          <div className="popup__content">
            <h5>Typ:</h5>
            <p>{taskType}</p>
            <h5>Nazwa:</h5>
            <p>{this.props.taskDetails.name}</p>
            <h5>Opis:</h5>
            <p>{this.props.taskDetails.description}</p>
            <h5>Link:</h5>
            <p>
              <a href={this.props.taskDetails.link} target="_blank">
                {this.props.taskDetails.link}
              </a>
            </p>
          </div>
          <div className="popup_cta">
            <button className="popup__button" onClick={this.handleEdit}>
              Edytuj
            </button>
          </div>
        </div>
      );
    }

    // rendering html elements:

    return <div className="popup">{structure}</div>;
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

export default connect(mapStateToProps)(TaskDetailsPopup);
