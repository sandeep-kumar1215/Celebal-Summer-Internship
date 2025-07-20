const Shimmer = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array(12)
          .fill("")
          .map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-40 rounded-t-lg"></div>
              <div className="bg-gray-200 h-6 mt-2 rounded"></div>
              <div className="bg-gray-200 h-4 mt-2 rounded"></div>
              <div className="bg-gray-200 h-4 mt-2 rounded"></div>
            </div>
          ))}
      </div>
    );
  };
  
  export default Shimmer;