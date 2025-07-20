import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => 
        total + (item.card.info.price || item.card.info.defaultPrice) * item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <img
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
          alt="Empty Cart"
          className="w-60 mb-4"
        />
        <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">
          You can go to home page to view more restaurants
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:flex gap-6">
      {/* Items List */}
      <div className="md:w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Cart ({cartItems.length})</h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-red-500 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.card.info.id}
              className="border-b pb-4 flex justify-between"
            >
              <div className="w-3/4">
                <h3 className="font-medium">{item.card.info.name}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.card.info.id))}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-lg"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.card.info.id))}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="md:w-1/3 mt-6 md:mt-0">
        <div className="border rounded-lg p-4 shadow-sm sticky top-4">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{calculateTotal() / 100}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹49</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
              <span>Total</span>
              <span>₹{(calculateTotal() / 100 + 49).toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-orange-500 text-white py-2 rounded-lg mt-4 font-medium hover:bg-orange-600 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;