import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              🎯 PlacementOS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`font-medium transition ${
                    isActive("/dashboard")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/applications"
                  className={`font-medium transition ${
                    isActive("/applications")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Applications
                </Link>
                <Link
                  to="/resumes"
                  className={`font-medium transition ${
                    isActive("/resumes")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Resumes
                </Link>
                <Link
                  to="/reminders"
                  className={`font-medium transition ${
                    isActive("/reminders")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Reminders
                </Link>
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-lg font-medium transition ${
                    isActive("/dashboard")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/applications"
                  className={`block px-3 py-2 rounded-lg font-medium transition ${
                    isActive("/applications")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Applications
                </Link>
                <Link
                  to="/resumes"
                  className={`block px-3 py-2 rounded-lg font-medium transition ${
                    isActive("/resumes")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resumes
                </Link>
                <Link
                  to="/reminders"
                  className={`block px-3 py-2 rounded-lg font-medium transition ${
                    isActive("/reminders")
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reminders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                  onClick={() => setMobileMenuOpen(false)}
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
