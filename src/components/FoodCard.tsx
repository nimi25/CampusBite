/**
 * CampusBite - Reusable Meal FoodCard Component
 * Displays dish details, realistic Indian student price in INR,
 * veg/non-veg status, and direct cart quantity controls.
 */

import React from 'react';
import { FoodItem } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Clock, Plus, Minus, Flame, Sparkles } from 'lucide-react';

interface FoodCardProps {
  food: FoodItem;
  compact?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food, compact = false }) => {
  const { cart, addToCart, updateCartQuantity, setSelectedFood } = useApp();

  const cartItem = cart.find((item) => item.foodItem.id === food.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <article
      id={`food-card-${food.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group cursor-pointer"
      onClick={() => setSelectedFood(food)}
    >
      {/* Food Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs p-1 rounded-md shadow-xs flex items-center gap-1">
          <span
            className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
              food.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </span>
          <span className="text-[9px] font-bold text-slate-700 uppercase tracking-wider">
            {food.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Budget Tier Badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="bg-slate-900/90 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
            {food.budgetTier === 'under99'
              ? '< ₹99'
              : food.budgetTier === 'under149'
              ? '< ₹149'
              : '< ₹199'}
          </span>
        </div>

        {/* Prep Time pill */}
        <div className="absolute bottom-2 left-2.5 bg-slate-950/75 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>{food.prepTimeMinutes}m</span>
          {food.calories && (
            <>
              <span className="text-slate-400">•</span>
              <span>{food.calories} cal</span>
            </>
          )}
        </div>
      </div>

      {/* Details Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500 font-medium truncate max-w-[170px]">
              {food.restaurantName}
            </span>
            <span className="flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded text-[11px]">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              {food.rating}
            </span>
          </div>

          {/* Dish Title */}
          <h3 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {food.name}
          </h3>

          {/* Description */}
          {!compact && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {food.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {food.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900">
                ₹{food.price}
              </span>
              {food.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{food.originalPrice}
                </span>
              )}
            </div>
            {food.originalPrice && (
              <span className="text-[10px] font-bold text-emerald-600 block">
                Save ₹{food.originalPrice - food.price}
              </span>
            )}
          </div>

          {/* Quantity Controls (Click Stops Propagation) */}
          <div onClick={(e) => e.stopPropagation()}>
            {quantity > 0 ? (
              <div className="flex items-center bg-orange-50 border border-orange-200 rounded-xl p-0.5 shadow-xs">
                <button
                  id={`btn-minus-${food.id}`}
                  onClick={() => updateCartQuantity(food.id, -1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-orange-600 hover:bg-orange-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-extrabold text-slate-900">
                  {quantity}
                </span>
                <button
                  id={`btn-plus-${food.id}`}
                  onClick={() => updateCartQuantity(food.id, 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id={`btn-add-${food.id}`}
                onClick={() => addToCart(food, 1)}
                className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
