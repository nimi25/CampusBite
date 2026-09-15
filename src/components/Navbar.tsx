/**
 * CampusBite - Responsive Top Navigation Bar
 * Color palette: Orange (#ea580c / #f97316), Warm Yellow (#f59e0b),
 * Dark Charcoal (#0f172a / #1e293b), Crisp White (#ffffff).
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  ShoppingBag,
  Search,
  Users,
  Calendar,
  Clock,
  User,
  UtensilsCrossed,
  Sparkles,
  ChevronDown,
  Flame,
} from 'lucide-react';
import { CAMPUS_LOCATIONS } from '../data/mockData';

export const Navbar: React.FC = () => {
  const {
    screen,
    navigate,
    bill,
    user,
    deliveryLocation,
    setDeliveryLocation,
    searchQuery,
    setSearchQuery,
    activeOrder,
  } = useApp();

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  return (
    <header
      id="campusbite-header"
      className="bg-white border-b border-slate-200 sticky top-[33px] z-40 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Campus Tag */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => navigate('home')}
              className="flex items-center gap-2 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">
                    Campus<span className="text-orange-600">Bite</span>
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Campus
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Smart, Affordable Dining
                </p>
              </div>
            </button>

            {/* Campus Drop-off Selector */}
            <div className="relative hidden md:block ml-4 pl-4 border-l border-slate-200">
              <button
                id="location-picker-btn"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 text-left text-xs bg-slate-50 hover:bg-slate-100 py-1.5 px-2.5 rounded-lg border border-slate-200/80 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <div className="max-w-[160px] lg:max-w-[220px] truncate">
                  <span className="text-slate-400 block text-[10px]">DELIVERING TO</span>
                  <span className="font-semibold text-slate-800 truncate block">
                    {deliveryLocation.split(' - ')[0]}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Campus Drop-off Location
                  </div>
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setDeliveryLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-orange-50 transition-colors flex items-center gap-2 ${
                        deliveryLocation === loc
                          ? 'font-bold text-orange-600 bg-orange-50/60'
                          : 'text-slate-700'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{loc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-home-btn"
              onClick={() => navigate('home')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                screen === 'home'
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              id="nav-budget-btn"
              onClick={() => navigate('budget')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                screen === 'budget'
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span className="text-amber-500 font-bold">₹</span>
              BudgetBites
            </button>
            <button
              id="nav-listing-btn"
              onClick={() => navigate('listing')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                screen === 'listing'
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Meals
            </button>
            <button
              id="nav-group-btn"
              onClick={() => navigate('group')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                screen === 'group'
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-slate-500" />
              GroupOrder
            </button>
            <button
              id="nav-mealpass-btn"
              onClick={() => navigate('mealpass')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                screen === 'mealpass'
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              MealPass
            </button>
            {activeOrder && (
              <button
                id="nav-track-btn"
                onClick={() => navigate('track')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  screen === 'track'
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-sky-600 hover:bg-sky-50'
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Order #{activeOrder.id}
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Trigger */}
            <button
              id="quick-search-header-btn"
              onClick={() => navigate('listing')}
              className="p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search Meals"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Button with Transparent Counter */}
            <button
              id="cart-trigger-btn"
              onClick={() => navigate('cart')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-xs transition-all shadow-xs ${
                bill.itemsCount > 0
                  ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {bill.itemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {bill.itemsCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {bill.itemsCount > 0 ? `₹${bill.finalTotal}` : 'Cart'}
              </span>
            </button>

            {/* Student Profile Pill */}
            <button
              id="student-profile-btn"
              onClick={() => navigate('account')}
              className={`flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border transition-colors ${
                screen === 'account'
                  ? 'border-orange-500 bg-orange-50/50'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="hidden xl:block text-left text-xs">
                <span className="font-bold text-slate-800 block leading-tight">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-500 leading-none">MBA '26</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
