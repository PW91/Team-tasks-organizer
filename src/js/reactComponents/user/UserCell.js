// imports:

import React, { Component } from 'react';
import TasksContainer from './TasksContainer';



// component's class definition including it's export:

export default class UserCell extends Component {

    render() {

        let weekendClass = '',
            holidayClass = '',
            tasksContainerEl = '';

        // prepare proper css class if weekend:

        if ( this.props.weekendFlag ) {
          weekendClass = 'weekend';
        }

        // prepare proper css if holiday:

        if ( this.props.holidayFlag ) {
            holidayClass = 'holiday';
        }

        // prepare proper 'tasks object' (from all week tasks) for current 'user cell' based on IDs:

        let tasksObj = (( id ) => {
            return this.props.weekTasks.find(( item ) => {
                return id === item.id;
            })
        })( this.props.cellId )  
        
        // prepare 'task container' if 'tasks object' exists: 

        if ( tasksObj ) {
            tasksContainerEl = <TasksContainer tasks = { tasksObj.tasks }/>
        }

        // rendering html elements:

        return (
            <td id = { this.props.cellId } className = { weekendClass + ' ' + holidayClass }>
                { tasksContainerEl }
            </td>
        )
    }
}
