'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store';

// Shop categories for mega menu
const shopCategories = [
  { name: 'Bags', slug: 'bags', image: '/images/categories/bags.jpg' },
  { name: 'Tops', slug: 'tops', image: '/images/categories/tops.jpg' },
  { name: 'Jewellery', slug: 'jewellery', image: '/images/categories/jewellery.jpg' },
  { name: 'Home Decor', slug: 'home-decor', image: '/images/categories/home-decor.jpg' },
  { name: 'Gift Sets', slug: 'gift-sets', image: '/images/categories/gift-sets.jpg' },
];

// Nav links configuration
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop', hasDropdown: true },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const { items, openCart } = useCartStore();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        } bg-surface border-b border-border`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-2xl md:text-[28px] text-text-primary tracking-wide"
            >
              Jashni
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setIsShopDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIsShopDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary transition-colors py-2 inline-flex items-center gap-1 text-[15px] font-medium"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isShopDropdownOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {link.hasDropdown && isShopDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="bg-surface rounded-lg shadow-xl border border-border p-6 min-w-[600px]">
                        <div className="grid grid-cols-5 gap-4">
                          {shopCategories.map((category) => (
                            <Link
                              key={category.slug}
                              href={`/shop/${category.slug}`}
                              className="group"
                            >
                              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-surface-warm mb-2">
                                <div className="w-full h-full bg-secondary-light/30 group-hover:bg-secondary-light/50 transition-colors flex items-center justify-center">
                                  <span className="text-secondary text-xs">
                                    {category.name[0]}
                                  </span>
                                </div>
                              </div>
                              <p className="text-center text-sm text-text-secondary group-hover:text-primary transition-colors font-medium">
                                {category.name}
                              </p>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-border text-center">
                          <Link
                            href="/shop"
                            className="text-sm text-primary hover:text-primary-dark transition-colors font-medium"
                          >
                            View All Products →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Search Button */}
              <button
                className="text-text-secondary hover:text-primary transition-colors p-1"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Wishlist Button */}
              <button
                className="text-text-secondary hover:text-primary transition-colors p-1 hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="text-text-secondary hover:text-primary transition-colors p-1 relative"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-text-secondary hover:text-primary transition-colors p-1 lg:hidden"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-surface shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link
              href="/"
              className="font-display text-xl text-text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jashni
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-secondary hover:text-primary transition-colors p-1"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="p-4">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-border">
                <Link
                  href={link.href}
                  className="block py-4 text-lg text-text-primary hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>

                {/* Mobile Shop Submenu */}
                {link.hasDropdown && (
                  <div className="pb-4">
                    <div className="grid grid-cols-2 gap-3 pl-2">
                      {shopCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/shop/${category.slug}`}
                          className="text-sm text-text-secondary hover:text-primary transition-colors py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/shop"
                      className="block mt-3 pl-2 text-sm text-primary font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All →
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Additional Links */}
            <div className="pt-4">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 py-3 text-text-secondary hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
                Wishlist
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}