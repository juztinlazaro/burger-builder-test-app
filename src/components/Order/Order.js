import React from 'react';

import classes from './Order.css';

const order = (props) => {
	const newIngredients = [];
	for(let ingredientName in props.ingredients) {
		newIngredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		})
	};

	const renderIngredients = newIngredients.map((ing, index) => {
		return <span style={{
				textTransform: 'capitalize',
				display: 'inline-block',
				margin: '0 8px',
				border: '1px solid #eee',
				padding: '5px'
			}}
			key={index}>
			{ing.name} ({ing.amount})
		</span>;
	})

	return (
		<div className={classes.Order}>
			<p>
				Ingredients: { renderIngredients }
			</p>

			<p>
				Price:
				<strong> 
					$ 
					{props.totalPrice.toFixed(2)} 
				</strong>
			</p>
		</div>
	);
};
export default order;