import React from 'react';

import classes from './index.css';
import BuildControl from './BuildControl';

const controls = [
	{ 
		label: 'Salad', 
		type: 'salad' 
	},
	{ 
		label: 'Bacon', 
		type: 'bacon' 
	},
	{ 
		label: 'Cheese', 
		type: 'cheese' 
	},
	{ 
		label: 'Meat', 
		type: 'meat' 
	},
];

const buildControls = (props) => {
	return (
		<section className={classes.BuildControls}> 
			<p> 
				Current Price: 
				<strong> $ { props.price.toFixed(2) } </strong>
			</p>
			
			{ 
				controls.map((control, index) => {
					return (
						<BuildControl key={index} 
							label={control.label} 
							type={control.type} 
							added={ () => props.ingredientAdded(control.type) }
							removed={ () => props.ingredientRemove(control.type) }
							disabled={ props.disabled[control.type] }
							isAuthenticated={ props.isAuthenticated }
						/>
					);
				}) 
			}

			<button className={classes.OrderButton}
				disabled={ !props.purchaseble }
				onClick={ props.ordered }> 
				{
					props.isAuthenticated ? 'ORDER NOW ' : 'SIGN UP TO ORDER / SIGN IN'
				}
			</button>
		</section>
	)
};

export default buildControls;

