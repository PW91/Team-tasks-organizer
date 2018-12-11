// imports:

import React, { Component } from 'react';
import Popup from 'react-popup';
import { connect } from 'react-redux';
import { addNewUser } from '../../reduxActions/calendarDataActions';
import store from '../../store/Store';



// component's class definition:

class AddUserPopup extends Component {

    constructor() {

        super();

        // component's own state:

        this.addUser = this.addUser.bind( this );     
    }

    // function, which handles adding new user and closing popup afterwords:

    addUser() {

        const userObj = {
            name: this.refs.userNameInput.value,
            surname: this.refs.userSurnameInput.value,
            position: this.refs.userPositionInput.value,
            team: this.refs.userTeamInput.value
        }

        store.dispatch( addNewUser( userObj ) )
        .then(() => {
            Popup.close();
        })
    }

    render(){

        // rendering html elements:

        return(
            <div className = 'popup'>
                <div className = 'popup__header'>
                    <h2>Dodaj użytkownika</h2>
                </div>
                <div className = 'popup__content'>
                    <div className = 'popup__input-wrapper'>
                        <label className = 'popup__label'>Imię:</label>
                        <input className = 'popup__input' ref = 'userNameInput'/>
                    </div>
                    <div className = 'popup__input-wrapper'>
                        <label className = 'popup__label'>Nazwisko:</label>
                        <input className = 'popup__input' ref = 'userSurnameInput'/>
                    </div>
                    <div className = 'popup__input-wrapper'>
                        <label className = 'popup__label'>Pozycja:</label>
                        <input className = 'popup__input' ref = 'userPositionInput'/>
                    </div>
                    <div className = 'popup__input-wrapper'>
                    <label className = 'popup__label'>Zespół:</label>
                        <select className = 'popup__input' ref = 'userTeamInput'>
                            { this.props.teams.map(( team ) => {
                            return <option key = { team.id } value = { team.id }>{ team.name }</option>;
                        })}
                        </select>
                    </div>
                </div>
                <div className = 'popup__cta'>
                    <button className = 'popup__button' onClick = { this.addUser }>Dodaj</button>
                </div>
            </div>
        )
    }
}



// function, which maps redux store values to component props:

function mapStateToProps( state ) {
    return {
      user: state.calendarData.users,
      teams: state.calendarData.teams
    }
}



// exporting class after above mapping:

export default connect( mapStateToProps )( AddUserPopup );
