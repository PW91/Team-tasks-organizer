// imports:

import React, { Component } from "react";
import { updateUser } from "../../reduxActions/calendarDataActions";
import { connect } from "react-redux";
import store from "../../store/Store";

// component's class definition:

class UserDetailsPopup extends Component {
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

  // function, which handles starting edit mode (changing component's state):

  handleEdit() {
    this.setState({ editModeFlag: true });
  }

  // function, which handles canceling edit mode (changing component's state):

  handleCancel() {
    this.setState({ editModeFlag: false });
  }

  // function, which handles submit button click (sending update to database):

  handleSubmit() {
    const userObj = {
      name: this.refs.userNameInput.value,
      surname: this.refs.userSurnameInput.value,
      position: this.refs.userPositionInput.value,
      team: this.refs.userTeamInput.value
    };

    store.dispatch(updateUser(userObj, this.props.userInfo.id)).then(() => {
      this.setState({ editModeFlag: false });
    });
  }

  render() {
    let structure = "",
      teamName = "";

    // prepare team color for user:

    for (let i = 0; i < this.props.teams.length; i++) {
      if (this.props.teams[i].id === this.props.userInfo.team) {
        teamName = this.props.teams[i].name;
      }
    }

    // prepare html structure based on edit mode flag:

    if (this.state.editModeFlag) {
      structure = (
        <div>
          <div className="popup__header">
            <h2>Edytuj użytkownika</h2>
          </div>
          <div className="popup__content">
            <div className="popup__input-wrapper">
              <label className="popup__label">Imię:</label>
              <input
                className="popup__input"
                ref="userNameInput"
                defaultValue={this.props.userInfo.name}
              />
            </div>
            <div className="popup__input-wrapper">
              <label className="popup__label">Nazwisko:</label>
              <input
                className="popup__input"
                ref="userSurnameInput"
                defaultValue={this.props.userInfo.surname}
              />
            </div>
            <div className="popup__input-wrapper">
              <label className="popup__label">Pozycja:</label>
              <input
                className="popup__input"
                ref="userPositionInput"
                defaultValue={this.props.userInfo.position}
              />
            </div>
            <div className="popup__input-wrapper">
              <label className="popup__label">Zespół:</label>
              <select
                className="popup__input"
                ref="userTeamInput"
                defaultValue={this.props.userInfo.team}
              >
                {this.props.teams.map(team => {
                  return (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  );
                })}
              </select>
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
            <h2>Szczegóły</h2>
          </div>
          <div className="popup__content">
            <h5>Imię:</h5>
            <p>{this.props.userInfo.name}</p>
            <h5>Nazwisko:</h5>
            <p>{this.props.userInfo.surname}</p>
            <h5>Pozycja:</h5>
            <p>{this.props.userInfo.position}</p>
            <h5>Zespół:</h5>
            <p>{teamName}</p>
          </div>
          <div className="popup__cta">
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
    teams: state.calendarData.teams
  };
}

// exporting class after above mapping:

export default connect(mapStateToProps)(UserDetailsPopup);
