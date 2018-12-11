// imports:

import React, { Component } from 'react';



// component's class definition including it's export:

export default class Layout extends Component {

    render() {

        // rendering html elements:

        return (
            <div className = 'layout'>
                { this.props.children }
            </div> 
        )
    }
}