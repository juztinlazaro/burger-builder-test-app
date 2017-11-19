import * as types from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: null,
	building: false
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const addIngredient = (state, action) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
	const updatedState = { 
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] ,
		building: true
	};
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
	const updatedIngrs = updateObject(state.ingredients, updatedIngredient);
	const updatedState = { 
		ingredients: updatedIngrs,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
		building: true
	};
 	return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
	return {
		...state,
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		error: false,
		totalPrice: 4,
		building: false
	}
};

const fetchIngredientsFailed = (state, action) => {
	return {
		...state,
		error: true
	};
};

const burgerBuilder = (state = initialState, action) => {
	switch(action.type) {
		case types.ADD_INGREDIENTS:  return addIngredient(state, action);
		case types.REMOVE_INGREDIENT: return removeIngredient(state,action);
		case types.SET_INGREDIENTS: return setIngredients(state, action);
		case types.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
		default: return state;
	}
};

export default burgerBuilder;