import React,{Component} from 'react';
import ReactDOM,{createStore} from 'react-dom';

import MainApp from './MainApp'

var redux = require('redux');

class App extends Component {
	render() {
		return(<div>
			<h1>Striker Tactics</h1>
			<MainApp />
			</div>
		);
	}
}

//var store = redux.createStore(MainApp);

//var {createStore} = redux;

const render = () => {
	ReactDOM.render(
		<App />, 
		document.getElementById('root')
	);
};

//store.subscribe(render)
render();