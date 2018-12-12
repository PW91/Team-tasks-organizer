// imports:

import React, { Component } from "react";

// component's class definition including it's export:

export default class TaskDetailsPopup extends Component {
  render() {
    let taskType = "";

    // map task type to proper text:

    if (parseInt(this.props.taskDetails.type, 10) === 1) {
      taskType = "Zadanie";
    } else if (parseInt(this.props.taskDetails.type, 10) === 2) {
      taskType = "Urlop";
    }

    // rendering html elements:

    return (
      <div className="popup">
        <div>
          <div className="popup__header">
            <h2>Szczegóły</h2>
          </div>
          <div className="popup__content">
            <h5>Typ:</h5>
            <p>{taskType}</p>
            <h5>Nazwa:</h5>
            <p>{this.props.taskDetails.name}</p>
            <h5>Opis:</h5>
            <p>{this.props.taskDetails.description}</p>
            <h5>Link:</h5>
            <p>
              <a
                href={this.props.taskDetails.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.taskDetails.link}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
