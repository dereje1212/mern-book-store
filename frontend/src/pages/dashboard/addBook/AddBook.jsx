import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import './AddBook.css';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [addBook, { isLoading }] = useAddBookMutation();

 const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("trending", data.trending);
  formData.append("newPrice", data.newPrice);

  if (imageFile) {
    formData.append("coverImage", imageFile);
  }

  try {
    await addBook(formData).unwrap();
    Swal.fire({
      title: "Success",
      text: "Book added successfully",
      icon: "success"
    });

    reset();
    setImageFile(null);
    setImageFileName("");
  } catch (error) {
    console.log(error);
  }
};



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="addbook-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="addbook-form">
        <InputField label="Title" name="title" placeholder="Enter book title" register={register} />
        <InputField label="Description" name="description" placeholder="Enter book description" type="textarea" register={register} />
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

        <div className="form-group">
          <label>
            <input type="checkbox" {...register('trending')} /> Trending
          </label>
        </div>

 <InputField label="New Price" name="newPrice" type="number" placeholder="New Price" register={register} />

        <div className="form-group">
          <label>Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imageFileName && <p className="file-name">Selected: {imageFileName}</p>}
        </div>

        <button type="submit" className="submit-button">
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
