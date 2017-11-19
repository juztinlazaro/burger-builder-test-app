import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Aux from '../../hoc/Auxiliary';
import CheckoutSumarry from '../../components/Order/CheckoutSumarry/CheckoutSumarry';

class Checkout extends Component {
	onCheckoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	onCheckoutContinuedHandler = () => {
		if(this.props.totalPrice === 4) {
      this.props.history.push('/');
    } else {
      this.props.history.push('/checkout/contact-data');
    }
	}

  render() {
  	let renderCheckoutSumarry = <Redirect to='/' />;
    
  	if(this.props.ingredients) {
  		renderCheckoutSumarry = <CheckoutSumarry
  			ingredients = { this.props.ingredients }
  			onCheckoutCancelled={this.onCheckoutCancelledHandler}
  			onCheckoutContinued={this.onCheckoutContinuedHandler} />
  	}

    return (
      <Aux>
      	{renderCheckoutSumarry}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  }
}

export default connect(mapStateToProps) (Checkout);