import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    //alert('You continue!');
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Juan A. Serrano',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Spain'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    const req = async () => {
      try {
        //error check await axios.post('/orders', order);
        await axios.post('/orders.json', order);
        this.setState({ loading: false });
        this.props.history.push('/');
      } catch (err) {
        this.setState({ loading: false });
      }
    };
    req();
    console.log(this.props.ingredients);
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Contact data required</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
