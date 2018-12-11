// imports:

import firebase from '../firebase/firebase';
import store from '../store/Store';



// set date action creator:

export function setDate( firstDay, week, year ) {
  return {
    type: 'SET_DATE',
    firstDay,
    week,
    year
  }
}

// change sorting action creator:

export function changeSorting() {
  return {
    type: 'CHANGE_SORTING'
  }
}

// start copy mode action creator:

export function startCopyMode() {
  return {
    type: 'START_COPY_MODE'
  }
}

// stop copy mode action creator:

export function stopCopyMode() {
  return {
    type: 'STOP_COPY_MODE'
  }
}

// copy task action creator:

export function copyTask( task ) {
  return {
    type: 'COPY_TASK',
    task
  }
}

// paste first task action creator:

export function pasteFirstTask( task, cellId, week, year ) {

  return function ( dispatch ) {

    let taskObj = {
      name: task.name,
      description: task.description,
      link: task.link,
      type: task.type
    }

    dispatch( { type: 'PASTE_FIRST_TASK_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/years/' + year + '/week' + week + '/' + cellId +'/tasks/' ).push( taskObj )
        .then(( response ) => {

          let obj = {
            id: cellId,
            tasks: {
              [response.key]: {
                id: response.key,
                name: task.name,
                description: task.description,
                link: task.link,
                type: task.type
              }
            }
          }

          dispatch( { type: 'PASTE_FIRST_TASK_FULFILLED', payload: obj } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'PASTE_FIRST_TASK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// paste next task action creator:

export function pasteNextTask( task, cellId, week, year ) {

  return function ( dispatch ) {

    let taskObj = {
      name: task.name,
      description: task.description,
      link: task.link,
      type: task.type
    }

    dispatch( { type: 'PASTE_NEXT_TASK_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/years/' + year + '/week' + week + '/' + cellId + '/tasks/' ).push( taskObj )
        .then(( response ) => {

          let obj = {
                id: response.key,
                name: task.name,
                description: task.description,
                link: task.link,
                type: task.type
              }

          dispatch( { type: 'PASTE_NEXT_TASK_FULFILLED', payload: [ cellId, response.key, obj ] } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'PASTE_NEXT_TASK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// fetch tasks for week action creator:

export function fetchTasksForWeek( weekNumber, year ) {

  return function ( dispatch ) {

    dispatch( { type: 'FETCH_TASKS_FOR_WEEK_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/years/' + year + '/week' + weekNumber + '/' )
        .once( 'value' )
        .then(( response ) => {

          if ( response.val() ) {
            dispatch( { type: 'FETCH_TASKS_FOR_WEEK_FULFILLED', payload: response.val() } );

          } else {
            store.dispatch( createWeekNode( weekNumber, year ) );
          }

        })
        .catch(( error ) => {

          dispatch( { type: 'FETCH_TASKS_FOR_WEEK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// add first task action creator:

export function addFirstTask( task, cellId, week, year ) {

  return function ( dispatch ) {

    dispatch( { type: 'ADD_FIRST_TASK_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/years/' + year + '/week' + week + '/' + cellId +'/tasks/' ).push( task )
        .then(( response ) => {

          let obj = {
            id: cellId,
            tasks: {
              [response.key]: {
                id: response.key,
                name: task.name,
                description: task.description,
                link: task.link,
                type: task.type
              }
            }
          }

          dispatch( { type: 'ADD_FIRST_TASK_FULFILLED', payload: obj } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'ADD_FIRST_TASK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// add next task action creator:

export function addNextTask( task, cellId, week, year ) {

  return function ( dispatch ) {

    dispatch( { type: 'ADD_NEXT_TASK_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/years/' + year + '/week' + week + '/' + cellId + '/tasks/' ).push( task )
        .then(( response ) => {

          let obj = {
                id: response.key,
                name: task.name,
                description: task.description,
                link: task.link,
                type: task.type
              }

          dispatch( { type: 'ADD_NEXT_TASK_FULFILLED', payload: [ cellId, response.key, obj ] } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'ADD_NEXT_TASK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// delete task action creator:

export function deleteTask( taskId, cellId, week, year ) {

  return function ( dispatch ) {

    dispatch( { type: 'DELETE_TASK_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/years/' + year + '/week' + week + '/' + cellId + '/tasks/' + taskId + '/' ).remove()
        .then(( response ) => {

          dispatch( { type: 'DELETE_TASK_FULFILLED', payload: [ cellId, taskId ] } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'DELETE_TASK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// delete last task action creator:

export function deleteLastTask( taskId, cellId, week, year ) {

  return function ( dispatch ) {

    dispatch( { type: 'DELETE_LAST_TASK_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/years/' + year + '/week' + week + '/' + cellId + '/' ).remove()
        .then(( response ) => {

          dispatch( { type: 'DELETE_LAST_TASK_FULFILLED', payload: cellId } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'DELETE_LAST_TASK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// update task action creator:

export function updateTask( task, taskId, cellId, weekNumber, year ) {

  return function ( dispatch ) {

      dispatch( { type: 'UPDATE_TASK_REQUESTED' } );

      return new Promise (( resolve, reject ) => {

        firebase.database().ref( '/years/' + year + '/week' + weekNumber + '/' + cellId + '/tasks/' + taskId + '/' ).set({
          name: task.name,
          description: task.description,
          link: task.link,
          type: task.type
        })
        .then(( response ) => {

          let obj = {
                id: taskId,
                name: task.name,
                description: task.description,
                link: task.link,
                type: task.type
              }

          dispatch( { type: 'UPDATE_TASK_FULFILLED', payload: [ obj, cellId ] } );

          resolve();
        })
        .catch(( error ) => {
          dispatch( { type: 'UPDATE_TASK_REJECTED', payload: error } );

          reject( error );
        })
    })
  }  
}

// fetch users action creator:

export function fetchUsers() {

  return function ( dispatch ) {

    dispatch( { type: 'FETCH_USERS_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/users/' )
        .once( 'value' )
        .then(( response ) => {

          dispatch( { type: 'FETCH_USERS_FULFILLED', payload: response.val() } );
        })
        .catch(( error ) => {

          dispatch( { type: 'FETCH_USERS_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// update user action creator:

export function updateUser( user, userId ) {

  return function ( dispatch ) {

      dispatch( { type: 'UPDATE_USER_REQUESTED' } );

      return new Promise (( resolve, reject ) => {

        firebase.database().ref( '/users/' + userId + '/' ).set({
          name: user.name,
          surname: user.surname,
          position: user.position,
          team: user.team
        })
        .then(( response ) => {

          let obj = {
                id: userId,
                name: user.name,
                surname: user.surname,
                position: user.position,
                team: user.team
              }

          dispatch( { type: 'UPDATE_USER_FULFILLED', payload: [ obj, userId ] } );

          resolve();
        })
        .catch(( error ) => {
          dispatch( { type: 'UPDATE_USER_REJECTED', payload: error } );

          reject( error );
        })
    })
  }  
}

// add new user action creator:

export function addNewUser( userObj ){

   return function ( dispatch ) {

    dispatch( { type: 'ADD_NEW_USER_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/users/' ).push( userObj )
        .then(( response ) => {

          let obj = {
            id: response.key,
            name: userObj.name,
            surname: userObj.surname,
            position: userObj.position,
            team: userObj.team
          }

          dispatch( { type: 'ADD_NEW_USER_FULFILLED', payload: obj } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'ADD_NEW_USER_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// delete user action creator:

export function deleteUser( id ) {

  return function ( dispatch ) {

    dispatch( { type: 'DELETE_USER_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/users/' + id ).remove()
        .then(( response ) => {

          dispatch( { type: 'DELETE_USER_FULFILLED', payload: id } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'DELETE_USER_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// fetch teams action creator:

export function fetchTeams() {

  return function ( dispatch ) {

    dispatch( { type: 'FETCH_TEAMS_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/teams/' )
        .once( 'value' )
        .then(( response ) => {
          dispatch( { type: 'FETCH_TEAMS_FULFILLED', payload: response.val() } );
        })
        .catch(( error ) => {

          dispatch( { type: 'FETCH_TEAMS_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// update team action creator:

export function updateTeam( team, id ) {

  return function ( dispatch ) {

      dispatch( { type: 'UPDATE_TEAM_REQUESTED' } );

      return new Promise (( resolve, reject ) => {

        firebase.database().ref( '/teams/' + id + '/' ).set({
          name: team.name,
          color: team.color
        })
        .then(( response ) => {

          let obj = {
                id,
                name: team.name,
                color: team.color
              }

          dispatch( { type: 'UPDATE_TEAM_FULFILLED', payload: [ obj, id ] } );

          resolve();
        })
        .catch(( error ) => {
          dispatch( { type: 'UPDATE_TEAM_REJECTED', payload: error } );

          reject( error );
        })
    })
  }  
}

// add team action creator:

export function addTeam( name, color ) {

  return function ( dispatch ) {

    dispatch( { type: 'ADD_TEAM_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/teams/' ).push( { name, color } )

        .then(( response ) => {

          let teamObj = {
            name,
            color,
            id: response.key
          }

          dispatch( { type: 'ADD_TEAM_FULFILLED', payload: teamObj } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'ADD_TEAM_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// delete team action creator:

export function deleteTeam( teamId ) {

  return function ( dispatch ) {

    dispatch( { type: 'DELETE_TEAM_REQUESTED' } );

    return new Promise (( resolve, reject ) => {

      firebase.database().ref( '/teams/' + teamId + '/' ).remove()
        .then(( response ) => {

          dispatch( { type: 'DELETE_TEAM_FULFILLED', payload: teamId } );

          resolve();
        })
        .catch(( error ) => {

          dispatch( { type: 'DELETE_TEAM_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}

// create week node action creator:

export function createWeekNode( weekNumber, year ) {

  return function ( dispatch ) {

      dispatch( { type: 'CREATE_WEEK_NODE_REQUESTED' } );

      return new Promise (( resolve, reject ) => {

        firebase.database().ref( '/years/' + year + '/week' + weekNumber + '/' ).update( { 'blank': 0 } )
        .then(( response ) => {

          dispatch( { type: 'CREATE_WEEK_NODE_FULFILLED' } );
        })
        .catch(( error ) => {
          dispatch( { type: 'CREATE_WEEK_NODE_REJECTED', payload: error } );

          reject( error );
        })
    })
  }
}