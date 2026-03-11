'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore, CartItem } from '@/lib/store';

// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 499;

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeCart]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const cartTotal = total();
  const totalItems = itemCount();
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const isEligibleForFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;

  // Format price in INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[70] bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-surface shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="font-display text-xl text-text-primary">
            Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-text-secondary hover:bg-surface-warm hover:text-text-primary transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex h-[calc(100%-72px)] flex-col items-center justify-center px-4">
            <div className="mb-4 text-6xl">🧶</div>
            <h3 className="mb-2 font-display text-2xl text-text-primary">
              Your cart is empty
            </h3>
            <p className="mb-6 text-center text-text-secondary">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex h-[calc(100%-280px)] flex-col overflow-y-auto px-4 py-4">
              {items.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-border py-4 first:pt-0 last:border-0"
                >
                  {/* Product Image */}
                  <div className="relative h-20 w-15 flex-shrink-0 overflow-hidden rounded-md bg-surface-warm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={closeCart}
                        className="font-medium text-text-primary hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 text-text-muted hover:text-error transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <span className="font-medium text-text-primary">
                        {formatPrice(item.price)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 rounded-full border border-border bg-surface-warm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:bg-surface hover:text-primary transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        </button>
                        <span className="min-w-[24px] text-center text-sm font-medium text-text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:bg-surface hover:text-primary transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Section */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface px-4 py-4">
              {/* Free Shipping Progress */}
              <div className="mb-4">
                {isEligibleForFreeShipping ? (
                  <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2">
                    <span className="text-success">🎉</span>
                    <span className="text-sm font-medium text-success">
                      You&apos;re eligible for free shipping!
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="mb-2 text-sm text-text-secondary">
                      You&apos;re {formatPrice(amountUntilFreeShipping)} away from free
                      shipping!
                    </p>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-warm">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (cartTotal / FREE_SHIPPING_THRESHOLD) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Subtotal */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-display text-xl text-text-primary">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Proceed to Checkout
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              {/* Continue Shopping */}
              <div className="mt-3 text-center">
                <button
                  onClick={closeCart}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}