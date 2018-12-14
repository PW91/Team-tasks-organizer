// imports:

import React, { Component } from "react";
import TasksContainer from "./TasksContainer";
import Popup from "react-popup";
import { connect } from "react-redux";
import AddTaskPopup from "./AddTaskPopup";
import {
  pasteFirstTask,
  pasteNextTask
} from "../../reduxActions/calendarDataActions";
import store from "../../store/Store";

// component's class definition:

class UserCell extends Component {
  constructor() {
    super();

    // component's functions 'this' context bindings:

    this.handleAddTaskPopup = this.handleAddTaskPopup.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
  }

  // function, which handles add button click (opening add task popup):

  handleAddTaskPopup(id, e) {
    const cellTasksFlag = Boolean(
      e.target.parentElement.querySelector(".single-task")
    );

    Popup.registerPlugin("prompt", function() {
      this.create({
        title: null,
        content: <AddTaskPopup cellId={id} flag={cellTasksFlag} />
      });
    });

    Popup.plugins().prompt();
  }

  // function, which handle task pasting:

  handlePaste(cellId, e) {
    const cellTasksFlag = Boolean(
      e.target.parentElement.querySelector(".single-task")
    );

    if (cellTasksFlag) {
      store.dispatch(
        pasteNextTask(
          this.props.copiedTask,
          cellId,
          this.props.weekNum,
          this.props.year
        )
      );
    } else {
      store.dispatch(
        pasteFirstTask(
          this.props.copiedTask,
          cellId,
          this.props.weekNum,
          this.props.year
        )
      );
    }
  }

  render() {
    let weekendClass = "",
      holidayClass = "",
      tasksContainerEl = "",
      buttonEl = "";

    // prepare proper css class if weekend:

    if (this.props.weekendFlag) {
      weekendClass = "weekend";
    }

    // prepare proper css if holiday:

    if (this.props.holidayFlag) {
      holidayClass = "holiday";
    }

    // prepare proper 'tasks object' (from all week tasks) for current 'user cell' based on IDs:

    let tasksObj = function(id) {
      return this.props.weekTasks.find(item => {
        return id === item.id;
      });
    }.bind(this)(this.props.cellId);

    // prepare 'task container' if 'tasks object' exists:

    if (tasksObj) {
      tasksContainerEl = (
        <TasksContainer
          tasks={tasksObj.tasks}
          copy={this.props.copyMode}
          copied={this.props.copiedTask}
        />
      );
    }

    // prepare proper button based on copy mode status:

    if (this.props.copyMode) {
      buttonEl = (
        <button onClick={this.handlePaste.bind(null, this.props.cellId)}>
          Wklej
        </button>
      );
    } else {
      buttonEl = (
        <button onClick={this.handleAddTaskPopup.bind(null, this.props.cellId)}>
          Dodaj
        </button>
      );
    }

    // rendering html elements:

    return (
      <td id={this.props.cellId} className={weekendClass + " " + holidayClass}>
        {tasksContainerEl}
        {buttonEl}
      </td>
    );
  }
}

// function, which maps redux store values to component props:

function mapStateToProps(state) {
  return {
    weekNum: state.calendarData.week,
    year: state.calendarData.year,
    copiedTask: state.calendarData.copiedTask
  };
}

// exporting class after above mapping:

export default connect(mapStateToProps)(UserCell);
