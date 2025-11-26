// src/pages/dashboard/ManageBooks.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import './ManageBooks.css';

const ManageBooks = () => {
  const navigate = useNavigate();
  const { data: books = [], refetch, isLoading } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [searchTerm, setSearchTerm] = useState('');


  // Handle delete with SweetAlert
  // Handle delete with SweetAlert
  const handleDeleteBook = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This book will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
    });

    if (!confirm.isConfirmed) return;

    try {
      // Delete without token
      await deleteBook(id).unwrap();
      await refetch();
      Swal.fire('Deleted!', 'The book has been removed.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to delete book. Please try again.', 'error');
      console.error(error);
    }
  };

 
// Filter books by title or category
const filteredBooks = books.filter((book) => {
  const term = searchTerm.toLowerCase();
  const titleMatch = book.title?.toLowerCase().includes(term);
  const categoryMatch = book.category?.toLowerCase().includes(term);
  return titleMatch || categoryMatch;
});

  return (
    <div className="manage-books-container">
      <h2 className="page-title">Manage Books</h2>

      {/* Stats Header */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>{books.length}</h4>
          <p>Total Books</p>
        </div>
        <div className="stat-card">
          <h4>{books.filter((b) => b.category === 'fiction').length}</h4>
          <p>Fiction</p>
        </div>
        <div className="stat-card">
          <h4>{books.filter((b) => b.trending).length}</h4>
          <p>Trending</p>
        </div>
      </div>

      {/* Search Bar */}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search books..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading and Empty States */}
      {isLoading ? (
        <p className="loading">Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p className="empty">No books found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="books-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={book._id} className="book-row">
                  <td>{index + 1}</td>
               <td>
  {book.coverImage ? (
   <img
  src={`http://localhost:3000/uploads/${book.coverImage}`}
  alt={book.title}
  className="book-thumb"

    />
  ) : (
    <span className="no-image">N/A</span>
  )}
</td>

                  <td>{book.title}</td>
                  <td>
                    <span className={`badge badge-${book.category}`}>
                      {book.category}
                    </span>
                  </td>
                  <td className="price">${book.newPrice}</td>
                  <td>
                    {/* ✅ Edit button handles logged-out users */}
                    <button
                      className="edit-btn"
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        if (token) {
                          navigate(`/dashboard/edit-book/${book._id}`);
                        } else {
                          navigate("/login", {
                            state: { from: `/dashboard/edit-book/${book._id}` },
                            replace: true,
                          });
                        }
                      }}
                    >
                      Edit
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
