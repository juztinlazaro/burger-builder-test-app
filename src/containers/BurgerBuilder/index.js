import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { 
	addIngredient, 
	removeIngredient, 
	initIngredients, 
	purchaseInit,
	setAuthRedirectPath
} from '../../store/actions';
import axios from '../../axios-orders.js';

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	componentDidMount() {
		this.props.onFetchIngredients();
	}

	updatePurchase(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
			return ingredients[igKey];
		}).reduce((acc, curVal) => {
			return acc + curVal;
		}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		if(this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purchaseContinueHandler = () => {
	//this.props.history.push(`/checkout?ingredients=${JSON.stringify(this.state.ingredients)}&totalPrice=${this.state.totalPrice}`);
		this.props.onInitPurchase();
		this.props.history.push({
			pathname: '/checkout'
		});
	}

	render() {
		const disabledInfo = {
			...this.props.ingredients
		};

		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		
		let orderSummary = <OrderSummary ingredients={this.props.ingredients}
			continue={this.purchaseContinueHandler}
			cancel={this.purchaseCancelHandler}
			price={this.props.totalPrice} />;

		if(!this.props.ingredients ) {
			orderSummary = <Spinner />;
		}

		let burger = this.props.error ? "Ingredients can't be loaded!" :  <Spinner />;

		if(this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls ingredientAdded={this.props.onIngredientAdded}
						ingredientRemove={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.totalPrice}
						purchaseble={this.updatePurchase(this.props.ingredients)}
						ordered={this.purchaseHandler}
						isAuthenticated={this.props.isAuthenticated}
					/>
				</Aux>
			);
		}

		return (
			<Aux>
				<Modal show={ this.state.purchasing }
					modalClosed={ this.purchaseCancelHandler }>
					{orderSummary}
				</Modal>

				{ burger }
			</Aux>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		purchaseble: state.burgerBuilder.purchaseble,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingredientName) => dispatch( addIngredient(ingredientName) ),
		onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),
		onFetchIngredients: () => dispatch(initIngredients()),
		onInitPurchase: () => dispatch( purchaseInit() ),
		onSetAuthRedirectPath: (path) => dispatch( setAuthRedirectPath(path))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));