import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, User, LogOut } from "lucide-react";

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
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  // --- STYLE CALCULATIONS ---
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
  const logoColorClass = isHomePage
    ? isScrolled
      ? "text-blue-700"
      : "text-white drop-shadow-lg"
    : "text-blue-700";

  const linkStyles = `relative group ${navTextClass} font-semibold transition-all duration-300 
    after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] 
    after:bottom-[-4px] after:left-0 after:origin-center 
    ${isScrolled || !isHomePage ? "after:bg-blue-600" : "after:bg-white"} 
    after:transition-transform after:duration-300 hover:after:scale-x-100`;

  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 z-[80] md:hidden transition-all ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-[90] px-6 md:px-10 py-3 md:py-4 flex items-center justify-between transition-all duration-500 ${navBgClass} ${!isHomePage || isScrolled ? "border-b border-gray-100" : ""}`}>
        {/* LOGO */}
        <Link
          to="/"
          onClick={closeMenu}
          className={`text-xl md:text-2xl font-black tracking-tighter z-[100] ${logoColorClass}`}>
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

          {user ? (
            <div className="flex items-center space-x-6 ml-4 border-l pl-6 border-gray-200">
              {/* DISPLAY USERNAME HERE */}
              <div className="flex flex-col items-end">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${isHomePage && !isScrolled ? "text-white/70" : "text-gray-400"}`}>
                  Welcome back,
                </span>
                <span className={`text-sm font-bold ${navTextClass}`}>
                  {user.name.split(" ")[0]} {/* Shows first name */}
                </span>
              </div>

              <Link
                to={
                  user.role === "employer"
                    ? "/employer-dashboard"
                    : "/jobseeker-dashboard"
                }
                className="bg-indigo-50 text-indigo-600 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                title="Dashboard">
                <User size={20} />
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 text-sm">
                <LogOut size={16} />
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
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden z-[100] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className="text-gray-800" size={32} />
          ) : (
            <Menu
              className={
                isScrolled || !isHomePage ? "text-gray-800" : "text-white"
              }
              size={32}
            />
          )}
        </button>

        {/* MOBILE DRAWER */}
        <div
          className={`fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white z-[100] p-8 flex flex-col transform transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mt-16 flex flex-col space-y-6">
            {/* Mobile User Header */}
            {user && (
              <div className="bg-indigo-50 p-6 rounded-2xl mb-4">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">
                  Signed in as
                </p>
                <p className="text-xl font-black text-slate-900 italic uppercase">
                  {user.name}
                </p>
                <p className="text-xs font-bold text-indigo-600/60 mt-1">
                  {user.email}
                </p>
              </div>
            )}

            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl font-bold text-gray-800 flex items-center gap-4">
              <Briefcase size={20} className="text-indigo-600" /> Home
            </Link>
            <Link
              to="/jobs"
              onClick={closeMenu}
              className="text-xl font-bold text-gray-800">
              Browse Jobs
            </Link>

            <div className="h-[1px] bg-gray-100 w-full" />

            {user ? (
              <>
                <Link
                  to={
                    user.role === "employer"
                      ? "/employer-dashboard"
                      : "/jobseeker-dashboard"
                  }
                  onClick={closeMenu}
                  className="text-xl font-bold text-gray-800 flex items-center gap-4">
                  <User size={20} className="text-indigo-600" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-xl font-bold text-red-500 flex items-center gap-4 pt-4">
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-xl font-bold text-gray-800">
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="bg-indigo-600 text-white text-center py-4 rounded-xl font-bold shadow-lg shadow-indigo-600/20">
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
