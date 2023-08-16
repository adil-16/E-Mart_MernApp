import './App.css';
import {  RouterProvider,createBrowserRouter } from 'react-router-dom';
import { CartProvider } from './Context/CartContext'; 
import { useCartContext } from './Context/CartContext';
import { useState } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage'
import Root from './pages/Root';
import SignupPage from './pages/SignupPage';

function App() {
  const {  loggedInUsername } = useCartContext();
  const [isLoggedIn, setIsLoggedIn] = useState(!!loggedInUsername);

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/login",
          element: <LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        },
        {
          path: "/signup",
          element: <SignupPage/>
        },
        {
          path: "/products",
          element: <Products/>
    
        },
        {
          path: "/about",
          element: <About/>
    
        },
        {
          path: "/contact",
          element: <Contact/>
    
        },
      ]

    }

]);



 
  return (
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
    
  );
}

export default App