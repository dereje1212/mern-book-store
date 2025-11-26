import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { getImgUrl } from "../../../utils/getImgUrl.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice.js";
import "./BookCard.css";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="book-card">
      <div className="book-card-content">
        {/* Image Section */}
        <div className="book-image">
          <Link to={`/books/${book._id}`}>
            <img
              src={getImgUrl(book?.coverImage)}
              alt={book?.title}
              className="book-img"
              
            />
          </Link>
        </div>

        {/* Info Section */}
        <div className="book-info">
          <Link to={`/books/${book._id}`}>
            <h3 className="book-title">{book?.title}</h3>
          </Link>

          <p className="book-desc">
            {book?.description?.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}
          </p>

          <p className="book-price">${book?.newPrice}</p>

          <button
            
            className="add-cart-btn"
            onClick={() => handleAddToCart(book)}
          >
            <Link to='/'>
            
            <FaShoppingCart className="cart-icon" />
            <span>Add to Cart</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
