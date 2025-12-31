// Shop Page - Main Product Listing

'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { ProductFilter } from '@/components/shop/ProductFilter';
import { Section } from '@/components/shared/Section';

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') {
      return products;
    }
    return products.filter(product => product.category === activeFilter);
  }, [activeFilter]);

  // Count products in each category
  const filterOptions = [
    { 
      label: 'All Products', 
      value: 'all',
      count: products.length
    },
    { 
      label: 'Tableware', 
      value: 'tableware',
      count: products.filter(p => p.category === 'tableware').length
    },
    { 
      label: 'Decor', 
      value: 'decor',
      count: products.filter(p => p.category === 'decor').length
    },
    { 
      label: 'Custom', 
      value: 'custom',
      count: products.filter(p => p.category === 'custom').length
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative py-20 md:py-28 bg-[url('/Images/products/19.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#3b3415]/70"></div>

      <div className="relative text-center max-w-3xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#] mb-6">
      Shop Collection
     </h1>
    <p className="text-lg md:text-xl text-[#ffffff] leading-relaxed">
      Handcrafted pieces for mindful living. Each item is thoughtfully created
      in our studio, inspired by Japanese aesthetics and the philosophy of
      wabi-sabi.
    </p>
    </div>
    </Section>



      {/* Products Section */}
      <Section>
        {/* "Looking for Something Unique" Banner */}
        <div className="bg-linear-to-r from-[#4A5F55] to-[#5A7C6A] text-white rounded-lg p-8 md:p-12 mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">
            Looking for Something Unique?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            We create custom pottery pieces tailored to your vision. From personalized dinnerware sets 
            to bespoke gifts, let's create something special together.
          </p>
          <button className="bg-white text-[#4A5F55] px-8 py-3 rounded-sm font-medium hover:bg-[#FAF8F5] transition-colors">
            Request Custom Order
          </button>
        </div>

        {/* Filter Tabs */}
        <ProductFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filters={filterOptions}
        />

        {/* Product Grid */}
        <ProductGrid 
          products={filteredProducts}
          emptyMessage="No products found in this category."
        />
      </Section>

      {/* Additional Info Section */}
      <Section bgColor="bg-[#F5F5DC]">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">Food-Safe Certified</h3>
            <p className="text-sm text-[#666]">
              All our pottery is made with food-safe, certified materials suitable for everyday use.
            </p>
          </div>

          <div className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">7-Day Returns</h3>
            <p className="text-sm text-[#666]">
              Not satisfied? Return within 7 days for a full refund. Your satisfaction is our priority.
            </p>
          </div>

          <div className="p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#8B6F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">Free Shipping</h3>
            <p className="text-sm text-[#666]">
              Enjoy free shipping on all orders over ₹3000. Carefully packaged for safe delivery.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}