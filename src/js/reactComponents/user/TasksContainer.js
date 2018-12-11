// imports:

import React, { Component } from 'react';
import SingleTask from './SingleTask';
import Utils from '../../utils/Utils';



// component's class definition including it's export:

export default class TasksContainer extends Component {

    render() {

        // rendering html elements:

        return (
            <div>
                { Utils.convertToArr( this.props.tasks ).map( ( item ) =>
                    <SingleTask task = { item } key = { item.id }/>
                )}
            </div>
        )
    }
}