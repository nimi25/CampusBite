/**
 * CampusBite - Meal Listing Screen
 * Screen 4 of 10: Restaurant / Meal Listing
 * Allows searching, multi-category browsing, restaurant discovery, and sorting.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FOOD_ITEMS, RESTAURANTS } from '../data/mockData';
import { FoodCard } from '../components/FoodCard';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Clock,
  Star,
  MapPin,
  Utensils,
  Leaf,
} from 'lucide-react';

export const MealListingScreen: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'time'>('rating');

  const categories = [
    'All',
    'North Indian',
    'South Indian',
    'Fast Food',
    'Healthy',
    'Late Night',
    'Beverages',
  ];

  const filteredFoods = FOOD_ITEMS.filter((item) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchRest = item.restaurantName.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchRest && !matchTags) return false;
    }

    // Category
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    // Restaurant
    if (selectedRestaurant !== 'all' && item.restaurantId !== selectedRestaurant) {
      return false;
    }

    // Veg / Non-Veg
    if (vegFilter === 'veg' && !item.isVeg) return false;
    if (vegFilter === 'nonveg' && item.isVeg) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'time') return a.prepTimeMinutes - b.prepTimeMinutes;
    return 0;
  });

  return (
    <div id="meal-listing-screen" className="space-y-6 pb-12">
      {/* Header & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Campus Dining & Eateries
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse authentic food spots operating inside and around campus gates
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="meal-search-input"
            type="text"
            placeholder="Search for 'Maggi', 'Dosa', 'Biryani', 'Chai'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 text-xs">
        {/* Veg / Non-Veg segmented buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setVegFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              vegFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setVegFilter('veg')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors flex items-center gap-1 ${
              vegFilter === 'veg'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            <Leaf className="w-3 h-3" />
            Veg
          </button>
          <button
            onClick={() => setVegFilter('nonveg')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
              vegFilter === 'nonveg'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:text-rose-900'
            }`}
          >
            Non-Veg
          </button>
        </div>

        {/* Filter by Restaurant dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Spot:</span>
          <select
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-hidden focus:border-orange-500"
          >
            <option value="all">All Campus Spots</option>
            {RESTAURANTS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-hidden focus:border-orange-500"
          >
            <option value="rating">Top Rated (★)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="time">Fastest Delivery Time</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredFoods.length}</strong> items
          {searchQuery && ` for "${searchQuery}"`}
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedRestaurant !== 'all' || vegFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedRestaurant('all');
              setVegFilter('all');
            }}
            className="font-bold text-orange-600 hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Meals Grid */}
      {filteredFoods.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No meals matched your search</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try searching for another dish or clearing selected filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};
