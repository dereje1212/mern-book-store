import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../../redux/features/books/booksApi';
import { getImgUrl } from '../../../utils/getImgUrl';
import './SingleBook.css';

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error happening while loading book info</div>;

  return (
    <div className="single-book-container">
      <img src={getImgUrl(book.coverImage)} alt={book.title} className="book-image" />

      <div className="book-details">
        <h1>{book.title}</h1>
        <p><strong>Author:</strong> {book.author || 'admin'}</p>
        <p><strong>Published:</strong> {new Date(book.createdAt).toLocaleDateString()}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Description:</strong> {book.description}</p>

        <Link to="/cart" className="add" onClick={() => handleAddToCart(book)}>
          <FiShoppingCart /> Add to Cart
        </Link>

        <Link to="/" className="continue-links">
          Continue Shopping 
        </Link>
      </div>
    </div>
  );
};

export default SingleBook;
