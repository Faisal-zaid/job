import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, User, LogOut } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if we're on home page for special styling
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
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Always show navbar, but with different styles on home page
  const navBgClass = isHomePage
    ? isScrolled
      ? "bg-white shadow-lg"
      : "bg-transparent"
    : "bg-white shadow-lg";

  const navTextClass = isHomePage
    ? isScrolled
      ? "text-gray-800"
      : "text-white drop-shadow-md"
    : "text-gray-800";

  const navBorderClass =
    isHomePage && !isScrolled ? "" : "border-b border-gray-100";
  const logoColorClass = isHomePage
    ? isScrolled
      ? "text-blue-700"
      : "text-white drop-shadow-lg"
    : "text-blue-700";

  const linkStyles = `relative group ${navTextColor} font-semibold transition-all duration-300 
    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] 
    after:bottom-[-4px] after:left-0 after:origin-center 
    ${isScrolled || !isHomePage ? "after:bg-blue-600" : "after:bg-white"} 
    after:transition-transform after:duration-300 hover:after:scale-x-100`;

  const navTextColor = navTextClass;

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
        className={`fixed top-0 left-0 right-0 z-[90] px-6 md:px-10 py-3 md:py-4 flex items-center justify-between transition-all duration-500 ${navBgClass} ${navBorderClass}`}>
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className={`text-xl md:text-2xl font-black tracking-tighter z-[100] transition-all duration-500 ${logoColorClass}`}>
          JOBS<span className="text-indigo-500">CONNECT</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={linkStyles}>
            Home
          </Link>
          <Link to="/jobs" className={linkStyles}>
            Jobs
          </Link>
          <Link to="/about" className={linkStyles}>
            About
          </Link>
          <Link to="/contact" className={linkStyles}>
            Contact
          </Link>

          {user ? (
            <div className="flex items-center space-x-4 ml-4">
              <Link
                to={
                  user.role === "employer"
                    ? "/employer-dashboard"
                    : "/jobseeker-dashboard"
                }
                className={`flex items-center gap-2 ${linkStyles}`}>
                <User size={18} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-600 shadow-sm transition-all">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6 ml-4">
              <Link to="/login" className={linkStyles}>
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 shadow-lg transition-all">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <button
          className="md:hidden z-[100] p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className="text-gray-800 w-8 h-8" />
          ) : (
            <Menu
              className={`${isScrolled || !isHomePage ? "text-gray-800" : "text-white"} w-8 h-8`}
            />
          )}
        </button>

        {/* 2. MOBILE DRAWER - Highest z-index */}
        <div
          className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-white z-[100] shadow-2xl p-8 flex flex-col transform transition-transform duration-500 ease-in-out md:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}>
          <div className="mt-20 flex flex-col space-y-6">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center gap-3">
              <Briefcase size={24} className="text-indigo-600" />
              Home
            </Link>

            <Link
              to="/jobs"
              onClick={closeMenu}
              className="text-2xl font-bold text-gray-800 border-b pb-2 flex items-center gap-3">
              <Briefcase size={24} className="text-indigo-600" />
              Browse Jobs
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="text-2xl font-bold text-gray-800 border-b pb-2">
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-2xl font-bold text-gray-800 border-b pb-2">
              Contact
            </Link>

            <div className="h-[1px] bg-gray-100 w-full my-2" />

            {user ? (
              <>
                <Link
                  to={
                    user.role === "employer"
                      ? "/employer-dashboard"
                      : "/jobseeker-dashboard"
                  }
                  onClick={closeMenu}
                  className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <User size={24} className="text-indigo-600" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-2xl font-bold text-red-500 flex items-center gap-3">
                  <LogOut size={24} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-2xl font-bold text-gray-800">
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="bg-indigo-600 text-white text-center py-4 rounded-xl font-bold shadow-lg">
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
