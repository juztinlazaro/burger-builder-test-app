import { 
	ADD_INGREDIENTS, 
	REMOVE_INGREDIENT, 
	SET_INGREDIENTS,
	FETCH_INGREDIENTS_FAILED
} from './actionTypes';
import axios from '../../axios-orders.js';

export const addIngredient = (name) => {
	return {
		type: ADD_INGREDIENTS,
	  ingredientName: name
	}
};

export const removeIngredient = (name) => {
	return {
		type: REMOVE_INGREDIENT,
		ingredientName: name
	}
};

export const setIngredients = (ingredients) => {
	return {
		type: SET_INGREDIENTS,
		ingredients
	};
}

export const fetchIngredientsFailed = () => {
	return {
		type: FETCH_INGREDIENTS_FAILED
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios.get('/ingredients.json').then((res) => {
			dispatch(setIngredients(res.data));
		}).catch(e => {
			dispatch(fetchIngredientsFailed());
		});
	};
};