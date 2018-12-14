// imports:

import React, { Component } from "react";
import { connect } from "react-redux";
import SingleTeam from "./SingleTeam";
import store from "../../store/Store";
import { addTeam } from "../../reduxActions/calendarDataActions";

// component's class definition:

class TeamsManagementPopup extends Component {
  constructor() {
    super();

    // component's own state:

    this.state = {
      addModeFlag: false
    };

    // component's functions 'this' context bindings:

    this.handleAdd = this.handleAdd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // function, which handles add button click (changing internal component's state):

  handleAdd() {
    this.setState({ addModeFlag: true });
  }

  // function, which handles cancel button click (changing internal component's state):

  handleCancel() {
    this.setState({ addModeFlag: false });
  }

  // function, which handles submit button click (sending data to database):

  handleSubmit() {
    const teamName = this.refs.teamInput.value;
    const teamColor = this.refs.colorInput.value;

    store.dispatch(addTeam(teamName, teamColor)).then(() => {
      this.setState({ addModeFlag: false });
    });
  }

  render() {
    let structure = "";

    // prepare html structure based on edit mode flag:

    if (this.state.addModeFlag) {
      structure = (
        <div>
          <div className="popup__header">
            <h2>Dodaj zespół</h2>
          </div>
          <div className="popup__content">
            <div className="popup__input-wrapper">
              <label className="popup__label">Nazwa zespołu:</label>
              <input className="popup__input" ref="teamInput" />
            </div>
            <div className="popup__input-wrapper">
              <label className="popup__label">Kolor zespołu:</label>
              <input
                className="popup__input"
                ref="colorInput"
                placeholder="na przykład: orange, #332211, rgb(66, 134, 244)"
              />
            </div>
          </div>
          <div className="popup__cta">
            <button className="popup__button" onClick={this.handleSubmit}>
              Dodaj
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
            <h2>Zarządzanie zespołami</h2>
          </div>
          <div className="popup__content">
            {this.props.teams.map(team => {
              return <SingleTeam key={team.id} teamInfo={team} />;
            })}
          </div>
          <div className="popup__cta">
            <button className="popup__button" onClick={this.handleAdd}>
              Dodaj zespół
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
    teams: state.calendarData.teams
  };
}

// exporting class after above mapping:

export default connect(mapStateToProps)(TeamsManagementPopup);
