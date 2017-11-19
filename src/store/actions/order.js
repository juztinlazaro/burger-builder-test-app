import { 
	PURCHASE_BURGER_SUCCESS, 
	PURCHASE_BURGER_FAIL, 
	PURCHASE_BURGER_START, 
	PURCHASE_INIT,
	FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAIL
} from './actionTypes';
import axios from '../../axios-orders.js';

export const purchaseBurgerSucces = (id, orderData) => {
	return {
		type: PURCHASE_BURGER_SUCCESS,
		id,
		order: orderData
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: PURCHASE_BURGER_START
	};
}

export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch( purchaseBurgerStart() );

		axios.post('/orders.json?auth=' + token, orderData)
		.then((res) => {
			dispatch(purchaseBurgerSucces(res.data.name, orderData));
		}).catch((error) => {
			dispatch(purchaseBurgerFail(error));
		});
	}
}

export const purchaseInit = () => {
	return {
		type: PURCHASE_INIT
	};
}

export const fetchOrdersStart = () => {
	return {
		type: FETCH_ORDERS_START
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: FETCH_ORDERS_SUCCESS,
		orders
	};
}

export const fetchOrdersFail = (error) => {
	return {
		type: FETCH_ORDERS_FAIL,
		error
	}
}

export const fecthOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

		axios.get('/orders.json' + queryParams)
		.then((res) => {
			const fetchOrders =[];
			for(let key in res.data) {
				fetchOrders.push({
					id: key,
					...res.data[key]
				});
			}

			dispatch(fetchOrdersSuccess(fetchOrders));
		})
		.catch((err) => {
			dispatch(fetchOrdersFail(err));
		})
	}
}
