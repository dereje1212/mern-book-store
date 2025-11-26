import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CheckOutPage.css'; // import the CSS file
import { useAuth } from '../../../context/AuthContext';
import { useCreateOrderMutation } from '../../../redux/features/orders/orderApi'


const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const {currentUser} = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  const onSubmit = async (data) => {
  const newOrder = {
    name: data.name,
    email: currentUser?.email,
    phone: data.phone, // ✅ required
    address: {
      city: data.city,
      country: data.country,
      state: data.state,
      zipcode: data.zipcode,
    },
    // ✅ items must be an array with product ObjectId + price + quantity
    items: cartItems.map(item => ({
      product: item._id, // must be valid ObjectId from MongoDB
      quantity: item.quantity || 1,
      price: item.newPrice,
    })),
    // ✅ required totalPrice
    totalPrice: parseFloat(totalPrice),
  };

  try {
    await createOrder(newOrder).unwrap();
    Swal.fire({
      title: "Confirmed Order",
      text: "Your order was placed successfully!",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
    navigate("/orders");
  } catch (error) {
    console.error("Error placing order:", error);
    Swal.fire({
      title: "Order Failed",
      text: error?.data?.message || error.message || "Unknown error occurred",
      icon: "error",
    });
  }
};

    if(isLoading) return <div>Loading....</div>

  return (
    <section className="checkout-sections">
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Cash On Delivery</h2>
          <p>Total Price: ${totalPrice}</p>
          <p>Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
        </div>

        <div className="checkout-form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
            <div className="form-header">
              <p className="title">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="name">Full Name</label>
                <input {...register("name", { required: true })} type="text" id="name" placeholder="Your full name" />
              </div>

              <div className="form-group full-width">
                <label htmlFor="email">Email Address</label>
                <input type="text" id="email" placeholder="email@domain.com" disabled defaultValue={currentUser?.email} />
              </div>

              <div className="form-group full-width">
                <label htmlFor="phone">Phone Number</label>
                <input {...register("phone", { required: true })} type="number" id="phone" placeholder="+123 456 7890" />
              </div>

              <div className="form-group wide">
                <label htmlFor="address">Address / Street</label>
                <input {...register("address", { required: true })} type="text" id="address" placeholder="Street address" />
              </div>

              <div className="form-group">
                <label htmlFor="city">City</label>
                <input {...register("city", { required: true })} type="text" id="city" placeholder="City" />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country / Region</label>
                <input {...register("country", { required: true })} type="text" id="country" placeholder="Country" />
              </div>

              <div className="form-group">
                <label htmlFor="state">State / Province</label>
                <input {...register("state", { required: true })} type="text" id="state" placeholder="State" />
              </div>

              <div className="form-group">
                <label htmlFor="zipcode">Zipcode</label>
                <input {...register("zipcode", { required: true })} type="text" id="zipcode" placeholder="Zip code" />
              </div>
            </div>

            <div className="checkbox-container">
              <input type="checkbox" id="billing_same" onChange={(e) => setIsChecked(e.target.checked)} />
              <label htmlFor="billing_same">
                I agree to the <Link to="#">Terms & Conditions</Link> and <Link to="#">Shopping Policy</Link>.
              </label>
            </div>

            <div className="button-container">
              <button type="submit" disabled={!isChecked}>Place an Order</button>
            </div>
            <div className="continue-section">
                <Link to="/cart" className="continue-link">
                  Continue Shopping &rarr;
                </Link>
              </div>
          </form>
          
        </div>
      </div>
       
            
    </section>
  );
};

export default CheckoutPage;
