import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/applications", label: "Applications" },
  { path: "/resumes", label: "Resumes" },
  { path: "/reminders", label: "Reminders" },
];

const getDesktopLinkClass = (active) =>
  `font-medium transition ${
    active ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
  }`;

const getMobileLinkClass = (active) =>
  `block px-3 py-2 rounded-lg font-medium transition ${
    active ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-200"
  }`;

const renderDesktopLinks = (items, isActive) =>
  items.map(({ path, label }) => (
    <Link key={path} to={path} className={getDesktopLinkClass(isActive(path))}>
      {label}
    </Link>
  ));

const renderMobileLinks = (items, isActive, closeMenu) =>
  items.map(({ path, label }) => (
    <Link
      key={path}
      to={path}
      className={getMobileLinkClass(isActive(path))}
      onClick={closeMenu}
    >
      {label}
    </Link>
  ));

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const isActive = (path) => location.pathname === path;
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              🎯 PlacementOS
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                {renderDesktopLinks(navItems, isActive)}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 text-2xl"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                {renderMobileLinks(navItems, isActive, closeMobileMenu)}
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
