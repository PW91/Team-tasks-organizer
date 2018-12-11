// imports:

import React, { Component } from 'react';
import store from '../../store/Store';
import { deleteTeam, updateTeam } from '../../reduxActions/calendarDataActions';



// component's class definition including it's export:

export default class SingleTeam extends Component {
    
    constructor() {

        super();

        // component's own state:

        this.state = {
            editModeFlag: false
        }

        // component's functions 'this' context bindings:

        this.handleTeamDelete = this.handleTeamDelete.bind( this );
        this.handleEdit = this.handleEdit.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleCancel = this.handleCancel.bind( this );
    }

    // function, which handles delete button click:

    handleTeamDelete() {
        store.dispatch( deleteTeam( this.props.teamInfo.id ) );
    } 

    // function, which handles edit button click (changing internal component's state):

    handleEdit() {
        this.setState({ editModeFlag: true })
    }

    // function, which handles add button click (sending data to database):

    handleSubmit() {

        const teamObj = {
            name: this.refs.teamInput.value,
            color: this.refs.colorInput.value
        }

        store.dispatch( updateTeam( teamObj, this.props.teamInfo.id ) )
        .then(() => {
            this.setState({ editModeFlag: false })
        })
    }

    // function, which handles cancel button click (closing popup):

    handleCancel() {
        this.setState({ editModeFlag: false })
    }

    render() {

        let structure = '';

        // prepare html structure based on edit mode flag:

        if ( this.state.editModeFlag ) {
            structure = 
                    <div>
                        <div className = 'popup__input-wrapper'>
                            <label className = 'popup__label'>Nazwa zespołu:</label>
                            <input className = 'popup__input' ref = 'teamInput' defaultValue = { this.props.teamInfo.name }/>
                        </div>
                        <div className = 'popup__input-wrapper'>
                            <label className = 'popup__label'>Kolor zespołu:</label>
                            <input className = 'popup__input' ref = 'colorInput' defaultValue = { this.props.teamInfo.color }/>
                        </div>
                        <button className = 'popup__button' onClick = { this.handleSubmit }>Aktualizuj</button>
                        <button className = 'popup__button' onClick = { this.handleCancel }>Anuluj</button>
                    </div>

        } else {
            structure = 
                <div className = 'flex-container--align-center flex-container--space-between'>
                    <div className = 'flex-container--align-center'>
                        <div style = {{ backgroundColor: this.props.teamInfo.color }} className = 'color-sample'></div>
                        <p>{ this.props.teamInfo.name }</p>
                    </div>
                    <div>
                        <button className = 'popup__button' onClick = { this.handleEdit }>Edytuj</button>
                        <button className = 'popup__button' onClick = { this.handleTeamDelete }>Usuń</button>
                    </div>
                </div>            
        }

        // rendering html elements:

        return (
            <div className = 'popup__list-item'>
                { structure }
            </div>
        )
    }
}
