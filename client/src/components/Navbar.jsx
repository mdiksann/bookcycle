import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiBook, FiLogOut, FiUser, FiRepeat } from "react-icons/fi";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FiBook className="text-primary-600 text-3xl" />
            <span className="text-2xl font-bold text-primary-600">BookCycle</span>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="flex items-center space-x-6">
              <Link to="/books" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Browse Books
              </Link>
              <Link to="/my-books" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                My Books
              </Link>
              <Link to="/exchanges" className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center gap-1">
                <FiRepeat />
                Exchanges
              </Link>

              {/* User Menu */}
              <div className="flex items-center space-x-4 border-l pl-4">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <FiUser className="text-xl" />
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
                  <FiLogOut className="text-xl" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
