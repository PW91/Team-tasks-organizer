// imports:

import React, { Component } from "react";
import Popup from "react-popup";
import store from "../../store/Store";
import { connect } from "react-redux";
import {
  setDate,
  fetchUsers,
  fetchTasksForWeek,
  fetchTeams,
  changeSorting,
  stopCopyMode
} from "../../reduxActions/calendarDataActions";
import UserLine from "./UserLine";
import DatesConverter from "../../utils/DatesConverter";
import AddUserButton from "./AddUserButton";
import TeamsManagementButton from "./TeamsManagementButton";

// component's class definition:

class Calendar extends Component {
  constructor() {
    super();

    // component's own state:

    this.state = {
      reduxPropsReady: null
    };

    // component's functions 'this' context bindings:

    this.handlePrevWeek = this.handlePrevWeek.bind(this);
    this.handleNextWeek = this.handleNextWeek.bind(this);
    this.handleSortingChange = this.handleSortingChange.bind(this);
    this.handleCopyModeStop = this.handleCopyModeStop.bind(this);
  }

  // fire below code, when component will mount (instantly):

  componentWillMount() {
    this.setState({ reduxPropsReady: false });

    const today = DatesConverter.getToday(),
      weekNum = DatesConverter.getWeek(today),
      firstDayOfWeek = DatesConverter.getFirstDayOfWeek(weekNum, today.year);

    store.dispatch(setDate(firstDayOfWeek, weekNum, today.year));
    store.dispatch(fetchUsers());
    store.dispatch(fetchTasksForWeek(weekNum, today.year));
    store.dispatch(fetchTeams());
  }

  // fire below code, when component receives props from redux store:

  componentWillReceiveProps() {
    this.setState({ reduxPropsReady: true });
  }

  // function, which handles previous week arrow click:

  handlePrevWeek() {
    const prevDate = DatesConverter.calculatePrevDate(
      this.props.firstDayOfWeek,
      7
    );

    const prevWeekNum = DatesConverter.getWeek(prevDate);

    let firstDayOfPrevWeek;

    if (prevWeekNum === 1) {
      firstDayOfPrevWeek = DatesConverter.getFirstDayOfWeek(
        prevWeekNum,
        this.props.firstDayOfWeek.year
      );

      store.dispatch(
        setDate(firstDayOfPrevWeek, prevWeekNum, this.props.firstDayOfWeek.year)
      );
      store.dispatch(
        fetchTasksForWeek(prevWeekNum, this.props.firstDayOfWeek.year)
      );
    } else {
      let firstDayOfPrevWeek = DatesConverter.getFirstDayOfWeek(
        prevWeekNum,
        prevDate.year
      );

      store.dispatch(setDate(firstDayOfPrevWeek, prevWeekNum, prevDate.year));
      store.dispatch(fetchTasksForWeek(prevWeekNum, prevDate.year));
    }
  }

  // function, which handles next week arrow click:

  handleNextWeek() {
    const nextDate = DatesConverter.calculateNextDate(
      this.props.firstDayOfWeek,
      7
    );

    const nextWeekNum = DatesConverter.getWeek(nextDate);

    let firstDayOfNextWeek;

    if (nextWeekNum === 1) {
      firstDayOfNextWeek = DatesConverter.getFirstDayOfWeek(
        nextWeekNum,
        this.props.firstDayOfWeek.year + 1
      );

      store.dispatch(
        setDate(
          firstDayOfNextWeek,
          nextWeekNum,
          this.props.firstDayOfWeek.year + 1
        )
      );
      store.dispatch(
        fetchTasksForWeek(nextWeekNum, this.props.firstDayOfWeek.year + 1)
      );
    } else {
      firstDayOfNextWeek = DatesConverter.getFirstDayOfWeek(
        nextWeekNum,
        nextDate.year
      );

      store.dispatch(setDate(firstDayOfNextWeek, nextWeekNum, nextDate.year));
      store.dispatch(fetchTasksForWeek(nextWeekNum, nextDate.year));
    }
  }

  // function, which handles sorting change click:

  handleSortingChange() {
    store.dispatch(changeSorting());
  }

  // function, which handles stoping copy mode (clicking 'stop copying' button):

  handleCopyModeStop() {
    store.dispatch(stopCopyMode());
  }

