import React, { useState, useEffect } from 'react';
// import DATA from '../Data/Data';
import axios from 'axios';
import CartItemModal from '../components/CartItemModal';
import { useCartContext } from '../Context/CartContext'; // Import the useCartContext

const Products = () => {
  const { cart,setCart } = useCartContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [products, setProducts] = useState([]);
    

    useEffect(() => {
      // Fetch products from the backend API
      axios.get('http://localhost:5000/products') // Replace with your API endpoint
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }, []);
  
    const openModal = (item) => {
      setModalOpen(true);
      setSelectedItem(item);
    };
  
    const closeModal = () => {
      setModalOpen(false);
      setSelectedItem(null);
    };
  
    const handleQuantityChange = (itemId, change) => {
      setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + change } : item
      )
    );
    };
  
    const handleRemoveItem = (itemId) => {
      console.log('Removing item:', itemId); 
      const newCart = cart.filter((item) => item._id !== itemId);
      console.log('Previous Cart:', cart);
      console.log('New Cart:', newCart);
      setCart(newCart);
    };
    
    const cardItem = (item) => {
      return (
        <div className="card my-5 py-4" key={item._id} style={{ width: '18rem' }}>
          <img src={item.img} className="card-img-top" alt={item.title} />
          <div className="card-body text-center">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="lead">${item.price}</p>
            <button className="btn btn-outline-primary" onClick={() => openModal(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      );
    };
    
  
    const handleCartUpdate = () => {
      // Function to notify the parent component (App) that the cart has been updated
    };  
  
    return (
      <div>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="display-4">Products</h1>
              <hr />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-around">
          {products.map(cardItem)}
          </div>
        </div>
        {selectedItem && (
          <CartItemModal
            isOpen={modalOpen}
            onClose={closeModal}
            item={selectedItem}
            quantity={(cart.find((cartItem) => cartItem._id === selectedItem._id) || {}).quantity || 0}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            setCart={setCart}
            onCartUpdate={handleCartUpdate}
          />
        )}
      </div>
    );
  };
  
  export default Products;
  