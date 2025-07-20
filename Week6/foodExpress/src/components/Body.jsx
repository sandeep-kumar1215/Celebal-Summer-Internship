import RestaruantCard from "./RestaruantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { Chandigarh_api } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStauts";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredListOfRestaurant, setFilteredListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(Chandigarh_api);
      const jsondata = await data.json();
      const restaurants = jsondata?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setListOfRestaurant(restaurants);
      setFilteredListOfRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const status = useOnlineStatus();
  if (!status) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-red-500 font-semibold">
          Oops! You are offline. Please check your internet connection.
        </h1>
      </div>
    );
  }

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="container mx-auto px-4 py-6">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex w-full md:w-auto">
          <input
            type="text"
            className="border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent flex-grow"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const searchedList = listOfRestaurant.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredListOfRestaurant(searchedList);
              }
            }}
          />
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors duration-300 font-medium"
            onClick={() => {
              const searchedList = listOfRestaurant.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredListOfRestaurant(searchedList);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors duration-300 font-medium w-full md:w-auto"
          onClick={() => {
            const filteredList = listOfRestaurant.filter((res) => res.info.avgRating > 4.3);
            setFilteredListOfRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* Restaurant Cards */}
      {filteredListOfRestaurant.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600">No restaurants found</h3>
          <button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            onClick={() => setFilteredListOfRestaurant(listOfRestaurant)}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListOfRestaurant.map((restaurant) => (
            <Link 
              key={restaurant.info.id} 
              to={"/menu/" + restaurant.info.id}
              className="hover:scale-105 transition-transform duration-300"
            >
              <RestaruantCard resdata={restaurant} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;