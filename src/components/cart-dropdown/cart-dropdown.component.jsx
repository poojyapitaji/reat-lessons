import './cart-dropdown.styles.scss';
import Button from '../button/button.components';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const gotToCheckoutHandler = () => navigate('/checkout');

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </div>
      <Button onClick={gotToCheckoutHandler}>Go to Checkout</Button>
    </div>
  );
};

export default CartDropdown;
