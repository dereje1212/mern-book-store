import React, { useEffect, useState } from "react";
import BookCard from "../../books/BookCard/BookCards.jsx";
import { useFetchAllBooksQuery } from "../../../redux/features/books/booksApi.js";
import "./Recommended.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required Swiper modules
import { Pagination } from "swiper/modules";

const Recommended = () => {

  const { data: books = [] } = useFetchAllBooksQuery();
  

  
  return (
    <div className="recommended-section py-16">
      <h2 className="section-title">Recommended for you</h2>

      <Swiper
        modules={[Pagination]}
        slidesPerView={4}
        spaceBetween={30}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} />

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
