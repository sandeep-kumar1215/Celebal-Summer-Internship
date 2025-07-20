import { cdn_url } from "../utils/constants";

const RestaurantCard = ({ resdata }) => {
  const { 
    name, 
    cuisines = [], 
    avgRating, 
    sla, 
    cloudinaryImageId, 
    costForTwo, 
    areaName,
    aggregatedDiscountInfoV3
  } = resdata?.info || {};

  return (
    <div className="m-2 w-[250px] min-h-[300px] rounded-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      {/* Image with discount banner */}
      <div className="relative">
        <img
          className="w-full h-[150px] object-cover rounded-t-lg"
          src={cdn_url + cloudinaryImageId}
          alt={name}
          loading="lazy"
        />
        {aggregatedDiscountInfoV3 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
            <h3 className="font-bold text-sm">
              {aggregatedDiscountInfoV3.header} {aggregatedDiscountInfoV3.subHeader}
            </h3>
          </div>
        )}
      </div>

      {/* Restaurant details */}
      <div className="p-3">
        <h3 className="font-bold text-lg truncate">{name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-white bg-green-600 rounded-full p-1 flex items-center justify-center w-5 h-5 text-xs mr-1">
            ★
          </span>
          <span className="font-bold">{avgRating}</span>
          <span className="mx-1">•</span>
          <span>{sla?.deliveryTime} mins</span>
          <span className="mx-1">•</span>
          <span>{costForTwo}</span>
        </div>
        <p className="text-gray-500 text-sm mt-2 truncate">
          {cuisines.join(", ")}
        </p>
        <p className="text-gray-400 text-xs mt-1">{areaName}</p>
      </div>
    </div>
  );
};

// Higher Order Component for promoted restaurants
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded z-10">
          Promoted
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;