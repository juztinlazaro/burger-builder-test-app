import React from 'react';

import classses from './index.css';
import BugerIngredient from './BugerIngredient';

const burger = (props) => {
	/* 
		convert object to array 
		map array(ingredients for count)
		extracting the keys of the ingredients into an array, 
		then for each ingredient in that array, then create a 
		new array with that ingredient present as many times as specified in 
		the value, then for each element of that array (the second one)
	*/
	let transformedIngredients = Object.keys(props.ingredients)
	.map((igKey) => {
		let arrayIngredients = [...Array(props.ingredients[igKey])];
		return arrayIngredients.map((_, i) => {
			return <BugerIngredient key={igKey + i} type={igKey} /> 
		});
	}).reduce((acc, curVal) => {
		return acc.concat(curVal);
	}, []);

	if(transformedIngredients.length === 0) {
		transformedIngredients = <p>Yow, Please start adding ingredients. </p>
	}

	return (
		<section className={classses.Burger}>	
			<BugerIngredient type="bread-top" />
			{ transformedIngredients }
			<BugerIngredient type="bread-bottom" />
		</section>
	);
};

export default burger;