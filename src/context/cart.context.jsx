import { createContext, useState } from 'react';

const defaultValue = {
  isCartOpen: false,
  setIsCartOpen: () => {},
};

export const CartContext = createContext(defaultValue);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
