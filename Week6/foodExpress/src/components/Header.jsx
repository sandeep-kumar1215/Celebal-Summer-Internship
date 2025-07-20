import { useState } from "react";
import { logo_url } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [logele, setLogEle] = useState("Login");
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate total items in cart (summing quantities)
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity, 
    0
  );

  return (
    <div className="flex justify-between items-center p-4 sticky top-0 z-50 
    bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg">
      {/* Logo */}
      <Link to="/" className="logo-container flex items-center">
        <img 
          className="w-12 h-12 object-contain rounded-full border-2 border-white shadow-md" 
          src={logo_url} 
          alt="Food App Logo" 
        />
        <span className="ml-3 text-white font-bold text-xl hidden sm:block">FoodExpress</span>
      </Link>

      {/* Navigation */}
      <div className="flex items-center">
        <ul className="flex space-x-4 sm:space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-white hover:text-gray-100 font-medium text-sm transition-colors px-2 py-1 rounded hover:bg-orange-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className="text-white hover:text-gray-100 font-medium text-sm transition-colors px-2 py-1 rounded hover:bg-orange-600"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="text-white hover:text-gray-100 font-medium text-sm transition-colors px-2 py-1 rounded hover:bg-orange-600"
            >
              Contact
            </Link>
          </li>
          <li className="relative">
            <Link 
              to="/cart" 
              className="flex items-center text-white hover:text-gray-100 font-medium text-sm transition-colors px-2 py-1 rounded hover:bg-orange-600"
            >
              <span className="mr-1 text-lg">🛒</span> 
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs font-bold 
                rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <button
              className="bg-white text-orange-500 px-4 py-1.5 rounded-md hover:bg-gray-100 hover:shadow-md transition-all text-sm font-bold"
              onClick={() => (logele === "Login" ? setLogEle("Logout") : setLogEle("Login"))}
            >
              {logele}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;