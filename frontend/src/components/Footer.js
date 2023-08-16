import React from 'react';

const Footer = () => {
  return (
    <div
      className='text-center py-4'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} E-Mart.com
            </p>
            <div className="mt-1">
              <h5  className="me-3">Privacy Policy</h5>
              <h5  className="me-3">Terms of Service</h5>
              <h5  className="me-3">Contact Us</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
