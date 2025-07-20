import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStauts";
import MenuCategories from "./MenuCategories";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Menu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const status = useOnlineStatus();
  const [expandedCategoryIdx, setExpandedCategoryIdx] = useState(null);

  if (!status) return <h1 className="text-center text-red-500">Oops! You are offline. Please check your internet connection.</h1>;
  if (!resInfo) return <Shimmer />;

  // Safely extract restaurant info with fallbacks
  const restaurantInfo = resInfo?.data?.cards[2]?.card?.card?.info || {};
  const { 
    name = "Unknown Restaurant", 
    cuisines = [], 
    costForTwoMessage = "", 
    avgRating = "", 
    totalRatingsString = "",
    areaName = "",
    sla = {}
  } = restaurantInfo;

  // Safely extract categories with fallback
  const categories = 
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) => c.card?.card?.["@type"] === 
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  const toggleCategory = (index) => {
    setExpandedCategoryIdx(expandedCategoryIdx === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Restaurant Header Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-gray-600 text-sm">{cuisines.join(", ")}</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-2 text-center">
            <span className="block text-green-600 font-bold text-lg">★ {avgRating}</span>
            <span className="text-xs text-gray-500">{totalRatingsString}</span>
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm text-gray-600 mb-4">
          <span>{costForTwoMessage}</span>
          <span>{sla?.deliveryTime} mins</span>
        </div>

        <div className="flex gap-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium">
            Order Online
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg font-medium">
            Dineout
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Outlet: {areaName}</p>
        </div>
      </div>

      {/* Menu Categories */}
      <div>
        {categories.map((category, index) => (
          <MenuCategories
            key={category?.card?.card?.title || index}
            data={category?.card?.card}
            isExpanded={index === expandedCategoryIdx}
            onToggle={() => toggleCategory(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;