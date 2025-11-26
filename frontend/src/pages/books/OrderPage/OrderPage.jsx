import React from 'react';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/orderApi';
import { useAuth } from '../../../context/AuthContext';
import './OrderPage.css';
import { Link } from 'react-router-dom';

const OrderPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser?.email) return <div className="loading">Loading user...</div>;

  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

  if (isLoading) return <div className="loading">Loading orders...</div>;
  if (isError) return <div className="error">Error fetching orders data. Please try again.</div>;

  return (
    <div className="order-container">
      <h2 className="order-title">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="no-orders">No orders found!</div>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} className="order-card">
            <p className="order-index"># {index + 1}</p>

            <div className="order-info">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Total Price:</strong> ${order.totalPrice}</p>
            </div>

            <div className="order-section">
              <h3>Address:</h3>
              <p>{order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}</p>
            </div>

           <div className="order-section">
  <h3>Products:</h3>
  {order.items && order.items.length > 0 ? (
    order.items.map((item) => (
      <div key={item._id} className="order-item">
         {orders.coverImage ? (
   <img
  src={`http://localhost:3000/uploads/${orders.coverImage}`}
  alt={orders.title}
  className="book-thumb"

    />
  ) : (
    <span className="no-image"></span>
  )}
        <p>
          {item.product?.title} — {item.quantity} × ${item.price}
        </p>
      </div>
    ))
  ) : (
    <p>No products found</p>
  )}
</div>


 <Link to="/cart" className="continue-link">
              Continue Shopping &rarr;
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
