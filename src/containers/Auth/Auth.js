import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { auth } from '../../store/actions';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email-address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					min: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignUp: true
	};

	componentDidMout() {
		if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.setAuthRedirectPath('/');
		}
	}

	inputChangedHandler = (event, controlName) => {
		const value = event.target.value;
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: value,
				valid: checkValidity(value, this.state.controls[controlName].validation),
				touched: true
			})				
		});

		this.setState({ controls: updatedControls });
	}

	submitHandler = (event) => {
		event.preventDefault();
		const email = this.state.controls.email.value;
		const password = this.state.controls.password.value;
		this.props.auth(email, password, this.state.isSignUp);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				isSignUp: !prevState.isSignUp
			}
		});
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		};

		let form = formElementsArray.map(formElement => {
			return <Input 
					key={formElement.id}
					elementType={formElement.config.elementType} 
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					name={formElement.id}
					changed={(event) => this.inputChangedHandler(event, formElement.id)}
				/>
		});

		if(this.props.loading) {
			return form = <Spinner />
		}

		let errorMessage = null;

		if(this.props.error) {
			errorMessage = (
				<p>
					{this.props.error.message}
				</p>
			);
		}

		let authRedirect = null;
		if(this.props.isAuthenticated) {
			authRedirect = <Redirect to={ this.props.authRedirectPath } />
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{ form }

					<Button type="Success"> 
						SUBMIT
					</Button>
				</form>

				<Button type="Danger"
					clicked={this.switchAuthModeHandler}> 
					SWITCH TO {
						this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'
					}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
}

export default connect(mapStateToProps, {auth}) (Auth);