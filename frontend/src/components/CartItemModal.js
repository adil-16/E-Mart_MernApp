import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../Context/CartContext';

Modal.setAppElement('#root'); // Set the root element for the modal

const CartItemModal = ({ isOpen, onClose, item, quantity,onQuantityChange, onCartUpdate }) => {
    const { setCart } = useCartContext();
    const [modalQuantity, setModalQuantity] = useState(quantity);
  
    const handleIncrease = () => {
        if (modalQuantity < 10) {
          setModalQuantity((prevQuantity) => prevQuantity + 1);
        }
      };
  
    const handleDecrease = () => {
      if (modalQuantity > 1) {
        setModalQuantity((prevQuantity) => prevQuantity - 1);
      }
    };
  
    const handleAddToCart = () => {
      if (modalQuantity > 0) {
        setCart((prevCart) => [
          ...prevCart,
          {
            ...item,
            quantity: modalQuantity,
          },
        ]);
        onCartUpdate(); // tell the parent component to update the cart badge
        onClose();
      }
    };
  
    const handleClose = () => {
      // When the modal is closed, update the quantity in the parent component
      onQuantityChange(item._id, modalQuantity);
      onClose();
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Item Details"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
          },
        }}
      >
        <h2>{item.title}</h2>
        <img src={item.img} alt={item.title} style={{ width: '100%', marginBottom: '10px' }} />
        <p>{item.desc}</p>
        <p>Price: ${item.price}</p>
        <div className="d-flex align-items-center" key={item._id}>
          <button className="btn btn-outline-secondary btn-sm me-2" onClick={handleDecrease}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="me-2">{modalQuantity}</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={handleIncrease}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={handleAddToCart}
          disabled={modalQuantity === 0} // Disable the button when modalQuantity is zero
        >
          Add to Cart
        </button>
        <button className="btn btn-secondary mt-3 mx-2" onClick={handleClose}>
          Close
        </button>
      </Modal>
    );
  };
  
  export default CartItemModal;