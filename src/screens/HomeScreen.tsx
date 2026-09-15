/**
 * CampusBite - Home Screen
 * Screen 2 of 10: Integrates QUICKPICK (Feature 2), BUDGETBITES teaser (Feature 1),
 * campus announcements, restaurant highlights, and student food discovery.
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { FOOD_ITEMS, RESTAURANTS } from '../data/mockData';
import { FoodCard } from '../components/FoodCard';
import { QuickPickCategory } from '../types';
import {
  Zap,
  Flame,
  Moon,
  Sparkles,
  ArrowRight,
  Search,
  Users,
  CalendarDays,
  ShieldCheck,
  TrendingUp,
  Tag,
  Clock,
  Heart,
  BadgePercent,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    navigate,
    setBudgetTier,
    quickPick,
    setQuickPick,
    setSearchQuery,
    user,
    setSelectedFood,
    loadSampleGroupOrder,
  } = useApp();

  // Filter food based on QuickPick selection
  const filteredQuickPickMeals = quickPick
    ? FOOD_ITEMS.filter((item) => item.quickPicks.includes(quickPick))
    : FOOD_ITEMS.slice(0, 4);

  const quickPickOptions: {
    id: QuickPickCategory;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'hungry',
      title: "I'm hungry",
      subtitle: 'Fastest prep (< 15 mins)',
      icon: <Zap className="w-4 h-4" />,
      color: 'from-orange-500 to-amber-500',
    },
    {
      id: 'healthy',
      title: 'Healthy choices',
      subtitle: 'Clean protein & salads',
      icon: <Heart className="w-4 h-4" />,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'latenight',
      title: 'Late-night cravings',
      subtitle: 'Maggi & rolls till 3 AM',
      icon: <Moon className="w-4 h-4" />,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'bestvalue',
      title: 'Best value',
      subtitle: 'Max food per rupee',
      icon: <BadgePercent className="w-4 h-4" />,
      color: 'from-rose-500 to-pink-500',
    },
  ];

  return (
    <div id="home-screen" className="space-y-6 pb-12">
      {/* 1. Student Campus Greeting Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-600 via-orange-500 to-amber-500 text-white p-5 sm:p-7 shadow-lg shadow-orange-500/15">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Campus Delivery • 12-18 Mins Avg</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Craving good food, <br className="hidden sm:block" />
            {user.name.split(' ')[0]}?
          </h1>

          <p className="text-xs sm:text-sm text-orange-100 mt-2 leading-relaxed">
            Pocket-friendly meals starting at ₹59 delivered right to {user.hostelRoom.split(',')[0]}. No hidden platform markups.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-5">
            <button
              id="home-banner-budgetbites-btn"
              onClick={() => {
                setBudgetTier('under99');
                navigate('budget');
              }}
              className="px-4 py-2 rounded-xl bg-white text-orange-600 hover:bg-orange-50 active:scale-95 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Explore BudgetBites</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="home-banner-group-btn"
              onClick={loadSampleGroupOrder}
              className="px-4 py-2 rounded-xl bg-black/20 hover:bg-black/30 text-white font-semibold text-xs backdrop-blur-xs transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Roommate Group Order</span>
            </button>
          </div>
        </div>

        {/* Decorative Background Pattern */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block text-white/20 text-9xl font-black select-none pointer-events-none">
          ₹99
        </div>
      </section>

      {/* 2. Feature 2: QUICKPICK (Personalized Recommendation Section) */}
      <section id="quickpick-section" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                QuickPick Recommendations
              </h2>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Feature 2
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your mood to discover matching campus meals instantly
            </p>
          </div>

          {quickPick && (
            <button
              onClick={() => setQuickPick(null)}
              className="text-xs font-semibold text-orange-600 hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* 4 Mood Option Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {quickPickOptions.map((opt) => {
            const isSelected = quickPick === opt.id;
            return (
              <button
                key={opt.id}
                id={`quickpick-btn-${opt.id}`}
                onClick={() => setQuickPick(isSelected ? null : opt.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-2 ring-orange-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xl bg-linear-to-br ${opt.color} text-white flex items-center justify-center shadow-xs`}
                  >
                    {opt.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-orange-600 transition-colors">
                    {opt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {opt.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* QuickPick Meals Results Grid */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700">
              {quickPick
                ? `Showing recommendations for "${
                    quickPickOptions.find((o) => o.id === quickPick)?.title
                  }"`
                : 'Trending across campus right now'}
            </span>
            <button
              onClick={() => navigate('listing')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>See all ({FOOD_ITEMS.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredQuickPickMeals.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature 1: BUDGETBITES Teaser Grid */}
      <section
        id="budgetbites-teaser-section"
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                BudgetBites: Meals by Price Cap
              </h2>
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Feature 1
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Honest student pricing with zero hidden delivery surge
            </p>
          </div>

          <button
            id="see-all-budgetbites-btn"
            onClick={() => navigate('budget')}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 self-start sm:self-auto flex items-center gap-1"
          >
            <span>Open Budget Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Under ₹99 */}
          <div
            onClick={() => {
              setBudgetTier('under99');
              navigate('budget');
            }}
            className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 hover:border-amber-300 hover:bg-amber-50 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="bg-amber-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-full">
                Under ₹99
              </span>
              <span className="text-[11px] font-bold text-amber-700">5 options</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-800">
              Quick Bites & Chai Combos
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Samosa Pav duo, Cheese Butter Maggi, Poha & Aloo Paratha.
            </p>
          </div>

          {/* Under ₹149 */}
          <div
            onClick={() => {
              setBudgetTier('under149');
              navigate('budget');
            }}
            className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="bg-orange-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full">
                Under ₹149
              </span>
              <span className="text-[11px] font-bold text-orange-700">6 options</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-700">
              Wholesome Student Meals
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Ghee Roast Dosa, Double Egg Roll, Rajma Chawal & Chole Bhature.
            </p>
          </div>

          {/* Under ₹199 */}
          <div
            onClick={() => {
              setBudgetTier('under199');
              navigate('budget');
            }}
            className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 hover:border-rose-300 hover:bg-rose-50 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full">
                Under ₹199
              </span>
              <span className="text-[11px] font-bold text-rose-700">6 options</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-rose-700">
              Deluxe Thalis & Biryanis
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Hostel Mini Thali, Dum Chicken Biryani, Paneer Butter Masala.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Two Feature Cards: GroupOrder (F3) & MealPass (F6) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Feature 3 Card: GroupOrder */}
        <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3 h-3" />
                Feature 3 • GroupOrder
              </span>
              <span className="text-xs text-slate-400 font-medium">Split Bill Fairly</span>
            </div>

            <h3 className="text-xl font-bold">Late-Night Study Squad Order</h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Order food together with your hostel roommates. CampusBite calculates each person's exact share + splits the ₹15 delivery fee equally.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-700/60">
            <div className="flex -space-x-2 overflow-hidden">
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-orange-500 text-xs flex items-center justify-center font-bold">
                AS
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-emerald-500 text-xs flex items-center justify-center font-bold">
                RV
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-purple-500 text-xs flex items-center justify-center font-bold">
                AI
              </span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800 bg-sky-500 text-xs flex items-center justify-center font-bold">
                KM
              </span>
            </div>

            <button
              id="home-open-group-order-btn"
              onClick={loadSampleGroupOrder}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
            >
              <span>Launch Squad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Feature 6 Card: MealPass */}
        <div className="bg-linear-to-br from-amber-500 via-orange-500 to-orange-600 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                Feature 6 • MealPass
              </span>
              <span className="text-xs text-amber-100 font-bold">Save up to ₹800/wk</span>
            </div>

            <h3 className="text-xl font-bold">Weekly Campus Meal Passes</h3>
            <p className="text-xs text-orange-100 mt-1.5 leading-relaxed">
              Tired of repetitive hostel mess food? Subscribe to weekday lunches or exam dinner packages starting at ₹499/week.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/20">
            <div>
              <span className="text-xs text-orange-100 block">Starting from</span>
              <span className="text-lg font-black">₹499 / week</span>
            </div>

            <button
              id="home-open-mealpass-btn"
              onClick={() => navigate('mealpass')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs shadow-md transition-colors flex items-center gap-1"
            >
              <span>View Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Campus Eateries & Spots */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Popular Campus Kitchens & Canteens
            </h3>
            <p className="text-xs text-slate-500">
              Located right inside the college perimeter
            </p>
          </div>
          <button
            onClick={() => navigate('listing')}
            className="text-xs font-bold text-orange-600 hover:underline"
          >
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RESTAURANTS.slice(0, 3).map((res) => (
            <div
              key={res.id}
              onClick={() => navigate('listing')}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-3.5 group"
            >
              <img
                src={res.image}
                alt={res.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 truncate group-hover:text-orange-600">
                    {res.name}
                  </h4>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                    ★ {res.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {res.campusLocation}
                </p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-0.5 text-orange-600 font-medium">
                    <Clock className="w-3 h-3" />
                    {res.deliveryTime}
                  </span>
                  <span>•</span>
                  <span>Min ₹{res.minOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
