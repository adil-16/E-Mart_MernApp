import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const fetchData = async (url, setter) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const totalCount = data.length;
    setter(totalCount);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Admin = () => {
  console.error = () => {};

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchData('http://localhost:5000/orders/', setTotalOrders);
    fetchData('http://localhost:5000/products/', setTotalProducts);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo text-white fs-3">Hello Admin!</div>
        <Menu theme="dark" mode="vertical">
          <Menu.Item key="dashboard">
            <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.SubMenu key="products" title="Products">
            <Menu.Item key="add">
              <Link to="/admin/products/add" style={{ textDecoration: 'none' }}>
                Add Product
              </Link>
            </Menu.Item>
            <Menu.Item key="delete">
              <Link to="/admin/products/delete" style={{ textDecoration: 'none' }}>
                Delete Product
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-5">
              <div className="card" style={{ height: '200px' }}>
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text fs-4">{totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card" style={{ height: '200px' }}>
                <div className="card-body">
                  <h5 className="card-title">Total Products</h5>
                  <p className="card-text fs-4">{totalProducts}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default Admin;
