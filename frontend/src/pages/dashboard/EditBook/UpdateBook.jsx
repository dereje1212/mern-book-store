import React, { useEffect } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseUrl';
import './updateBook.css';


const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue } = useForm();
const navigate = useNavigate();

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('trending', bookData.trending);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
          Swal.fire({
      title: 'Book Updated',
      text: 'Your book is updated successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
navigate('/dashboard/manage-books');
    });

      await refetch();
    } catch (error) {
      console.log('Failed to update book.');
      alert('Failed to update book.');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="error-text">Error fetching book data</div>;

  return (
    <div className="update-book-container">
      <h2 className="form-title">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="update-book-form">

        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />

        <div className="checkbox-container">
          <input type="checkbox" {...register('trending')} />
          <label>Trending</label>
        </div>

        <div className="price-fields">

          <InputField
            label="New Price"
            name="newPrice"
            type="number"
            placeholder="New Price"
            register={register}
          />
        </div>

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        {bookData?.coverImage && (
          <div className="image-preview">
            <img src={bookData.coverImage} alt="Book Cover" />
          </div>
        )}

        <button type="submit" className="update-btn">
            Update Book
          
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
