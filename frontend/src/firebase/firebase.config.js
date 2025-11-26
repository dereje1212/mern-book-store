// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AuthDomain,
  projectId: import.meta.env.VITE_Project_Id,
  storageBucket: import.meta.env.VITE_Storage_Bucket,
  messagingSenderId: import.meta.env.VITE_Messaging_Sender_Id,
  appId: import.meta.env.VITE_App_Id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
