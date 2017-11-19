import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Button from '../UI/Button/Button';

class OrderSumarry extends Component {
  //This could be a functional component, doesnt be a class, just debugging proposes

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}> 
          <span style={{textTransform: 'capitalize'}}> 
            { igKey } 
          </span>: 
          { this.props.ingredients[igKey] } 
        </li>
      )
    });

    return (
      <Aux>
        <h3> Your Order </h3>

        <p> 
          A delicious burger with the following ingredients :
        </p>

        <ul>
          { ingredientSummary }
        </ul>

        <p> <strong>Total Price: </strong> $ {this.props.price.toFixed(2)} </p>
        <p>Continue to Checkout </p>

        <Button type='Danger'
          clicked={this.props.cancel}> 
          Cancel
        </Button>

        <Button type='Success'
          clicked={this.props.continue}> 
          Continue
        </Button>
      </Aux>
    );
  }
};

export default OrderSumarry;