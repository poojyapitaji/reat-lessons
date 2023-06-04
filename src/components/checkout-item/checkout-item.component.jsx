import { useContext } from 'react';
import './checkout-item.styles.scss';
import { CartContext } from '../../context/cart.context';

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const cartItemHandler = () => clearItemFromCart(item);
  const decrementItemHandler = () => removeItemFromCart(item);
  const incrementItemHandler = () => addItemToCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={cartItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
