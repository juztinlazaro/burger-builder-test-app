import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import AppRoot from './AppRoot';
import rootReducer from './store/reducers';

const composeEnhancers = process.env.NODE_ENV	 === 'development'  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(thunk)
	)
);

ReactDOM.render(
	<Provider store={ store }>
	  <BrowserRouter>
	    <AppRoot />
	  </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
