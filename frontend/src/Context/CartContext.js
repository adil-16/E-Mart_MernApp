import React, { createContext, useEffect, useState, useContext } from 'react';

const CartContext = createContext({cart:"", setCart: ()=>{}});

export const useCartContext = () => { //Custom hook
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  console.log("userName is", loggedInUsername);

  const setUsername=(name)=>{
    setLoggedInUsername(name);
  }

  
  

  // Load cart data and username from local storage on every render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedUser = localStorage.getItem('loggedInUsername');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    if (storedUser) {
      setLoggedInUsername(JSON.parse(storedUser));
    }
  }, []);

  // Save cart data and username to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('loggedInUsername', JSON.stringify(loggedInUsername));
  }, [loggedInUsername]);

  return (
    <CartContext.Provider value={{ cart, setCart, loggedInUsername, setLoggedInUsername ,setUsername}}>
      {children}
    </CartContext.Provider>
  );
};

