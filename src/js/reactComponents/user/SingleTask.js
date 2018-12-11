// imports:

import React, { Component } from "react";
import Popup from "react-popup";
import TaskDetailsPopup from "./TaskDetailsPopup";

// component's class definition including it's export:

export default class SingleTask extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleTaskDetailsPopup = this.handleTaskDetailsPopup.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  // function, which handles task click (opening details popup):

  handleTaskDetailsPopup(details, e) {
    const cell = e.target.parentElement.parentElement.parentElement.getAttribute(
      "id"
    );

    Popup.registerPlugin("prompt", function() {
      this.create({
        title: null,
        content: <TaskDetailsPopup taskDetails={details} cellId={cell} />
      });
    });

    Popup.plugins().prompt();
  }

  // function, which stop events propagation, when link is clicked:

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    let taskTypeClass = "",
      activeCollabLink = "";

    // add proper css class based on task type ('task' or 'vacation'):

    console.log(this.props.task);

    if (
      parseInt(this.props.task.type, 10) === 1 ||
      this.props.task.type === "task"
    ) {
      taskTypeClass = "task";
    } else if (
      parseInt(this.props.task.type, 10) === 2 ||
      this.props.task.type === "vacation"
    ) {
      taskTypeClass = "vacation";
    }

    // show active collab link only if link exists:

    if (this.props.task.link) {
      activeCollabLink = (
        <a
          href={this.props.task.link}
          target="_blank"
          onClick={this.stopPropagation}
        >
          Active Collab
        </a>
      );
    }

    console.log("eldoka", taskTypeClass);

    // rendering html elements:

    return (
      <div
        id={this.props.task.id}
        className={"single-task single-task__user " + taskTypeClass}
        onClick={this.handleTaskDetailsPopup.bind(null, this.props.task)}
      >
        <div className="single-task__flex-container">
          <p>{this.props.task.name}</p>
          {activeCollabLink}
        </div>
      </div>
    );
  }
}
