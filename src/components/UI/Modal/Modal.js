import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	render() {
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={ this.props.modalClosed } />
				<div className={classes.Modal}
					style={{
						transfrom: this.props.show ? 'transfromY(0)' : 'transfromY(-100vh)',
						opacity: this.props.show ? '1' : 0,
						display: this.props.show ? 'block' : 'none'
					}}>
					{ this.props.children }
				</div>
			</Aux>
		);
	}
};

export default Modal;