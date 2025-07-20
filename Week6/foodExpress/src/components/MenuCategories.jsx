import MenuItemsList from './MenuItemsList';

const MenuCategories = ({ data, isExpanded, onToggle }) => {
  const title = data?.title || "No Title Provided";
  const items = data?.itemCards || [];
  const itemCount = items.length;

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border-b border-gray-200 pb-8 last:border-0">
      {/* Category Header */}
      <div 
        className="flex justify-between items-center cursor-pointer py-4"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
      >
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {title}
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
            )}
          </h3>
        </div>
        <div className="flex items-center">
          {itemCount > 0 && (
            <span className="text-gray-500 text-sm mr-2">
              {isExpanded ? 'Hide' : 'Show'}
            </span>
          )}
          {itemCount > 0 && (
            <span className="text-gray-600 transform transition-transform duration-200">
              {isExpanded ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Category Items */}
      {isExpanded && (
        <div className="space-y-6 mt-2">
          <MenuItemsList items={items} />
        </div>
      )}
    </div>
  );
};

export default MenuCategories;