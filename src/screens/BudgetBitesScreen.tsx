/**
 * CampusBite - BudgetBites Screen
 * Screen 3 of 10: Feature 1 - BUDGETBITES
 * Displays meals strictly filtered by budget tiers: Under ₹99, Under ₹149, Under ₹199.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FOOD_ITEMS } from '../data/mockData';
import { FoodCard } from '../components/FoodCard';
import { BudgetTier } from '../types';
import {
  Tag,
  ShieldCheck,
  Percent,
  Sparkles,
  Search,
  Filter,
  ArrowUpDown,
  Utensils,
  Leaf,
} from 'lucide-react';

export const BudgetBitesScreen: React.FC = () => {
  const { budgetTier, setBudgetTier } = useApp();
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'price-asc' | 'rating' | 'popular'>('price-asc');

  // Filter items by selected budget tier
  const filteredMeals = FOOD_ITEMS.filter((item) => {
    if (budgetTier === 'under99' && item.budgetTier !== 'under99') return false;
    if (budgetTier === 'under149' && item.budgetTier !== 'under149') return false;
    if (budgetTier === 'under199' && item.budgetTier !== 'under199') return false;
    if (vegOnly && !item.isVeg) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount;
  });

  const tierStats = {
    under99: FOOD_ITEMS.filter((i) => i.budgetTier === 'under99').length,
    under149: FOOD_ITEMS.filter((i) => i.budgetTier === 'under149').length,
    under199: FOOD_ITEMS.filter((i) => i.budgetTier === 'under199').length,
  };

  return (
    <div id="budgetbites-screen" className="space-y-6 pb-12">
      {/* Feature 1 Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5 text-amber-300" />
            <span>CampusBite Feature 1 • Guaranteed Price Caps</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            BudgetBites: Student Pocket Friendly Meals
          </h1>

          <p className="text-xs sm:text-sm text-orange-100 mt-2 leading-relaxed">
            No campus student should compromise on good food due to exorbitant delivery markups. Every single item here is strictly capped under your target budget.
          </p>

          <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-white/90">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-200" />
              <span>Zero Surge Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-amber-200" />
              <span>Flat Transparent Fees</span>
            </div>
          </div>
        </div>

        <div className="absolute right-4 bottom-2 text-white/10 text-8xl font-black select-none pointer-events-none hidden sm:block">
          ₹99
        </div>
      </div>

      {/* Budget Tier Selector Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Your Budget Tier
          </span>
          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-900">{filteredMeals.length}</strong> meals
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* All Options */}
          <button
            id="budget-tier-all"
            onClick={() => setBudgetTier('all')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              budgetTier === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-800/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">All Budgets</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  budgetTier === 'all'
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {FOOD_ITEMS.length}
              </span>
            </div>
            <p
              className={`text-[11px] ${
                budgetTier === 'all' ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Full campus menu
            </p>
          </button>

          {/* Under ₹99 */}
          <button
            id="budget-tier-under99"
            onClick={() => setBudgetTier('under99')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              budgetTier === 'under99'
                ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">Under ₹99</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  budgetTier === 'under99'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {tierStats.under99}
              </span>
            </div>
            <p
              className={`text-[11px] ${
                budgetTier === 'under99' ? 'text-amber-100' : 'text-slate-500'
              }`}
            >
              Snacks, Maggi & Chai
            </p>
          </button>

          {/* Under ₹149 */}
          <button
            id="budget-tier-under149"
            onClick={() => setBudgetTier('under149')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              budgetTier === 'under149'
                ? 'bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-500/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">Under ₹149</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  budgetTier === 'under149'
                    ? 'bg-orange-700 text-white'
                    : 'bg-orange-100 text-orange-800'
                }`}
              >
                {tierStats.under149}
              </span>
            </div>
            <p
              className={`text-[11px] ${
                budgetTier === 'under149' ? 'text-orange-100' : 'text-slate-500'
              }`}
            >
              Dosas, Rolls & Bowls
            </p>
          </button>

          {/* Under ₹199 */}
          <button
            id="budget-tier-under199"
            onClick={() => setBudgetTier('under199')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              budgetTier === 'under199'
                ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/30'
                : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-sm">Under ₹199</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  budgetTier === 'under199'
                    ? 'bg-rose-700 text-white'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {tierStats.under199}
              </span>
            </div>
            <p
              className={`text-[11px] ${
                budgetTier === 'under199' ? 'text-rose-100' : 'text-slate-500'
              }`}
            >
              Thalis & Biryanis
            </p>
          </button>
        </div>
      </div>

      {/* Secondary Controls: Veg Toggle & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center gap-3">
          <button
            id="budget-veg-toggle"
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold border transition-colors ${
              vegOnly
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pure Veg Only</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-hidden focus:border-orange-500"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="rating">Top Rated (4.8★+)</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Meals Grid */}
      {filteredMeals.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
          <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No meals found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try switching off the Pure Veg filter or picking another budget tier.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeals.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};
