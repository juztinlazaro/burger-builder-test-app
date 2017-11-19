import React from 'react';

import Burger from '../../Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSumarry.css';

const checkoutSumarry = (props) => {
  
  return (
    <div className={classes.CheckoutSumarry}>
      <h1> We hope to it taste well </h1>

      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={ props.ingredients }/>
      </div>

      <Button type='Danger'
        clicked={props.onCheckoutCancelled}>
        CANCEL
      </Button>

      <Button type='Success'
        clicked={props.onCheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
}

export default checkoutSumarry;