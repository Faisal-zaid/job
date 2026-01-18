import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isHomePage) return null;

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition ${
          isScrolled ? "bg-white shadow" : "bg-transparent"
        }`}
      >
        <Link
          to="/"
          className={`text-2xl font-black ${
            isScrolled ? "text-indigo-600" : "text-white"
          }`}
        >
          JOBS CONNECT
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-center">
          <a href="#About" className="font-semibold">
            About
          </a>
          <Link to="/contact">Contact</Link>

          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
