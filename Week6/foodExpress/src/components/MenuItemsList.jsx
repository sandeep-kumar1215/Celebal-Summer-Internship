import React from 'react';
import { cdn_url } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

const MenuItemsList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.card.info.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="space-y-6">
      {items.map((item) => {
        const price = item.card.info.price 
          ? item.card.info.price / 100 
          : item.card.info.defaultPrice / 100;
        const itemId = item.card.info.id;
        const quantity = getItemQuantity(itemId);

        return (
          <div 
            key={itemId} 
            className="flex justify-between pb-6 border-b border-gray-200 last:border-0"
          >
            {/* Item details */}
            <div className="flex-grow pr-4 w-3/4">
              <div className="flex items-center gap-2 mb-1">
                {item.card.info.itemAttribute?.vegClassifier && (
                  <span className="inline-flex items-center justify-center w-4 h-4 border rounded-sm">
                    {item.card.info.itemAttribute.vegClassifier === 'VEG' ? (
                      <span className="w-2 h-2 bg-green-500 rounded-sm"></span>
                    ) : (
                      <span className="w-2 h-2 bg-red-500 rounded-sm"></span>
                    )}
                  </span>
                )}
                
                {item.card.info.isBestseller && (
                  <span className="text-xs text-amber-700 font-medium">
                    ★ Bestseller
                  </span>
                )}
              </div>
              
              <h4 className="text-lg font-medium text-gray-800">
                {item.card.info.name}
              </h4>
              
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <span className="font-medium">₹{price}</span>
                {item.card.info.offerTags?.length > 0 && (
                  <span className="text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded">
                    {item.card.info.offerTags[0].title}
                  </span>
                )}
              </p>
              
              {item.card.info.description && (
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {item.card.info.description}
                </p>
              )}
            </div>

            {/* Item image and quantity controls */}
            <div className="relative w-1/4 flex-shrink-0">
              {item.card.info.imageId && (
                <img 
                  src={cdn_url + item.card.info.imageId} 
                  className="w-full h-24 object-cover rounded-lg"
                  alt={item.card.info.name}
                />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                {quantity === 0 ? (
                  <button 
                    onClick={() => handleAddItem(item)}
                    className="bg-white text-green-600 border border-gray-300 text-sm font-medium 
                    px-6 py-1 rounded shadow-md hover:shadow-lg transition-all"
                  >
                    ADD
                  </button>
                ) : (
                  <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md">
                    <button 
                      onClick={() => handleDecrease(itemId)}
                      className="w-8 h-8 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100 rounded-l-full"
                    >
                      -
                    </button>
                    <span className="px-2 text-sm font-medium">{quantity}</span>
                    <button 
                      onClick={() => handleIncrease(itemId)}
                      className="w-8 h-8 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100 rounded-r-full"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItemsList;