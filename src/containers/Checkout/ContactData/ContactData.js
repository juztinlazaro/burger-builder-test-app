import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: '',
				validation: {
					required: true,
					max: 20
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip code'
				},
				value: '',
				validation: {
					required: true,
					min: 6,
					max: 6
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ 
							value: 'fastest', 
							display: 'Fastest' 
						},
						{ 
							value: 'cheapest', 
							display: 'Cheapest' 
						}
					]
				},
				validation: {},
				value: 'fastest',
				valid: true
			}
		},
		formIsValid: false,
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let data in this.state.orderForm) {
			formData[data] = this.state.orderForm[data].value;
		};

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData,
			userId: this.props.userId
		}
		this.props.onOrderBurder(order, this.props.token);
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const value = event.target.value;
	
		//deeply clone the element
		const udpdateFormElement = updateObject( this.state.orderForm[inputIdentifier], {
			value: value,
			valid: checkValidity(value, this.state.orderForm[inputIdentifier].validation),
			touched: true
		});

		const updatedOrderForm = updateObject(this.state.orderForm, {
			[inputIdentifier]: udpdateFormElement
		});

		let formIsValid = true; 
	
		if(this.props.totalPrice === 4) {
			formIsValid = false;
		} else {
			for(let inputIdentifier in updatedOrderForm) {
				formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
			}
		}

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid
		})
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		if(this.props.loading) {
			return <Spinner />;
		}

   if(this.props.purchased) {
   		return <Redirect to='/' />
   }

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>

				<form onSubmit={this.orderHandler}>
					{
						formElementsArray.map((formElement, index) => {
							return <Input key={index}
								elementType={formElement.config.elementType} 
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value}
								invalid={!formElement.config.valid}
								shouldValidate={formElement.config.validation}
								touched={formElement.config.touched}
								name={formElement.id}
								changed={(event) => this.inputChangedHandler(event, formElement.id)}
							/>
						})
					}

					<Button type="Success"
						clicked={this.orderHandler}
						disabled={!this.state.formIsValid}> 
						ORDER
					</Button>
				</form>
			</div>
		); 
	}
}

const mapStateToProps = state => {
	return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    purchased: state.order.purchased,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurder: (orderData, token) => dispatch(purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (WithErrorHandler(ContactData, axios));