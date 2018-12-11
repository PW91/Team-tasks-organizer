// imports:

import React, { Component } from 'react';
import UserCell from './UserCell';
import DatesConverter from '../../utils/DatesConverter';
import DeleteUserButton from './DeleteUserButton';
import UserDetailsButton from './UserDetailsButton';



// component's class definition including it's export:

export default class UserLine extends Component {

    render() {

        let teamColorStyle = '#e0e0e0';

        // prepare team color for user:

        for ( let i = 0; i < this.props.teams.length; i++ ) {
            if ( this.props.userObj.team === this.props.teams[i].id ) {
                teamColorStyle = this.props.teams[i].color;
            }
        }

        // rendering html elements:

        return(
            <tr id = { this.props.userObj.id }>
                <th className = 'name' style = {{ backgroundColor: teamColorStyle }}>
                  <p className = 'fullname'>{ this.props.userObj.name } { this.props.userObj.surname }</p>
                  <p className = 'position'>{ this.props.userObj.position }</p>
                    <UserDetailsButton user = { this.props.userObj } color = { teamColorStyle }/>
                    <DeleteUserButton color = { teamColorStyle }/>
                </th>
                <UserCell 
                    cellId = { DatesConverter.createCellId( this.props.userObj.id, this.props.firstDay, 0 ) } 
                    weekTasks = { this.props.weekTasks } 
                    holidayFlag = { this.props.holidayCheck[0] } 
                    copyMode = { this.props.copy } 
                    copiedTask = { this.props.copied }
                />
                <UserCell 
                    cellId = { DatesConverter.createCellId( this.props.userObj.id, this.props.firstDay, 1 ) } 
                    weekTasks = { this.props.weekTasks } 
                    holidayFlag = { this.props.holidayCheck[1] } 
                    copyMode = { this.props.copy } 
                    copiedTask = { this.props.copied }
                />
                <UserCell 
                    cellId = { DatesConverter.createCellId( this.props.userObj.id, this.props.firstDay, 2 ) } 
                    weekTasks = { this.props.weekTasks } 
                    holidayFlag = { this.props.holidayCheck[2] } 
                    copyMode = { this.props.copy } 
                    copiedTask = { this.props.copied }
                />
                <UserCell 
                    cellId = { DatesConverter.createCellId( this.props.userObj.id, this.props.firstDay, 3 ) } 
                    weekTasks = { this.props.weekTasks } 
                    holidayFlag = { this.props.holidayCheck[3] } 
                    copyMode = { this.props.copy } 
                    copiedTask = { this.props.copied }
                />
                <UserCell 
                    cellId = { DatesConverter.createCellId( this.props.userObj.id, this.props.firstDay, 4 ) } 
                    weekTasks = { this.props.weekTasks } 
                    holidayFlag = { this.props.holidayCheck[4] } 
                    copyMode = { this.props.copy } 
                    copiedTask = { this.props.copied }
                />
                <UserCell 
                    cellId = { DatesConverter.createCellId( this.props.userObj.id, this.props.firstDay, 5 ) } 
                    weekTasks = { this.props.weekTasks } 
                    holidayFlag = { this.props.holidayCheck[5] } 
                    copyMode = { this.props.copy } 
                    copiedTask = { this.props.copied } 
                    weekendFlag
                />
                <UserCell 
                    cellId = { DatesConverter.createCellId( this.props.userObj.id, this.props.firstDay, 6 ) } 
                    weekTasks = { this.props.weekTasks } 
                    holidayFlag = { this.props.holidayCheck[6] } 
                    copyMode = { this.props.copy } 
                    copiedTask = { this.props.copied } 
                    weekendFlag
                />
            </tr>
        )
    }
}
