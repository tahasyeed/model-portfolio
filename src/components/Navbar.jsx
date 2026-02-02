import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/auth";
import logoImg from "../assets/094e494e-dcaf-40f1-81e4-0854b1fde836.jpeg";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    // close menu on resize to desktop
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const logout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="nav2">
      <div className="nav2-inner">
        {/* Left */}
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
        <div className="brand-logo"> VT
  {/* <img src={logoImg} alt="Logo" className="brand-logo-img" /> */}
</div>
          <div className="brand-text">
            <div className="brand-name">BBW Queen Victoria</div>
            <div className="brand-sub">Love Of My Life</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="nav2-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav2-link active" : "nav2-link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) => (isActive ? "nav2-link active" : "nav2-link")}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav2-link active" : "nav2-link")}
          >
            About
          </NavLink>

          {!user ? (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "nav2-link nav2-admin active" : "nav2-link nav2-admin"
              }
            >
              Admin
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/upload"
                className={({ isActive }) =>
                  isActive ? "nav2-link nav2-admin active" : "nav2-link nav2-admin"
                }
              >
                Upload
              </NavLink>

              <button className="nav2-link nav2-danger" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle Menu"
        >
          <div className={`hb ${menuOpen ? "open" : ""}`}>
            <span />
            <span />
            <span />
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mobile-inner"
            >
              <NavLink
                to="/"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/gallery"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </NavLink>
              <NavLink
                to="/about"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>

              {!user ? (
                <NavLink
                  to="/admin"
                  className="mobile-link mobile-admin"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Login
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/upload"
                    className="mobile-link mobile-admin"
                    onClick={() => setMenuOpen(false)}
                  >
                    Upload
                  </NavLink>

                  <button className="mobile-link mobile-danger" onClick={logout}>
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
