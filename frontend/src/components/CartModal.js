import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../Context/CartContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Set the root element for the modal

const CartModal = ({ onClose, onQuantityChange, onRemoveItem }) => {
  const { cart, loggedInUsername, setCart } = useCartContext();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    if (!loggedInUsername) {
      toast.error('You need to be logged in to place an order.');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const items = cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      }));
      const totalAmount = getTotalPrice();

      const response = await axios.post('http://localhost:5000/orders/addOrder', {
        items,
        totalAmount,
        user: loggedInUsername, // Send the logged-in username as UserId
      });

      if (response.data) {
        toast.success('Order Placed Successfully');
        setCart([]);
        setIsPlacingOrder(false);
        onClose(); // Close the modal after placing the order
      }
    } catch (error) {
      console.error(error);
      toast.error('Error placing order');
    }
  };

  return (
    <Modal
      isOpen={true} // Always open when the cart badge is clicked
      onRequestClose={onClose}
      contentLabel="Cart"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          maxWidth: '400px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
        },
      }}
    >
      <div className="cart-modal">
        <div className="cart-modal-content">
          <h2 className="display-4">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex flex-column">
                      <span className="mb-1">{item.title}</span>
                      <span className="mb-1">
                        Quantity: {item.quantity} | Price:{' '}
                        ${item.price * item.quantity}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => onQuantityChange(item._id, -1)}
                      >
                        -
                      </button>
                      <span className="me-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onQuantityChange(item._id, 1)}
                        disabled={item.quantity >= 10}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => onRemoveItem(item._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="fw-bold">Total Price: ${getTotalPrice()}</p>
              <button
                className="btn btn-danger position-absolute bottom-0 start-0 m-3"
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
              </button>
            </>
          )}
        </div>

        <button className="btn btn-secondary position-absolute bottom-0 end-0 m-3" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
