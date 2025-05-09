import React, { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <GraduationCap className="text-blue-400 w-8 h-8" />
          <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-wide">
            Bright<span className="text-blue-400">Cademy</span>
          </h1>
        </Link>

        {/* Hamburger Button - visible on small screens */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Menu - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-white font-medium">
          <Link to="/" className="hover:text-blue-400 transition duration-200">
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-400 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-400 transition duration-200"
          >
            Contact
          </Link>
          <Link
            to="/services"
            className="hover:text-blue-400 transition duration-200"
          >
            Services
          </Link>
          <Link
            to="/courses"
            className="hover:text-blue-400 transition duration-200"
          >
            Courses
          </Link>
        </nav>

        {/* User Buttons - Desktop */}
        <div className="hidden md:flex gap-3 items-center ml-4">
          {!user ? (
            <>
              <Link to="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gray-700 hover:bg-gray-800 px-5 py-2 text-sm font-semibold text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>NaN</AvatarFallback>
                </Avatar>
              </Link>

              <Button
                onClick={logoutHandler}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2"
              >
                Log Out
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-6 py-4 space-y-4">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block hover:text-blue-400"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="block hover:text-blue-400"
          >
            Contact
          </Link>
          <Link
            to="/services"
            onClick={toggleMenu}
            className="block hover:text-blue-400"
          >
            Services
          </Link>
          <Link
            to="/courses"
            onClick={toggleMenu}
            className="block hover:text-blue-400"
          >
            Courses
          </Link>

          {!user ? (
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/login">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-gray-700 hover:bg-gray-800">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="pt-4">
              <Button
                onClick={logoutHandler}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Log Out
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
