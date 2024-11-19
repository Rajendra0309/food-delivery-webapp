import React, { useState } from 'react';
import { 
  Home, ShoppingCart, User, Search, MapPin, Sun, Moon, Plus, Minus, Heart 
} from 'lucide-react';

// Responsive Logo Component with Animated Design
const AppLogo = ({ darkMode }) => (
  <div className={`flex items-center font-bold text-3xl transition-all duration-300 
    ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>
    <span className="animate-pulse">🍽️</span>
    <span className={`ml-2 ${darkMode ? 'text-white' : 'text-black'}`}>QuickBite</span>
  </div>
);

// Enhanced Food Item Card
const FoodItemCard = ({ name, cuisine, price, image, darkMode }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className={`relative rounded-lg shadow-lg overflow-hidden transform transition 
      hover:scale-105 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="relative">
        <img 
          src={`/api/placeholder/300/200?text=${name}`} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <Heart 
          className={`absolute top-3 right-3 ${quantity > 0 ? 'text-red-500' : 'text-gray-300'}`} 
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cuisine}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-orange-600">${price.toFixed(2)}</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
              className={`rounded-full p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              <Minus size={16} />
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className={`rounded-full p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Food Delivery App Component
const FoodDeliveryApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState(0);

  const foodItems = [
    { name: "Supreme Pizza", cuisine: "Italian", price: 12.99 },
    { name: "Burger Deluxe", cuisine: "American", price: 8.99 },
    { name: "Sushi Platter", cuisine: "Japanese", price: 15.99 },
    { name: "Taco Combo", cuisine: "Mexican", price: 10.99 },
    { name: "Caesar Salad", cuisine: "Healthy", price: 7.99 },
    { name: "Pasta Carbonara", cuisine: "Italian", price: 11.99 }
  ];

  const filteredFoodItems = foodItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Header */}
      <header className={`shadow-md p-4 flex justify-between items-center 
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <AppLogo darkMode={darkMode} />
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors 
              ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search food items..." 
              className={`border rounded-full px-4 py-2 w-64 transition-colors
                ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className={`absolute right-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Delicious Food Awaits
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFoodItems.map((item, index) => (
            <FoodItemCard 
              key={index}
              {...item}
              darkMode={darkMode}
            />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 w-full py-3 px-6 flex justify-around shadow-md 
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Home className={darkMode ? 'text-orange-300' : 'text-orange-600'} />
        <div className="relative">
          <ShoppingCart className={darkMode ? 'text-white' : 'text-gray-500'} />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {cartItems}
            </span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default FoodDeliveryApp;