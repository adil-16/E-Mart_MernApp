import React from 'react';

const Dashboard = () => {
  // You can fetch the actual data for total orders and products here
  const totalOrders = 50; // Example total orders
  const totalProducts = 100; // Example total products

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text fs-4">{totalProducts}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
