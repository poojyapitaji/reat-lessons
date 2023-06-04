import { createContext, useEffect, useState } from 'react';

const defaultValue = {
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  remooveItemFromCart: () => {},
  clearItemFromCart: () => {},
  totalItemInCart: 0,
  cartTotal: 0,
};

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }
  return cartItems.map((item) =>
    item.id === cartItemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item,
  );
};

const clearItem = (cartItems, itemToClear) => {
  return cartItems.filter((item) => item.id !== itemToClear.id);
};

export const CartContext = createContext(defaultValue);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItemInCart, setTotalItemInCart] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
  const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  const clearItemFromCart = (itemToClear) => setCartItems(clearItem(cartItems, itemToClear));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    totalItemInCart,
    cartTotal,
  };

  useEffect(() => {
    let count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalItemInCart(count);
    let totalAmount = cartItems.reduce(
      (totalAmount, item) => totalAmount + item.quantity * item.price,
      0,
    );
    setCartTotal(totalAmount);
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
