import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { FaUserAlt, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const navigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Order", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [books, setBooks] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cartItem = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef(null);

  const handleLogOut = () => logout();

  // Load books for search
  useEffect(() => {
    fetch("/Books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter books based on search term
 const filteredBooks = books
  .filter((book) => {
    const term = (searchTerm || "").toLowerCase();
    const title = book.title ? book.title.toLowerCase() : "";
    const category = book.category ? book.category.toLowerCase() : "";
    return title.includes(term) || category.includes(term);
  })
  .slice(0, 5);


  return (
    <header className="navbar">
      {/* Left */}
      <div className="navbar-left">
        <Link to="/" className="iconButton">
          <AiOutlineBars />
        </Link>
      </div>

      {/* Center: Search */}
      <div className="navbar-center">
        <div className={`search-box ${searchOpen ? "active" : ""}`}>
          <IoMdSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search books, authors..."
            value={searchTerm}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchOpen && searchTerm && filteredBooks.length > 0 && (
            <ul className="search-dropdown">
              {filteredBooks.map((book, idx) => (
                <li key={idx}>
                  <Link to={`/book/${book.id}`} onClick={() => setSearchTerm("")}>
                    {book.cover && (
                      <img src={book.cover} alt={book.title} className="dropdown-thumb" />
                    )}
                    <span>{book.title} - {book.author}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right: User & icons */}
      <div className="navbar-right">
        {/* User Dropdown */}
        {currentUser ? (
          <div className="user-wrapper" ref={dropdownRef}>
            <button className="iconButton" onClick={() => setDropdownOpen((prev) => !prev)}>
              <RxAvatar />
            </button>
            {dropdownOpen && (
              <div className="user-dropdown animate-dropdown">
                <ul>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href}>{item.name}</Link>
                    </li>
                  ))}
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="iconButton">
            <FaUserAlt />
          </Link>
        )}

        {/* Other icons */}
        <button className="iconButton"><FaRegHeart /></button>
        <Link to="/cart" className="icon-buttons">
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{cartItem.length || 0}</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
