import React, { useEffect, useState } from "react";
import BookCard from "../../books/BookCard/BookCards.jsx";
import "./TopSellers.css"; // Your custom CSS
import { useOutletContext } from "react-router-dom";
import { useFetchAllBooksQuery } from "../../../redux/features/books/booksApi.js";
const categories = [
  "Choose General",
  "Business",
  "Books",
  "Marketing",
  "Horror",
  "Fiction",
  "Adventure",
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose General");
  const { searchTerm } = useOutletContext(); // Search from Navbar


  const { data: books = [] } = useFetchAllBooksQuery();
  

  // Safe filter for category + search term
  const filteredBooks = books
    .filter((book) => book) // remove null/undefined entries
    .filter((book) => {
      if (selectedCategory === "Choose General") return true;
      return book.category?.toLowerCase() === selectedCategory.toLowerCase();
    })
    .filter((book) => {
      const term = (searchTerm || "").toLowerCase();
      const title = book.title ? book.title.toLowerCase() : "";
      const author = book.author ? book.author.toLowerCase() : "";
      return title.includes(term) || author.includes(term);
    });

  return (
    <section className="top-sellers">
      {/* Header */}
      <div className="top-header">
        <h2 className="section-title">Top Sellers</h2>
        <div className="filters">
          {/* Category Filter */}
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="books-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div key={index} className="book-wrapper">
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p className="no-books">No books found.</p>
        )}
      </div>
    </section>
  );
};

export default TopSellers;
