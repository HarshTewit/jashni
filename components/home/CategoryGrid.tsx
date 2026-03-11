'use client';

import Link from 'next/link';

// Category data with placeholder colors
const categories = [
  { name: 'Bags', slug: 'bags', color: '#C4714A' },
  { name: 'Tops & Cardigans', slug: 'tops-cardigans', color: '#7D9B76' },
  { name: 'Jewellery', slug: 'jewellery', color: '#9B4F2E' },
  { name: 'Home Decor', slug: 'home-decor', color: '#B5CEAF' },
  { name: 'Gift Sets', slug: 'gift-sets', color: '#E8A882' },
  { name: 'New Arrivals', slug: 'new-arrivals', color: '#6B5C4E' },
];

export default function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4">
      {/* Section Heading */}
      <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-[32px] text-center text-text-primary mb-10 md:mb-12 lg:mb-16">
        Shop by Category
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-4 max-w-7xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden rounded-[12px] cursor-pointer">
              {/* Placeholder Image */}
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105"
                style={{ backgroundColor: category.color }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ease-out group-hover:via-black/70 group-hover:to-black/30" />

              {/* Category Name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <span className="text-white font-[family-name:var(--font-body)] text-sm md:text-base font-medium text-center block">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}