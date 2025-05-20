// src/context/CartContext.js
import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: []
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cartItems.find(p => p.productId === action.payload.productId);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(p =>
            p.productId === action.payload.productId
              ? { ...p, quantity: p.quantity + 1 }
              : p
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(p => p.productId !== action.payload)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ cartState, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
