import React, { createContext, useState, useEffect } from 'react';
import { foodItems } from '../data/foodData';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [foodItemsState, setFoodItems] = useState(foodItems || []);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('foodApp_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('foodApp_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [favourites, setFavourites] = useState(() => {
    const savedFavs = localStorage.getItem('foodApp_favourites');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  useEffect(() => {
    localStorage.setItem('foodApp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('foodApp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodApp_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('foodApp_favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.max(1, Number(cartItem.quantity || 1) + 1) }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const currentQty = Number(item.quantity || 1);
          const newQty = Math.max(1, currentQty + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        foodItems,
        setFoodItems,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        user,
        setUser,
        favourites,
        toggleFavourite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}