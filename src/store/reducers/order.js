import { 
	PURCHASE_BURGER_SUCCESS, 
	PURCHASE_BURGER_FAIL, 
	PURCHASE_BURGER_START,
	PURCHASE_INIT,
	FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INITIAL_STATE = {
	orders: [],
	error: null,
	loading: false,
	purchased: false
}

const reducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case PURCHASE_INIT: 
			return updateObject(state, { purchased: false });
		break;

		case PURCHASE_BURGER_START: 
			return {
				...state,
				loading: true
			};
		break;

		case PURCHASE_BURGER_SUCCESS: 
			return {
				...state,
				orders:  { ...action.order, id: action.id },
				loading: false,
				purchased: true
			};
		break;

		case PURCHASE_BURGER_FAIL: 
			return {
				...state,
				loading: false,
				error: action.error
			}
		break;

		case FETCH_ORDERS_START: 
			return {
				...state,
				loading: true
			}
		break;

		case FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false
			}
		break;

		case FETCH_ORDERS_FAIL: 
			return {
				...state,
				error: action.error,
				loading: false
			};
		break;

		default:
			return state;
	}
}

export default reducer;