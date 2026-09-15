/**
 * CampusBite - Mobile-First Bottom Navigation Bar
 * Optimized for mobile touch targets (minimum 44px) with clear labels.
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Tag, Users, CalendarDays, ShoppingBag, Clock } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { screen, navigate, activeOrder, bill } = useApp();

  return (
    <nav
      id="campusbite-bottom-nav"
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* Home */}
        <button
          id="bnav-home"
          onClick={() => navigate('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            screen === 'home'
              ? 'text-orange-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${screen === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* BudgetBites */}
        <button
          id="bnav-budget"
          onClick={() => navigate('budget')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            screen === 'budget'
              ? 'text-orange-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Tag className={`w-5 h-5 ${screen === 'budget' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="absolute -top-1 -right-1.5 bg-amber-500 text-white font-extrabold text-[8px] px-1 rounded-full">
              ₹
            </span>
          </div>
          <span className="text-[10px] mt-0.5">Budget</span>
        </button>

        {/* GroupOrder */}
        <button
          id="bnav-group"
          onClick={() => navigate('group')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            screen === 'group'
              ? 'text-orange-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className={`w-5 h-5 ${screen === 'group' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5">Group</span>
        </button>

        {/* Orders / Live Track */}
        <button
          id="bnav-orders"
          onClick={() => {
            if (activeOrder) {
              navigate('track');
            } else {
              navigate('cart');
            }
          }}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
            screen === 'track' || screen === 'cart' || screen === 'checkout'
              ? 'text-orange-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            {activeOrder ? (
              <>
                <Clock className={`w-5 h-5 ${screen === 'track' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span className="absolute -top-0.5 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600"></span>
                </span>
              </>
            ) : (
              <>
                <ShoppingBag className={`w-5 h-5 ${screen === 'cart' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {bill.itemsCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-orange-600 text-white font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {bill.itemsCount}
                  </span>
                )}
              </>
            )}
          </div>
          <span className="text-[10px] mt-0.5">{activeOrder ? 'Track' : 'Cart'}</span>
        </button>

        {/* MealPass */}
        <button
          id="bnav-mealpass"
          onClick={() => navigate('mealpass')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
            screen === 'mealpass'
              ? 'text-orange-600 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <CalendarDays className={`w-5 h-5 ${screen === 'mealpass' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] mt-0.5">MealPass</span>
        </button>
      </div>
    </nav>
  );
};
