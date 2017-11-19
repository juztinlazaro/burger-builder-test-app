import React from 'react';

import classses from './Backdrop.css'

const backdrop = (props) => {
	return (
		props.show ? (
			<div className={ classses.Backdrop }
				onClick={ props.clicked }></div>
		) : null
	);
};

export default backdrop;