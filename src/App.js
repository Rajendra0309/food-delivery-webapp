import React, { useState, useEffect } from 'react';
import { 
  Home, ShoppingCart, User, Search, MapPin, Sun, Moon, Plus, 
  Minus, Heart, Clock, Star, Filter, TrendingUp, ChevronDown,
  Phone, Mail, X, Menu, DollarSign
} from 'lucide-react';

// Custom Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 
    ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-slideIn`}>
    <span>{message}</span>
    <button onClick={onClose}><X size={16} /></button>
  </div>
);

// Animated Logo Component
const AppLogo = ({ darkMode }) => (
  <div className={`flex items-center font-bold text-3xl transition-all duration-300 
    ${darkMode ? 'text-orange-300' : 'text-orange-600'} hover:scale-105`}>
    <span className="animate-bounce">🍽️</span>
    <span className={`ml-2 font-cursive ${darkMode ? 'text-white' : 'text-black'}`}>
      QuickBite
    </span>
  </div>
);

// Category Badge Component
const CategoryBadge = ({ name, active, onClick, darkMode }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105
      ${active 
        ? (darkMode ? 'bg-orange-500 text-white' : 'bg-orange-600 text-white')
        : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600')
      }`}
  >
    {name}
  </button>
);

// Enhanced Food Item Card
const FoodItemCard = ({ item, darkMode, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart({ ...item, quantity });
      setQuantity(0);
    }
  };

  return (
    <div className={`relative rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}
      hover:shadow-2xl hover:scale-105`}>
      <div className="relative group">
        <img 
          src={`/api/placeholder/400/300?text=${item.name}`}
          alt={item.name} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/50 backdrop-blur-sm
            hover:bg-white/80 transition-all duration-300"
        >
          <Heart 
            className={`transition-colors duration-300 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
            size={20}
          />
        </button>
        {item.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg">
            {item.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {item.cuisine}
            </p>
          </div>
          <div className="flex items-center">
            <Star className="text-yellow-400 fill-yellow-400" size={16} />
            <span className="ml-1">{item.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <Clock size={16} className="text-gray-500" />
          <span className="text-sm">{item.deliveryTime} min</span>
          <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-600">
            {item.isAvailable ? 'Available' : 'Sold Out'}
          </span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className="font-bold text-xl text-orange-600">${item.price.toFixed(2)}</span>
            {item.originalPrice > item.price && (
              <span className="ml-2 text-sm line-through text-gray-500">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
              className={`rounded-full p-2 transition-colors
                ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className={`rounded-full p-2 transition-colors
                ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={quantity === 0}
            className={`px-4 py-2 rounded-lg transition-all duration-300
              ${quantity > 0 
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Add to Cart
          </button>
        </div>

        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-sm text-orange-500 hover:text-orange-600 flex items-center"
        >
          View Details
          <ChevronDown 
            size={16} 
            className={`ml-1 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
          />
        </button>

        {showDetails && (
          <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
            <p className="text-sm">{item.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Cart Drawer Component
const CartDrawer = ({ isOpen, onClose, items, darkMode, onUpdateQuantity, onRemoveItem }) => (
  <div className={`fixed top-0 right-0 h-full w-80 transform transition-transform duration-300
    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg`}>
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}><X /></button>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart size={48} className="mx-auto mb-4 text-gray-400" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button 
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="font-bold">
                ${items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>
            <button className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

// Filter Modal Component
const FilterModal = ({ isOpen, onClose, darkMode, filters, onApplyFilters }) => (
  isOpen && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className={`w-96 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Filters</h3>
          <button onClick={onClose}><X /></button>
        </div>
        {/* Filter options here */}
      </div>
    </div>
  )
);

// Main App Component
const FoodDeliveryApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['All', 'Pizza', 'Burgers', 'Sushi', 'Salads', 'Desserts'];

  const foodItems = [
    {
      name: "Supreme Pizza",
      cuisine: "Italian",
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.5,
      deliveryTime: 30,
      isAvailable: true,
      discount: 15,
      description: "Loaded with pepperoni, sausage, mushrooms, onions, and green peppers on our signature crust.",
      tags: ["Spicy", "Popular", "Best Seller"],
      category: "Pizza"
    },
    // Add more items here
  ];

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setToast({
      message: `Added ${item.name} to cart!`,
      type: 'success'
    });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredItems = foodItems.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 shadow-md transition-colors duration-300
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <AppLogo darkMode={darkMode} />
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors
                  ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
              >
                {darkMode ? <Sun /> : <Moon />}
              </button>
              
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search food items..." 
                  className={`w-64 px-4 py-2 rounded-full transition-colors
                    ${darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-gray-100'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>

              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2"
              >
                <ShoppingCart />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                    rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                <Menu />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex space-x-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <CategoryBadge
                key={category}
                name={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                darkMode={darkMode}
              />
            ))}
          </div>
                  </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <FoodItemCard
                key={index}
                item={item}
                darkMode={darkMode}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No items match your search or filter criteria.
            </p>
          )}
        </div>
      </main>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        darkMode={darkMode}
        onUpdateQuantity={(index, newQuantity) => {
          const updatedCart = [...cartItems];
          if (newQuantity > 0) {
            updatedCart[index].quantity = newQuantity;
          } else {
            updatedCart.splice(index, 1);
          }
          setCartItems(updatedCart);
        }}
        onRemoveItem={(index) => {
          const updatedCart = [...cartItems];
          updatedCart.splice(index, 1);
          setCartItems(updatedCart);
        }}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        darkMode={darkMode}
        filters={{ /* Filter options could be passed here */ }}
        onApplyFilters={(newFilters) => {
          // Handle filter application
          setShowFilters(false);
        }}
      />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center p-6 space-y-4">
          <button onClick={() => setIsMenuOpen(false)} className="self-end">
            <X />
          </button>
          <button
            onClick={() => setShowFilters(true)}
            className={`px-4 py-2 rounded-lg transition-colors
              ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Filters
          </button>
          <button
            onClick={() => setShowCart(true)}
            className={`px-4 py-2 rounded-lg transition-colors
              ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Cart ({cartItems.length})
          </button>
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search food items..."
                className={`w-full px-4 py-2 rounded-full transition-colors
                  ${darkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-100'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDeliveryApp;
