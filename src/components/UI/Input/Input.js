import React from 'react';

import classes from './Input.css'

const Input = (props) => {
	let validationError = null;
	let inputtype = null;
	const inputClasses = [classes.InputElement];
	
  if(props.invalid && props.shouldValidate && props.touched) {
  	inputClasses.push(classes.Invalid);
  }

  if (props.invalid && props.touched) {
	  validationError = <p>Please enter a valid {props.name}!</p>;
	}


	switch( props.elementType ) {
		case ('input'):
			inputtype = <input className={inputClasses.join(' ')} 
				{...props.elementConfig} 
				value={props.value}
				onChange={props.changed} 
			/>
		break;

		case ('select'): 
			inputtype = (
				<select className={classes.InputElement} 
					value={props.value}
					onChange={props.changed}>
					{
						props.elementConfig.options.map((option, index) => {
							return (
								<option key={index} 
									value={option.value}> 
									{option.display} 
								</option>
							)
						})
					}
				</select>
			);
		break; 

		case ('textarea'): 
			inputtype = <textarea className={classes.InputElement} 
				{...props.elementConfig} 
				value={props.value}
				onChange={props.changed} 
			/>
		break;

		default:
		 inputtype = <input className={classes.InputElement} 
		 	{...props.elementConfig} 
		 	value={props.value}
		 	onChange={props.changed}
		 />
	} 

	return (
		<div className={classes.Input}>
			<label> {props.label} </label>
			{ inputtype }
			{validationError}
		</div>
	);
}

export default Input;