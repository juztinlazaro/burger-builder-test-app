import React from 'react';
import classses from './index.css';

const buildControl = (props) => {
	return (
		<section className={classses.BuildControl}>
			<div className={classses.Label}>
				{props.label}
			</div>
			
			<button className={classses.Less}
				onClick={ props.removed } 
				disabled={props.disabled}> 
				Less 
			</button>
			
			<button className={classses.More}
				onClick={ props.added }> 
				More 
			</button>
		</section>
	)
};

export default buildControl;