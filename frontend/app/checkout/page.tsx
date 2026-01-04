// Checkout Page - Thoughtful Purchase Ritual
// Inspired by Wabi-Sabi: simplicity, calm, and trust

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();

  /* -------------------- FORM STATE -------------------- */
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    shippingMethod: 'standard',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* -------------------- PRICE CALCULATION -------------------- */
  const subtotal = getCartTotal();
  const shipping = subtotal >= 3000 ? 0 : 100;
  const gst = Math.round((subtotal + shipping) * 0.18);
  const total = subtotal + shipping + gst;

  /* -------------------- VALIDATION -------------------- */
  const isFormValid =
    formData.email.trim() &&
    /^[6-9][0-9]{9}$/.test(formData.phone) &&
    formData.fullName.trim() &&
    formData.addressLine.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    /^[1-9][0-9]{5}$/.test(formData.pincode);

  /* -------------------- HANDLERS -------------------- */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setFormError(
        'Please fill all required delivery details correctly so your order reaches you safely.'
      );
      return;
    }

    setIsSubmitting(true);

    // Razorpay integration will be added here
    alert('Order validated. Razorpay integration pending.');

    setIsSubmitting(false);
  };

  /* -------------------- EMPTY CART -------------------- */
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-[#563a13] mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/shop"
            className="bg-[#563a13] text-white px-8 py-3 rounded-sm"
          >
            Browse Collection
          </Link>
        </div>
      </main>
    );
  }

  /* -------------------- MAIN PAGE -------------------- */
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-10">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* LEFT SECTION */}
          <div className="lg:col-span-3 space-y-10">

            {/* CONTACT */}
            <section>
              <h2 className="text-xl font-serif text-[#563a13] mb-4">
                Contact Information
              </h2>

              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full mb-4 px-4 py-3 border rounded-sm"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border rounded-sm"
              />
            </section>

            {/* ADDRESS */}
            <section>
              <h2 className="text-xl font-serif text-[#563a13] mb-4">
                Shipping Address
              </h2>

              <input
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full mb-4 px-4 py-3 border rounded-sm"
              />

              <input
                name="addressLine"
                placeholder="Address"
                value={formData.addressLine}
                onChange={handleInputChange}
                required
                className="w-full mb-4 px-4 py-3 border rounded-sm"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-sm"
                />

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-sm"
                >
                  <option value="">Select State</option>
                  <option>Gujarat</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-3 border rounded-sm"
                />

                <input
                  name="country"
                  value="India"
                  readOnly
                  className="px-4 py-3 border rounded-sm bg-gray-100"
                />
              </div>
            </section>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-sm border sticky top-20">

              <h2 className="text-xl font-serif text-[#563a13] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.code}`}
                    className="flex gap-4"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={60}
                      height={60}
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty {item.quantity}
                      </p>
                      <p className="text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>{formatPrice(gst)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-medium mt-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {formError && (
                <p className="text-sm text-red-600 mt-4">{formError}</p>
              )}

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full mt-6 py-4 rounded-sm text-white transition
                  ${
                    isFormValid
                      ? 'bg-[#563a13] hover:bg-[#652810]'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                {isSubmitting ? 'Processing…' : 'Place Order'}
              </button>

              <Link
                href="/cart"
                className="block text-center mt-4 text-sm text-gray-600"
              >
                ← Return to Cart
              </Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
