// imports:

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from '../reduxReducers/combineReducers';



// logger configuration:

const logger = createLogger({
    collapsed: true
})

// export:

export default createStore( reducer, applyMiddleware( thunk, promise, logger ) );