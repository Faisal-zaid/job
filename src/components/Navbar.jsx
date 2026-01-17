import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  if (!isHomePage) return null;

  const navTextColor = isScrolled
    ? "text-gray-800"
    : "text-white drop-shadow-md";
  const linkStyles = `relative group ${navTextColor} font-semibold transition-all duration-300 
    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] 
    after:bottom-[-4px] after:left-0 after:origin-center 
    ${isScrolled ? "after:bg-blue-600" : "after:bg-white"} 
    after:transition-transform after:duration-300 hover:after:scale-x-100`;

  return (
    <>
      {/* 1. MOBILE OVERLAY - Lower z-index than drawer */}
      <div
        className={`fixed inset-0 bg-black/60 z-[80] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-[90] px-6 md:px-10 flex items-center justify-between transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "bg-white shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
      >
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className={`text-xl md:text-2xl font-black tracking-tighter z-[100] transition-all duration-500 ${
            isScrolled || isMenuOpen
              ? "text-blue-700"
              : "text-white drop-shadow-lg"
          }`}
        >
          JOBS CONNECT
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={linkStyles}>
            Home
          </Link>
          {user ? (
            <>
              <Link
                to={
                  user.role === "employer"
                    ? "/employer-dashboard"
                    : "/jobseeker-dashboard"
                }
                className={linkStyles}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-full font-bold hover:bg-red-600 shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/login" className={linkStyles}>
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition-all"
              >
                Register
              </Link>
            </div>
          )}
          <a href="#About" className={linkStyles}>
            About
          </a>
          <Link to="/contact" className={linkStyles}>
            Contact
          </Link>
        </div>
        {/* MOBILE HAMBURGER TOGGLE */}
        <button
          className="md:hidden z-[100] p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="text-gray-800 w-8 h-8" />
          ) : (
            <Menu
              className={`${isScrolled ? "text-gray-800" : "text-white"} w-8 h-8`}
            />
          )}
        </button>

        {/* 2. MOBILE DRAWER - Highest z-index */}
        <div
          className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-white z-[100] shadow-2xl p-8 flex flex-col transform transition-transform duration-500 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) =>
            e.stopPropagation()
          } /* Prevents click from closing menu when clicking inside */
        >
          <div className="mt-20 flex flex-col space-y-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-2xl font-bold text-gray-800 border-b pb-2"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to={
                    user.role === "employer"
                      ? "/employer-dashboard"
                      : "/jobseeker-dashboard"
                  }
                  onClick={closeMenu}
                  className="text-2xl font-bold text-gray-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-2xl font-bold text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-2xl font-bold text-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="bg-blue-900 text-white text-center py-4 rounded-xl font-bold shadow-lg"
                >
                  Create Account
                </Link>
              </div>
            )}

            <div className="h-[1px] bg-gray-100 w-full my-2" />
            <a
              href="#About"
              onClick={closeMenu}
              className="text-left text-xl font-medium text-gray-500"
            >
              About Us
            </a>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-xl font-medium text-gray-500"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
