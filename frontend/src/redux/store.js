import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import booksApi from './features/books/booksApi'; // Ensure booksApi is exported as named export
import ordersApi from './features/orders/orderApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});
