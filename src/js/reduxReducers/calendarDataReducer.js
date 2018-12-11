// imports:

import Utils from '../utils/Utils';



// default state:

const defaultState = {
	users: [],
	loading: false,
	error: null,
	weekTasks: [],
	teams: [],
	firstDayOfWeek: null,
	week: null,
	year: null,
	copyMode: false,
	copiedTask: null,
	sortingBySurnameFlag: true
}



// reducer function definition including it's export:

export default function reducer( state = defaultState, action ){

	switch ( action.type ){

		// set date action:

		case 'SET_DATE': {

			return {
				...state,
				firstDayOfWeek: action.firstDay,
				week: action.week,
				year: action.year,
			}
		}

		// change sorting action:

		case 'CHANGE_SORTING': {

			return {
				...state,
				sortingBySurnameFlag: !state.sortingBySurnameFlag
			}
		}

		// start copy mode action:

		case 'START_COPY_MODE': {

			return {
				...state,
				copyMode: true
			}
		}

		// stop copy mode action:

		case 'STOP_COPY_MODE': {

			return {
				...state,
				copyMode: false,
				copiedTask: null
			}
		}

		// copy task action:

		case 'COPY_TASK': {

			return {
				...state,
				copiedTask: action.task
			}
		}

		// paste first task requested:

		case 'PASTE_FIRST_TASK_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// paste first task fulfilled:

		case 'PASTE_FIRST_TASK_FULFILLED': {

			return {
				...state,
				loading: false,
				weekTasks: [ ...state.weekTasks, action.payload ]
			}
		}

		// paste first task rejected:

		case 'PASTE_FIRST_TASK_REJETED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// paste next task requested:

		case 'PASTE_NEXT_TASK_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// paste next task fulfilled:

		case 'PASTE_NEXT_TASK_FULFILLED': {

			const cellId = action.payload[0],
				taskId = action.payload[1],
				obj = action.payload[2],
				arr = state.weekTasks.slice(0);

			const index = arr.findIndex(( item ) => {
				return cellId === item.id;
			})		

			arr[index].tasks[taskId] = obj;
		
			return {
				...state,
				loading: false,
				weekTasks: arr
			}
		}

		// paste next task rejected:

		case 'PASTE_NEXT_TASK_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// fetch tasks for week requested:

		case 'FETCH_TASKS_FOR_WEEK_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// fetch tasks for week fulfilled:

		case 'FETCH_TASKS_FOR_WEEK_FULFILLED': {

			const tasksArr = Utils.convertToArr( action.payload );

			return {
				...state,
				loading: false,
				weekTasks: tasksArr
			}
		}

		// fetch tasks for week rejected:

		case 'FETCH_TASKS_FOR_WEEK_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// add first task requested:

		case 'ADD_FIRST_TASK_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// add first task fulfilled:

		case 'ADD_FIRST_TASK_FULFILLED': {

			return {
				...state,
				loading: false,
				weekTasks: [ ...state.weekTasks, action.payload ]
			}
		}

		// add first task rejected:

		case 'ADD_FIRST_TASK_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// add next task requested:

		case 'ADD_NEXT_TASK_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// add next task fulfilled:

		case 'ADD_NEXT_TASK_FULFILLED': {

			const cellId = action.payload[0],
				taskId = action.payload[1],
				obj = action.payload[2],
				arr = state.weekTasks.slice(0);

			const index = arr.findIndex(( item ) => {
				return cellId === item.id;
			})		

			arr[index].tasks[taskId] = obj;
		
			return {
				...state,
				loading: false,
				weekTasks: arr
			}
		}

		// add next task rejected:

		case 'ADD_NEXT_TASK_REJECTED': {
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// delete task requested:

		case 'DELETE_TASK_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// delete task fulfilled:

		case 'DELETE_TASK_FULFILLED': {

			 const cellId = action.payload[0],
				taskId = action.payload[1],
				arr = state.weekTasks.slice(0);

			const index = arr.findIndex(( item ) => {
				return cellId === item.id;
			})	

			delete arr[index].tasks[taskId];

			return {
				...state,
				loading: false,
				weekTasks: arr
			}
		}

		// delete task rejected:

		case 'DELETE_TASK_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// delete last task requested:

		case 'DELETE_LAST_TASK_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// delete last task fulfilled:

		case 'DELETE_LAST_TASK_FULFILLED': {

		 	let cellId = action.payload;
			let arr = state.weekTasks.slice(0);

			const index = arr.findIndex(( item ) => {
				return cellId === item.id;
			})	

			arr.splice( index, 1 );

			return {
				...state,
				loading: false,
				weekTasks: arr
			}
		}

		// delete last task rejected:

		case 'DELETE_LAST_TASK_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// update task requested:

		case 'UPDATE_TASK_REQUESTED': {
			return {
				...state,
				loading: true
			}
		}

		// update task fulfilled:

		case 'UPDATE_TASK_FULFILLED': {

			const taskObj = action.payload[0];
			const cellId = action.payload[1];
			let arr = state.weekTasks.slice(0);

			const index = arr.findIndex(( item ) => {
				return cellId === item.id;
			})

			arr[index].tasks[taskObj.id].name = taskObj.name;
			arr[index].tasks[taskObj.id].description = taskObj.description;
			arr[index].tasks[taskObj.id].link = taskObj.link;
			arr[index].tasks[taskObj.id].type = taskObj.type;

			return {
				...state,
				loading: false,
				weekTasks: arr
			}
		}

		// update task rejected:

		case 'UPDATE_TASK_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// fetch users requested:

		case 'FETCH_USERS_REQUESTED':{

			return{
				...state,
				loading: true
			}
		}

		// fetch users fulfilled:

		case 'FETCH_USERS_FULFILLED':{

			const usersArr = Utils.convertToArr( action.payload );

			return {
				...state,
				loading: false,
				users: usersArr
			}
		}

		// fetch users rejected:

		case 'FETCH_USERS_REJECTED': {

			return{
				...state,
				loading: false,
				error: action.payload
			}
		}

		// update user requested:

		case 'UPDATE_USER_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// update user fulfilled:

		case 'UPDATE_USER_FULFILLED': {

			const userObj = action.payload[0];
			const userId = action.payload[1];
			let arr = state.users.slice(0);

			const index = arr.findIndex(( item ) => {
				return userId === item.id;
			})

			arr[index].name = userObj.name;
			arr[index].surname = userObj.surname;
			arr[index].position = userObj.position;
			arr[index].team = userObj.team;

			return {
				...state,
				loading: false,
				users: arr
			}
		}

		// update user rejected:

		case 'UPDATE_USER_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// add new user requested:

		case 'ADD_NEW_USER_REQUESTED':{
			return{
				...state,
				loading: true
			}
		}

		// add new user fulfilled:

		case 'ADD_NEW_USER_FULFILLED':{
			
			const user = action.payload;
			
			return {
				...state,
				loading: false,
				users: [ ...state.users, user ]
			}
		}

		// add new user rejected:

		case 'ADD_NEW_USER_REJECTED':{
			return{
				...state,
				loading: false,
				error: action.payload
			}
		}

		// delete user requested:

		case 'DELETE_USER_REQUESTED':{
			return{
				...state,
				loading: true
			}
		}

		// delete user fulfilled:

		case 'DELETE_USER_FULFILLED': {

			const index = state.users.findIndex(( user ) => {
				return action.payload === user.id;
			})

			return {
				...state,
				loading: false,
				users: state.users.slice( 0, index ).concat( state.users.slice( index + 1 ) )
			}
		}

		// delete user rejected:
	
		case 'DELETE_USER_REJECTED':{
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// fetch teams requested:

		case 'FETCH_TEAMS_REQUESTED':{

			return {
				...state,
				loading: true
			}
		}

		// fetch teams fulfilled:

		case 'FETCH_TEAMS_FULFILLED': {

			const teamsArr = Utils.convertToArr( action.payload );

			return {
				...state,
				loading: false,
				teams: teamsArr
			}
		}

		// fetch teams rejected:

		case 'FETCH_TEAMS_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// delete team requested:

		case 'DELETE_TEAM_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// delete team fulfilled:

		case 'DELETE_TEAM_FULFILLED': {

			const index = state.teams.findIndex((team) => {
				return action.payload === team.id;
			})

			return {
				...state,
				loading: false,
				teams: state.teams.slice( 0, index ).concat( state.teams.slice( index + 1 ) )
			}
		}

		// delete team rejected:

		case 'DELETE_TEAM_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// add team requested:

		case 'ADD_TEAM_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// add team fulfilled:

		case 'ADD_TEAM_FULFILLED': {	

			return {
				...state,
				loading: false,
				teams: [ ...state.teams, action.payload ]
			}
		}

		// add team rejected:

		case 'ADD_TEAM_REJECTED': {

			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// update team requested:

		case 'UPDATE_TEAM_REQUESTED': {
			return {
				...state,
				loading: true
			}
		}

		// update team fulfilled:

		case 'UPDATE_TEAM_FULFILLED': {

			const teamObj = action.payload[0];
			const teamId = action.payload[1];
			let arr = state.teams.slice(0);

			const index = arr.findIndex(( item ) => {
				return teamId === item.id;
			})

			arr[index].name = teamObj.name;
			arr[index].color = teamObj.color;

			return {
				...state,
				loading: false,
				teams: arr
			}
		}

		// update team rejected:

		case 'UPDATE_TEAM_REJECTED': {
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// create week node requested:

		case 'CREATE_WEEK_NODE_REQUESTED': {

			return {
				...state,
				loading: true
			}
		}

		// create week node fulfilled:

		case 'CREATE_WEEK_NODE_FULFILLED': {

			return {
				...state,
				loading: false
			}
		}

		// create week node rejected:

		case 'CREATE_WEEK_NODE_REJECTED': {
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		// default:

		default:
			return state;
	}
}