  render() {
    // render only if props, which come from redux store, are ready:

    if (this.state.reduxPropsReady) {
      let daysArr = [],
        holidayCheckArr = [],
        daysTypeArr = [],
        todayArr = [],
        sortingText = "Sortuj po nazwisku",
        today = DatesConverter.getToday(),
        copyModeButton = "";

      // preparing array with dates for whole week:

      for (let i = 0; i < 7; i++) {
        const nextDate = DatesConverter.calculateNextDate(
          this.props.firstDayOfWeek,
          i
        );
        daysArr.push(nextDate);
      }

      // preparing array with holiday check for every week day:

      for (let i = 0; i < 7; i++) {
        const holidayFlag = DatesConverter.holidayCheck(daysArr[i]);
        holidayCheckArr.push(holidayFlag);
      }

      // based on abobe array, preparing array with proper css class for each day:

      for (let i = 0; i < 7; i++) {
        if (holidayCheckArr[i]) {
          daysTypeArr.push("holiday");
        } else {
          daysTypeArr.push("working");
        }
      }

      // checking today and preparing array with proper css class:

      for (let i = 0; i < 7; i++) {
        if (
          daysArr[i].day === today.day &&
          daysArr[i].month === today.month &&
          daysArr[i].year === today.year
        ) {
          todayArr.push("today");
        } else {
          todayArr.push("");
        }
      }

      // preparing sorting text based on current sorting type:

      if (this.props.sortingBySurnameFlag) {
        sortingText = "Sortuj po zespole";
      }

      // preparing copy mode button if copy mode is running:

      if (this.props.copyMode) {
        copyModeButton = (
          <button
            className="button button--copy"
            onClick={this.handleCopyModeStop}
          >
            Zakończ kopiowanie
          </button>
        );
      }

      // rendering html elements:

      return (
        <div className="calendar">
          <div className="calendar__header">
            <div className="calendar__options">
              <AddUserButton />
              <TeamsManagementButton />
            </div>
            <div className="calendar__main-dates">
              <div className="flex-container--center-all">
                <div
                  className="arrow arrow--prev"
                  onClick={this.handlePrevWeek}
                >
                  <img src="./assets/img/arrow.png" alt="arrow" />
                </div>
                <h1>TYDZIEŃ {this.props.weekNum}</h1>
                <div
                  className="arrow arrow--next"
                  onClick={this.handleNextWeek}
                >
                  <img src="./assets/img/arrow.png" alt="arrow" />
                </div>
              </div>
              <h4>
                {DatesConverter.convertDateToString(daysArr[0])} -{" "}
                {DatesConverter.convertDateToString(daysArr[6])}
              </h4>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th className="empty" onClick={this.handleSortingChange}>
                  {sortingText}
                </th>
                <th className={daysTypeArr[0] + " " + todayArr[0]}>
                  <div>Poniedziałek</div>
                  <div>{DatesConverter.convertDateToString(daysArr[0])}</div>
                </th>
                <th className={daysTypeArr[1] + " " + todayArr[1]}>
                  <div>Wtorek</div>
                  <div>{DatesConverter.convertDateToString(daysArr[1])}</div>
                </th>
                <th className={daysTypeArr[2] + " " + todayArr[2]}>
                  <div>Środa</div>
                  <div>{DatesConverter.convertDateToString(daysArr[2])}</div>
                </th>
                <th className={daysTypeArr[3] + " " + todayArr[3]}>
                  <div>Czwartek</div>
                  <div>{DatesConverter.convertDateToString(daysArr[3])}</div>
                </th>
                <th className={daysTypeArr[4] + " " + todayArr[4]}>
                  <div>Piątek</div>
                  <div>{DatesConverter.convertDateToString(daysArr[4])}</div>
                </th>
                <th className={daysTypeArr[5] + " " + todayArr[5] + " weekend"}>
                  <div>Sobota</div>
                  <div>{DatesConverter.convertDateToString(daysArr[5])}</div>
                </th>
                <th className={daysTypeArr[6] + " " + todayArr[6] + " weekend"}>
                  <div>Niedziela</div>
                  <div>{DatesConverter.convertDateToString(daysArr[6])}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user => (
                <UserLine
                  key={user.id}
                  userObj={user}
                  firstDay={this.props.firstDayOfWeek}
                  weekTasks={this.props.weekTasks}
                  holidayCheck={holidayCheckArr}
                  teams={this.props.teams}
                  copy={this.props.copyMode}
                  copied={this.props.copiedTask}
                />
              ))}
            </tbody>
          </table>
          {copyModeButton}
          <Popup btnClass="mm-popup__btn button" closeHtml={"Zamknij"} />
        </div>
      );
    } else {
      return null;
    }
  }
}

// function, which sorts users (based on 'flag' parameter) before mapping it into component prop:

function sortUsers(users, flag) {
  let sortProp = "team";

  if (flag) {
    sortProp = "surname";
  }

  users.sort((a, b) => {
    let sortVal = 0;
    if (a[sortProp] > b[sortProp]) {
      sortVal = 1;
    }
    if (a[sortProp] < b[sortProp]) {
      sortVal = -1;
    }

    return sortVal;
  });

  return users;
}

// function, which maps redux store values to component props:

function mapStateToProps(state) {
  return {
    users: sortUsers(
      state.calendarData.users,
      state.calendarData.sortingBySurnameFlag
    ),
    teams: state.calendarData.teams,
    firstDayOfWeek: state.calendarData.firstDayOfWeek,
    weekNum: state.calendarData.week,
    weekTasks: state.calendarData.weekTasks,
    year: state.calendarData.year,
    sortingBySurnameFlag: state.calendarData.sortingBySurnameFlag,
    copyMode: state.calendarData.copyMode,
    copiedTask: state.calendarData.copiedTask
  };
}

// exporting class after above mapping:

export default connect(mapStateToProps)(Calendar);
