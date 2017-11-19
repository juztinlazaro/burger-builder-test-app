import React from 'react';

import classes from './DrawerToggle.css'

const drawerToggle = (props) => {
	return (
		<div className={classes.Toggle}
			onClick={props.toggle}>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);	
};

export default drawerToggle;