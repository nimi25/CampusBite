/**
 * CampusBite - GroupOrder Screen
 * Screen 9 of 10: Feature 3 - GROUPORDER
 * Mock group ordering for hostel roommates, individual item allocation,
 * automated fair bill splits, and 1-click WhatsApp copy summary.
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';
import {
  Users,
  UserPlus,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  DollarSign,
  Receipt,
  Utensils,
} from 'lucide-react';

export const GroupOrderScreen: React.FC = () => {
  const {
    groupOrder,
    setGroupOrderName,
    addGroupMember,
    removeGroupMember,
    addItemToGroupOrder,
    removeGroupOrderItem,
    clearGroupOrder,
    getGroupMemberShare,
    addToCart,
    navigate,
    showToast,
  } = useApp();

  const [newMemberName, setNewMemberName] = useState('');
  const [selectedMemberForAdd, setSelectedMemberForAdd] = useState<string>(
    groupOrder.members[0]?.id || ''
  );
  const [selectedFoodId, setSelectedFoodId] = useState<string>(FOOD_ITEMS[0].id);
  const [copied, setCopied] = useState(false);

  // Group Total Calculations
  const groupItemsSubtotal = groupOrder.items.reduce(
    (acc, it) => acc + it.foodItem.price * it.quantity,
    0
  );
  const groupDeliveryFee = 15;
  const groupPlatformFee = 5;
  const groupGrandTotal =
    groupItemsSubtotal > 0 ? groupItemsSubtotal + groupDeliveryFee + groupPlatformFee : 0;

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    addGroupMember(newMemberName);
    setNewMemberName('');
  };

  const handleAddItem = () => {
    const food = FOOD_ITEMS.find((f) => f.id === selectedFoodId);
    if (!food || !selectedMemberForAdd) return;
    addItemToGroupOrder(selectedMemberForAdd, food);
  };

  // Convert Group Order items into real cart for checkout
  const handleTransferToCart = () => {
    if (groupOrder.items.length === 0) {
      showToast('Add some items to the group order first!');
      return;
    }
    groupOrder.items.forEach((item) => {
      addToCart(item.foodItem, item.quantity, `Ordered by ${item.memberName}`);
    });
    showToast('Merged group items into your checkout cart!');
    navigate('cart');
  };

  // Generate WhatsApp formatted bill split summary
  const generateWhatsAppSummary = () => {
    let text = `🍔 *CampusBite - ${groupOrder.name} Bill Split* 🍔\n`;
    text += `Group Code: ${groupOrder.code}\n\n`;

    groupOrder.members.forEach((m) => {
      const share = getGroupMemberShare(m.id);
      const items = groupOrder.items.filter((it) => it.memberId === m.id);
      text += `👤 *${m.name}*: ₹${share.totalDue}\n`;
      items.forEach((it) => {
        text += `   • ${it.quantity}x ${it.foodItem.name} (₹${it.foodItem.price * it.quantity})\n`;
      });
      if (share.itemsCost > 0) {
        text += `   • Delivery & runner split: ₹${share.splitDelivery + share.splitPlatform}\n`;
      }
      text += `\n`;
    });

    text += `💰 *Grand Total Payable:* ₹${groupGrandTotal}\n`;
    text += `⚡ Ordered via CampusBite (No surge fee!)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Copied WhatsApp split summary to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div id="grouporder-screen" className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Feature 3 • GroupOrder & Bill Split</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Invite Code:</span>
            <span className="font-mono font-bold bg-slate-800 text-cyan-300 px-2 py-1 rounded-lg text-xs border border-slate-700">
              {groupOrder.code}
            </span>
          </div>
        </div>

        {/* Editable Group Name */}
        <div>
          <label className="text-xs text-slate-400 font-medium block mb-1">
            Group Order Name:
          </label>
          <input
            type="text"
            value={groupOrder.name}
            onChange={(e) => setGroupOrderName(e.target.value)}
            className="text-xl sm:text-2xl font-black bg-transparent border-b border-slate-700 focus:border-cyan-400 focus:outline-hidden pb-1 w-full text-white"
          />
          <p className="text-xs text-slate-400 mt-1">
            Share food delivery costs with your hostel roommates & study group.
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            id="copy-whatsapp-summary-btn"
            onClick={generateWhatsAppSummary}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Summary!' : 'Copy WhatsApp Bill Split'}</span>
          </button>

          <button
            id="merge-group-to-cart-btn"
            onClick={handleTransferToCart}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Checkout Group Order (₹{groupGrandTotal})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Roommates & Food Assignment */}
        <div className="lg:col-span-7 space-y-4">
          {/* Add Member Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600" />
                Squad Members ({groupOrder.members.length})
              </span>
              <span className="text-xs text-slate-400 font-normal">
                Delivery split {groupOrder.members.length} ways
              </span>
            </h3>

            {/* Member Input */}
            <form onSubmit={handleAddMember} className="flex gap-2">
              <input
                type="text"
                placeholder="Add roommate's name (e.g. Rahul, Sneha)..."
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Quick Assign Food to Member Bar */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Assign Food Item to a Friend:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <select
                  value={selectedMemberForAdd}
                  onChange={(e) => setSelectedMemberForAdd(e.target.value)}
                  className="sm:col-span-5 text-xs font-semibold p-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden"
                >
                  {groupOrder.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.avatar} {m.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedFoodId}
                  onChange={(e) => setSelectedFoodId(e.target.value)}
                  className="sm:col-span-5 text-xs font-semibold p-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden truncate"
                >
                  {FOOD_ITEMS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} (₹{f.price})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="sm:col-span-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Member Baskets Breakdown */}
          <div className="space-y-3">
            {groupOrder.members.map((member) => {
              const memberItems = groupOrder.items.filter((it) => it.memberId === member.id);
              const share = getGroupMemberShare(member.id);

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{member.avatar}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-sm text-slate-900">{member.name}</h4>
                          {member.isHost && (
                            <span className="text-[9px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.2 rounded">
                              Host
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {memberItems.length} dish{memberItems.length !== 1 ? 'es' : ''} added
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total Due</span>
                        <span className="text-base font-black text-slate-900">
                          ₹{share.totalDue}
                        </span>
                      </div>

                      {!member.isHost && (
                        <button
                          onClick={() => removeGroupMember(member.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
                          title="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Member's Dishes */}
                  {memberItems.length > 0 ? (
                    <div className="bg-slate-50 rounded-xl p-2.5 space-y-1.5 divide-y divide-slate-100">
                      {memberItems.map((item) => (
                        <div
                          key={item.id}
                          className="pt-1.5 first:pt-0 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="font-bold text-slate-800">{item.quantity}x</span>
                            <span className="text-slate-700 truncate">{item.foodItem.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-semibold text-slate-900">
                              ₹{item.foodItem.price * item.quantity}
                            </span>
                            <button
                              onClick={() => removeGroupOrderItem(item.id)}
                              className="text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Split Delivery Line */}
                      <div className="pt-2 flex justify-between text-[11px] text-slate-500 italic">
                        <span>+ Shared Runner & Delivery Split:</span>
                        <span>₹{share.splitDelivery + share.splitPlatform}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 py-1 italic">
                      No items assigned to {member.name} yet. Use the selector above to add food.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Group Bill Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-cyan-600" />
                Group Bill Summary
              </h3>
              <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">
                {groupOrder.members.length} People Split
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Group Food Total:</span>
                <span className="font-bold text-slate-900">₹{groupItemsSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Campus Delivery Fee:</span>
                <span className="font-semibold text-slate-900">₹{groupDeliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Student Runner Fee:</span>
                <span className="font-semibold text-slate-900">₹{groupPlatformFee}</span>
              </div>
            </div>

            {/* Person-by-Person Share Recap */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Calculated Individual Shares:
              </span>
              {groupOrder.members.map((m) => {
                const share = getGroupMemberShare(m.id);
                return (
                  <div key={m.id} className="flex justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                    <span className="text-slate-700 font-medium">
                      {m.avatar} {m.name}
                    </span>
                    <span className="font-bold text-slate-900">₹{share.totalDue}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <span className="font-black text-sm text-slate-900">Total Group Amount:</span>
              <span className="text-2xl font-black text-slate-900">₹{groupGrandTotal}</span>
            </div>

            <button
              id="group-checkout-action-btn"
              onClick={handleTransferToCart}
              className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-black text-sm shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Transfer to Cart & Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
