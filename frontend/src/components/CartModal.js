import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../Context/CartContext';

Modal.setAppElement('#root'); // Set the root element for the modal

const CartModal = ({ onClose, onQuantityChange, onRemoveItem }) => {
  const { cart } = useCartContext();
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
                  <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.title}</span>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => onQuantityChange(item._id, -1)}>-</button>
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
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <p className="fw-bold">Total Price: ${getTotalPrice()}</p>
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
