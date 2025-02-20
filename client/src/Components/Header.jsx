import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/ContextProvider";
import { FiMenu, FiX } from "react-icons/fi"; // Import menu icons

const Header = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    login(null);
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="bg-violet-500 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white text-lg lg:text-2xl font-bold">
          Notes App
        </Link>

     
        

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-green-300 font-semibold">
            {user?.name || "Guest"}
          </span>
          {!user ? (
            <>
              <Link to="/login">
                <button className="bg-green-500 text-white p-2 px-4 rounded-md">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-blue-500 text-white p-2 px-4 rounded-md">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 px-4 rounded-md"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="md:hidden bg-violet-600 p-4 space-y-3 text-center">
          <span className="text-green-300 font-semibold block">
            {user?.name || "Guest"}
          </span>
          <input
            type="text"
            placeholder="Search here..."
            className="bg-slate-100 text-blue-500 w-full p-2 rounded-md border-0 outline-none"
          />
          {!user ? (
            <>
              <Link to="/login" className="block">
                <button className="bg-green-500 text-white w-full p-2 rounded-md">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="block">
                <button className="bg-blue-500 text-white w-full p-2 rounded-md">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white w-full p-2 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
