import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, clearCart } from '../../../redux/features/cart/cartSlice.js';
import { getImgUrl } from '../../../utils/getImgUrl.js';
import './CartPage.css';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button onClick={handleClearCart} className="clear-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cartItems.length > 0 ? (
          <ul className="cart-list">
            {cartItems.map((product) => (
              <li key={product?._id} className="cart-item">
                <div className="cart-image">
                  <img
                    src={getImgUrl(product?.coverImage)}
                    alt={product?.title}
                  />
                </div>
                <div className="cart-details">
                  <div className="cart-info">
                    <h3>
                      <Link to="/">{product?.title}</Link>
                    </h3>
                    <p className="cart-price">${product?.newPrice}</p>
                  </div>
                  <p className="cart-category">
                    <strong>Category:</strong> {product?.category}
                  </p>
                  <div className="cart-footer">
                    <p className="cart-quantity">
                      <strong>Qty:</strong> 1
                    </p>
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">No product found!</p>
        )}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <p>Sub-total</p>
          <p>${totalPrice ? totalPrice : 0}</p>
        </div>
        <p className="summary-note">
          Shipping and taxes calculated at checkout.
        </p>

        <div className="checkout-section">
          <Link to="/checkout" className="checkout-btn">
            Checkout
          </Link>
        </div>

        <div className="continue-section">
          <Link to="/" className="continue-link">
            Continue Shopping &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
