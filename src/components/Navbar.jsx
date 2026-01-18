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
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/login");
  };

  if (!isHomePage) return null;

  const navTextColor = isScrolled ? "text-gray-800" : "text-white";
  const linkStyles = `relative font-semibold ${navTextColor} hover:opacity-80 transition`;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 flex items-center justify-between transition-all ${
          isScrolled ? "bg-white shadow py-3" : "bg-transparent py-6"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-black ${
            isScrolled ? "text-blue-700" : "text-white"
          }`}
        >
          JOBS CONNECT
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkStyles}>Home</Link>
          <a href="#About" className={linkStyles}>About</a>
          <Link to="/contact" className={linkStyles}>Contact</Link>

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
                className="bg-red-500 text-white px-5 py-2 rounded-full font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkStyles}>Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-8 h-8 text-gray-800" />
          ) : (
            <Menu
              className={`w-8 h-8 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            />
          )}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white z-50 p-8 transform transition-transform md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-20 flex flex-col gap-6">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <a href="#About" onClick={() => setIsMenuOpen(false)}>About</a>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

          {user ? (
            <>
              <Link
                to={
                  user.role === "employer"
                    ? "/employer-dashboard"
                    : "/jobseeker-dashboard"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="bg-blue-600 text-white text-center py-3 rounded-lg"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
