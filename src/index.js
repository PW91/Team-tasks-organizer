// imports:

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalendarUser from './js/reactComponents/user/CalendarUser';
import CalendarAdmin from './js/reactComponents/admin/CalendarAdmin';
import Layout from './js/reactComponents/Layout';
import store from './js/store/Store';
import registerServiceWorker from './registerServiceWorker';
import './App.css';



// grab root element from DOM:

const root = document.getElementById( 'root' );



// render basic layout with routes:

ReactDOM.render(
<Provider store = { store }>
	<Layout>
	<Router>
		<Switch>
			<Route exact = { true } path = '/' component = { CalendarUser }/>
			<Route path = '/admin' component = { CalendarAdmin }/>
		</Switch>
	</Router>
	</Layout>
</Provider>,
root);



// include register service worker:

registerServiceWorker();
