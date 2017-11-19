import React from 'react';

import classes from './Toolbar.css'; 
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
		  <DrawerToggle toggle={props.toggle} />
			<Logo/>

			<nav className={classes.DesktopOnly}>
				<NavigationItems isAuthenticated={props.isAuthenticated}/>
			</nav>
		</header>
	);
};

export default toolbar;