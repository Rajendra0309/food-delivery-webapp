import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Sun, Moon, Plus, 
  Minus, Heart, Clock, Star, ChevronDown, X, Menu 
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

// Nutrition Label Component
const NutritionLabel = ({ nutritionInfo }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h4 className="font-bold mb-2">Nutrition Facts</h4>
    <div className="space-y-1">
      {Object.entries(nutritionInfo).map(([key, value]) => (
        <div key={key} className="flex justify-between text-sm">
          <span>{key}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

// Order History Component
const OrderHistory = ({ orders, darkMode }) => (
  <div className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
    <h2 className="text-xl font-bold mb-4">Order History</h2>
    {orders.length === 0 ? (
      <p className="text-center text-gray-500">No orders yet.</p>
    ) : (
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="border-b pb-4">
            <h3 className="font-bold">{order.date}</h3>
            <ul className="list-disc ml-5">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-2">Total: ${order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Enhanced Food Item Card
const FoodItemCard = ({ item, darkMode, onAddToCart, isExpanded, onToggleExpand }) => {
  const [quantity, setQuantity] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

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
          src={item.imageUrl}
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
          onClick={onToggleExpand}
          className="mt-3 text-sm text-orange-500 hover:text-orange-600 flex items-center"
        >
          View Details
          <ChevronDown 
            size={16} 
            className={`ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        {isExpanded && (
          <div className={`mt-3 p-3 rounded-lg ${
            darkMode 
              ? 'bg-gray-700' 
              : 'bg-orange-50'
          }`}>
            <p className={`text-sm ${
              darkMode 
                ? 'text-gray-200' 
                : 'text-gray-700'
            }`}>{item.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span 
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    darkMode 
                      ? 'bg-gray-600 text-gray-200' 
                      : 'bg-orange-100 text-orange-700'
                  }`}
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

const CartDrawer = ({ isOpen, onClose, items, darkMode, onRemoveItem, onCheckout }) => {
  return (
    <div className={`fixed top-0 right-0 h-full w-80 transform transition-transform duration-300 z-[100] 
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-lg pt-16`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose}><X /></button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-8 flex-grow flex flex-col justify-center items-center">
            <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto space-y-4 mb-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button 
                  onClick={() => onRemoveItem(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="font-bold">
                ${items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>
            <button 
              className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Filter Modal Component
const FilterModal = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className={`w-96 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Filters</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="space-y-4">
          <p>Filter options coming soon...</p>
        </div>
      </div>
    </div>
  );
};


const FoodDeliveryApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [expandedCards, setExpandedCards] = useState([]);

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
      category: "Pizza",
      imageUrl: "https://images.freeimages.com/images/premium/previews/3669/36695648-italian-supreme-pizza.jpg"
    },
    {
      name: "Classic Cheeseburger",
      cuisine: "American",
      price: 8.99,
      originalPrice: 10.99,
      rating: 4.2,
      deliveryTime: 25,
      isAvailable: true,
      discount: 10,
      description: "Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce.",
      tags: ["Signature", "Classic"],
      category: "Burgers",
      imageUrl: "https://th.bing.com/th/id/OIP.jngGm1DVvATRA3Wfc-R2ZgHaEK?rs=1&pid=ImgDetMain"
    },
    {
      name: "California Roll",
      cuisine: "Japanese",
      price: 11.99,
      originalPrice: 13.99,
      rating: 4.7,
      deliveryTime: 35,
      isAvailable: true,
      discount: 12,
      description: "Fresh crab, avocado, and cucumber wrapped in sushi rice and seaweed.",
      tags: ["Seafood", "Fresh"],
      category: "Sushi",
      imageUrl: "https://th.bing.com/th/id/OIP.GY1kRHF-sSgYuKQcZFJ7igHaD6?rs=1&pid=ImgDetMain"
    },
    {
      name: "Caesar Salad",
      cuisine: "Italian",
      price: 7.99,
      originalPrice: 9.99,
      rating: 4.3,
      deliveryTime: 20,
      isAvailable: true,
      discount: 20,
      description: "Crisp romaine lettuce, croutons, and Parmesan cheese tossed in Caesar dressing.",
      tags: ["Healthy", "Vegetarian"],
      category: "Salads",
      imageUrl: "https://th.bing.com/th/id/OSK.HEROnr6GhNH5NdzJh0LH-IBvUdmSIHD_mdYRp0cex9h0ZJo?rs=1&pid=ImgDetMain"
    },
    {
      name: "Chocolate Lava Cake",
      cuisine: "Dessert",
      price: 5.99,
      originalPrice: 7.99,
      rating: 4.8,
      deliveryTime: 15,
      isAvailable: true,
      discount: 25,
      description: "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
      tags: ["Sweet", "Popular"],
      category: "Desserts",
      imageUrl: "https://th.bing.com/th/id/OSK.HEROWQjr1vAfp5vBc3CGszkv_DfVeo0RYQH1cRgNPvSKmMg?rs=1&pid=ImgDetMain"
    },
    {
      name: "Spicy Tuna Roll",
      cuisine: "Japanese",
      price: 10.99,
      originalPrice: 12.99,
      rating: 4.6,
      deliveryTime: 30,
      isAvailable: true,
      discount: 15,
      description: "Fresh tuna mixed with spicy mayo, wrapped in sushi rice and seaweed.",
      tags: ["Spicy", "Seafood"],
      category: "Sushi",
      imageUrl: "https://media.gettyimages.com/id/1391677903/photo/spicy-tuna-roll.jpg?b=1&s=594x594&w=0&k=20&c=ViUD-YigIpnabIrzdlwjRkjvlf09MideMG6TNZ0yYmE="
    }
  ];
  

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    setToast({
      message: `Added ${item.name} to cart!`,
      type: 'success'
    });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const toggleCart = () => {
    setShowCart(prevShowCart => !prevShowCart);
  };

  const handleCheckout = () => {
    const newOrder = {
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    setOrders([...orders, newOrder]);
    setCartItems([]);
    setShowCart(false);
    setToast({
      message: 'Order placed successfully!',
      type: 'success'
    });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredItems = foodItems.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleCardExpansion = (index) => {
    setExpandedCards(prevExpanded => {
      if (prevExpanded.includes(index)) {
        return prevExpanded.filter(id => id !== index);
      } else {
        return [...prevExpanded, index];
      }
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 py-4 shadow-md transition-colors duration-300 
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>

          {/* Logo */}
          <AppLogo darkMode={darkMode} />

          {/* Navigation Links */}
          <nav className={`hidden md:flex space-x-6 ${darkMode ? 'text-white' : 'text-black'}`}>
            <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Restaurants</a>
            <a 
              href="#" 
              onClick={() => setShowOrderHistory(true)}
              className="hover:text-orange-500 transition-colors"
            >
              Orders
            </a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search food..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`px-4 py-2 rounded-full w-64 transition-all duration-300
                  ${darkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-200 text-black'
                  }`}
              />
              <Search 
                size={20} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" 
              />
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors duration-300 
                ${darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>

            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className={`relative p-2 rounded-full transition-colors duration-300 
                ${darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              <ShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white 
                  rounded-full px-2 py-1 text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {categories.map(category => (
            <CategoryBadge 
              key={category}
              name={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              darkMode={darkMode}
            />
          ))}
          <button 
            onClick={() => setShowFilters(true)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 
              ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}
              hover:bg-orange-500 hover:text-white`}
          >
            Filters
          </button>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <FoodItemCard 
              key={index}
              item={item}
              darkMode={darkMode}
              onAddToCart={handleAddToCart}
              isExpanded={expandedCards.includes(index)}
              onToggleExpand={() => toggleCardExpansion(index)}
            />
          ))}
        </div>
      </main>

      {/* Components */}
      <CartDrawer 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        darkMode={darkMode}
        onRemoveItem={handleRemoveFromCart}
      />

      <FilterModal 
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        darkMode={darkMode}
      />

      <OrderHistory 
        orders={orders}
        darkMode={darkMode}
      />

      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default FoodDeliveryApp;