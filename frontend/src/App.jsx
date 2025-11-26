import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/navbar.jsx";
import { useState } from "react";
import Footer from "./components/Footer/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
function App() {
const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
  <AuthProvider>
   <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}   />
      <main className="min-h-screen"> 
        <Outlet context={searchTerm}/>
      </main>
      <Footer />
      </AuthProvider>
    </>
  )
}

export default App
