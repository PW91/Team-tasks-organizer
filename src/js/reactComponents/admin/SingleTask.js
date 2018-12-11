// imports:

import React, { Component } from "react";
import Popup from "react-popup";
import TaskDetailsPopup from "./TaskDetailsPopup";
import TaskDeletePopup from "./TaskDeletePopup";
import store from "../../store/Store";
import {
  startCopyMode,
  copyTask
} from "../../reduxActions/calendarDataActions";

// component's class definition including it's export:

export default class SingleTask extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleTaskDetailsPopup = this.handleTaskDetailsPopup.bind(this);
    this.handleTaskDeletePopup = this.handleTaskDeletePopup.bind(this);
    this.handleCopyModeStart = this.handleCopyModeStart.bind(this);
  }

  // function, which handles details button click (opening details popup):

  handleTaskDetailsPopup(details, e) {
    const cell = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
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

  // function, which handles delete button click (opening confirmation popup):

  handleTaskDeletePopup(id, e) {
    const cell = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
      "id"
    );
    const cellTaskCounter = e.target.parentElement.parentElement.parentElement.querySelectorAll(
      ".single-task"
    ).length;
    let lastTaskFlag = false;

    if (cellTaskCounter === 1) {
      lastTaskFlag = true;
    }

    Popup.registerPlugin("prompt", function() {
      this.create({
        title: null,
        content: (
          <TaskDeletePopup taskId={id} cellId={cell} lastFlag={lastTaskFlag} />
        )
      });
    });

    Popup.plugins().prompt();
  }

  // function, which handles copy button click (starting copy mode):

  handleCopyModeStart(task) {
    store.dispatch(startCopyMode());
    store.dispatch(copyTask(task));
  }

  render() {
    let taskTypeClass = "",
      taskCopiedClass = "",
      activeCollabLink = "",
      buttonsEl = "";

    // add proper css class based on task type ('task' or 'vacation'):

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

    // add proper css class if task is currently copied:

    if (this.props.copiedTask) {
      if (this.props.copiedTask.id === this.props.task.id) {
        taskCopiedClass = "copied";
      }
    }

    // show active collab link only if link exists:

    if (this.props.task.link) {
      activeCollabLink = (
        <a href={this.props.task.link} target="_blank">
          Active Collab
        </a>
      );
    }

    // show buttons if copy mode is off:

    if (!this.props.copyMode) {
      buttonsEl = (
        <div>
          <button
            onClick={this.handleTaskDetailsPopup.bind(null, this.props.task)}
          >
            Szczegóły
          </button>
          <button
            onClick={this.handleCopyModeStart.bind(null, this.props.task)}
          >
            Kopiuj
          </button>
          <button
            onClick={this.handleTaskDeletePopup.bind(null, this.props.task.id)}
          >
            Usuń
          </button>
        </div>
      );
    }

    // rendering html elements:

    return (
      <div
        id={this.props.task.id}
        className={"single-task " + taskTypeClass + " " + taskCopiedClass}
      >
        <div className="single-task__flex-container">
          <p>{this.props.task.name}</p>
          {activeCollabLink}
        </div>
        {buttonsEl}
      </div>
    );
  }
}
