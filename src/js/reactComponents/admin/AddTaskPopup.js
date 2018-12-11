// imports:

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popup from 'react-popup';
import { addNextTask, addFirstTask } from '../../reduxActions/calendarDataActions';
import store from '../../store/Store';



// component's class definition:

class AddTaskPopup extends Component {

    constructor() {

        super();

        this.handleSubmit = this.handleSubmit.bind( this );
    }

    // function, which handles submit button click:

    handleSubmit() {
        const taskObj = {
            name: this.refs.nameInput.value,
            description: this.refs.descriptionInput.value,
            link: this.refs.linkInput.value,
            type: this.refs.typeInput.value
        }

        // based on flag, which indicates first or next task, dispatch diffrent functions:

        if ( this.props.flag ) {
            store.dispatch( addNextTask( taskObj, this.props.cellId, this.props.weekNum, this.props.year ) )
            .then(() => {
                Popup.close();
            })
        } else {
            store.dispatch( addFirstTask( taskObj, this.props.cellId, this.props.weekNum, this.props.year ) )
            .then(() => {
                Popup.close();
            })
        }
    }

    render() {

        // rendering html elements:

        return (
            <div className='popup'>
                <div className = 'popup__header'>
                    <h2>Dodaj zadanie</h2>
                </div>
                <div className = 'popup__content'>
                    <div className = 'popup__input-wrapper'>
                        <label className = 'popup__label'>Typ zadania:</label>
                        <select className = 'popup__input' ref = 'typeInput'>
                            <option value = '1'>Zadanie</option>
                            <option value = '2'>Urlop</option>
                        </select>
                    </div>
                    <div className = 'popup__input-wrapper'>
                        <label className = 'popup__label'>Nazwa zadania:</label>
                        <input className = 'popup__input' ref='nameInput'/>
                    </div>
                    <div className = 'popup__input-wrapper'>
                        <label className = 'popup__label'>Opis zadania:</label>
                        <input className = 'popup__input' ref = 'descriptionInput'/>
                    </div>
                    <div className = 'popup__input-wrapper'>
                        <label className = 'popup__label'>Link do Active Collab:</label>
                        <input className = 'popup__input' ref = 'linkInput'/>
                    </div>
                </div>
                <div className = 'popup__cta'>
                    <button className = 'popup__button' onClick = { this.handleSubmit }>Dodaj</button>
                </div>
            </div>
        )
    }
}



// function, which maps redux store values to component props:

function mapStateToProps( state ) {
    return {
        weekNum: state.calendarData.week,
        year: state.calendarData.year
    }
}



// exporting class after above mapping:

export default connect( mapStateToProps )( AddTaskPopup );
