import { combineReducers } from 'redux';
import burgerBuilder from './burgerBuilder';
import orderData from './order';
import authData from './auth';

const rootReducer = combineReducers({
	burgerBuilder,
	order: orderData,
	auth: authData
});

export default rootReducer;