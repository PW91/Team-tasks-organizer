// imports:

import React, { Component } from 'react';
import Popup from 'react-popup';
import TeamsManagementPopup from './TeamsManagementPopup';



// component's class definition including it's export:

export default class TeamsManagementButton extends Component {

    constructor() {

        super();

        // component's functions 'this' context bindings:

        this.handleTeamsManagementPopup = this.handleTeamsManagementPopup.bind( this );
    }

    // function, which handles teams management button click (opening management popup):

    handleTeamsManagementPopup() {

		Popup.registerPlugin( 'prompt', function () {
		    this.create({
		        content: <TeamsManagementPopup/>
		    })
        })

		Popup.plugins().prompt();
    }

    render() {

        // rendering html elements:

        return (
            <button className = 'button' onClick = { this.handleTeamsManagementPopup }>Zarządzaj zespołami</button>
        )
    }
}
