/**
 * CampusBite - Food Details Screen / Modal
 * Displays comprehensive dish details, student feedback,
 * ingredient breakdown, and custom preparation requests.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Clock,
  Flame,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  Check,
  ShoppingBag,
} from 'lucide-react';

export const FoodDetailModal: React.FC = () => {
  const { selectedFood, setSelectedFood, addToCart, cart, updateCartQuantity } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  if (!selectedFood) return null;

  const existingInCart = cart.find((i) => i.foodItem.id === selectedFood.id);

  const handleAdd = () => {
    addToCart(selectedFood, quantity, note);
    setSelectedFood(null);
  };

  return (
    <div
      id="food-detail-overlay"
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setSelectedFood(null)}
    >
      <div
        id="food-detail-card"
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative aspect-16/10 w-full bg-slate-100 shrink-0">
          <img
            src={selectedFood.image}
            alt={selectedFood.name}
            className="w-full h-full object-cover"
          />
          <button
            id="close-food-detail-btn"
            onClick={() => setSelectedFood(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/70 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Veg / Non-Veg tag */}
          <div className="absolute bottom-3 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
            <span
              className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                selectedFood.isVeg ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  selectedFood.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase">
              {selectedFood.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Title & Pricing */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider block">
                  {selectedFood.restaurantName}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedFood.name}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-slate-900">
                  ₹{selectedFood.price}
                </div>
                {selectedFood.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{selectedFood.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 mt-3 py-2 border-y border-slate-100 text-xs">
              <span className="flex items-center gap-1 font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {selectedFood.rating}
                <span className="text-slate-400 font-normal">
                  ({selectedFood.reviewsCount} student reviews)
                </span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                {selectedFood.prepTimeMinutes} mins prep
              </span>
              {selectedFood.calories && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium">
                    {selectedFood.calories} kcal
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mt-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                About this dish
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedFood.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selectedFood.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Special Campus Note Input */}
            <div className="mt-4">
              <label
                htmlFor="cooking-note"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
              >
                Special Student Request (Optional)
              </label>
              <input
                id="cooking-note"
                type="text"
                placeholder="e.g. Extra mint chutney, less spicy, pack spoon..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                aria-label="Reduce"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors"
                aria-label="Increase"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-orange-600/20 flex items-center justify-between transition-all"
            >
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </span>
              <span>₹{selectedFood.price * quantity}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
