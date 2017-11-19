import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fecthOrders } from '../../store/actions';

class Orders extends Component {
	componentDidMount () {
		this.props.fecthOrders(this.props.token, this.props.userId);
	}

	render() {
		let renderOrders = <Spinner />;
		if(this.props.orders.length > 0 ) {
			renderOrders = this.props.orders.map(order => {
				return <Order key={order.id} 
					ingredients={ order.ingredients } 
					totalPrice= { +order.price }
				/>
			})
		}
		return (
			<section>
				{ renderOrders }
			</section>
		);
	};
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		error: state.order.error,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

export default connect(mapStateToProps, {fecthOrders}) (withErrorHandler(Orders, axios));