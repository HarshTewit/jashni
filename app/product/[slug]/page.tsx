'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

// Mock product object for testing
const mockProduct = {
  id: '1',
  name: 'Floral Crochet Doily',
  price: 1200,
  originalPrice: 1500,
  images: [
    'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1607153541484-878b200638f4?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&h=800&fit=crop'
  ],
  slug: 'floral-crochet-doily',
  category: 'Home Decor',
  description: 'A beautiful handcrafted floral doily, perfect for adding a touch of elegance to your home. Each piece is meticulously made with love by skilled artisans using traditional crochet techniques.',
  rating: 4.8,
  reviewCount: 24,
  materials: '100% cotton yarn, eco-friendly dyes',
  dimensions: '12 inches diameter',
  care: 'Hand wash in cold water, lay flat to dry',
  colors: [
    { name: 'Cream', hex: '#FAF7F2' },
    { name: 'Terracotta', hex: '#C4714A' },
    { name: 'Sage', hex: '#7D9B76' }
  ],
  hasColors: true
};

// Mock related products
const relatedProducts = [
  {
    id: '2',
    name: 'Handmade Crochet Blanket',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=800&fit=crop'
    ],
    slug: 'crochet-blanket',
    category: 'Blankets'
  },
  {
    id: '3',
    name: 'Macramé Wall Hanging',
    price: 2800,
    originalPrice: 3200,
    images: [
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=600&h=800&fit=crop'
    ],
    slug: 'macrame-wall-hanging',
    category: 'Wall Art'
  },
  {
    id: '4',
    name: 'Crochet Flower Coasters',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1607153541484-878b200638f4?w=600&h=800&fit=crop'
    ],
    slug: 'crochet-flower-coasters',
    category: 'Kitchen'
  },
  {
    id: '5',
    name: 'Rustic Table Runner',
    price: 890,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop'
    ],
    slug: 'rustic-table-runner',
    category: 'Home Decor'
  }
];

// Mock reviews
const reviews = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely beautiful! The attention to detail is amazing. Looks exactly like the picture. Highly recommended!',
    avatar: 'PS'
  },
  {
    id: '2',
    name: 'Anjali Patel',
    rating: 5,
    date: '2024-01-10',
    comment: 'Great quality cotton yarn. Very soft and delicate. Perfect for my coffee table.',
    avatar: 'AP'
  },
  {
    id: '3',
    name: 'Meera Nair',
    rating: 4,
    date: '2024-01-05',
    comment: 'Lovely craftsmanship. Delivery was quick too. Will definitely buy more from Jashni!',
    avatar: 'MN'
  }
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(mockProduct.hasColors ? mockProduct.colors[0] : null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  // Use Zustand store
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  // Format price in INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    addItem({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      images: mockProduct.images,
      slug: mockProduct.slug,
    });
    openCart();
  };

  // Handle quantity change
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Toggle accordion
  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/category/${mockProduct.category.toLowerCase().replace(' ', '-')}`} className="hover:text-text-primary transition-colors">
            {mockProduct.category}
          </Link>
          <span>/</span>
          <span className="text-text-primary">{mockProduct.name}</span>
        </nav>
      </div>

      {/* Main Product Section - 2 columns on desktop */}
      <div className="mx-auto max-w-7xl px-4 pb-12 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT COLUMN - Images */}
          <div className="space-y-4">
            {/* Main Image - Aspect Ratio 4/5 */}
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-warm">
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[3/4] h-20 flex-shrink-0 overflow-hidden bg-surface-warm transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-primary'
                      : 'ring-1 ring-border hover:ring-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct.name} view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN - Product Info */}
          <div className="flex flex-col">
            {/* Product Name */}
            <h1 className="font-display text-2xl font-medium leading-tight text-text-primary md:text-[28px]">
              {mockProduct.name}
            </h1>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-body text-2xl font-medium text-primary">
                {formatPrice(mockProduct.price)}
              </span>
              {mockProduct.originalPrice && (
                <span className="text-lg text-text-muted line-through">
                  {formatPrice(mockProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Star Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= Math.floor(mockProduct.rating) ? '#C4714A' : 'none'}
                    stroke="#C4714A"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-text-secondary">
                {mockProduct.rating} · {mockProduct.reviewCount} reviews
              </span>
            </div>

            {/* Short Description */}
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              {mockProduct.description}
            </p>

            {/* Color Selector */}
            {mockProduct.hasColors && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-text-primary">
                  Color: <span className="font-normal text-text-secondary">{selectedColor?.name}</span>
                </p>
                <div className="flex gap-3">
                  {mockProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full transition-all ${
                        selectedColor?.name === color.name
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-text-primary">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="flex h-10 w-10 items-center justify-center text-text-primary transition-colors hover:bg-surface-warm disabled:opacity-50"
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="flex w-12 justify-center text-base font-medium text-text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="flex h-10 w-10 items-center justify-center text-text-primary transition-colors hover:bg-surface-warm disabled:opacity-50"
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-primary py-4 text-base font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Add to Cart
            </button>

            {/* Add to Wishlist */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="mt-3 flex items-center justify-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isWishlisted ? '#C4714A' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>

            {/* Divider */}
            <hr className="my-6 border-border" />

            {/* Accordion Sections */}
            <div className="space-y-0">
              {/* Product Details */}
              <div className="border-b border-border">
                <button
                  onClick={() => toggleAccordion('details')}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text-primary"
                >
                  <span>Product Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-text-muted transition-transform ${
                      openAccordion === 'details' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'details' && (
                  <div className="pb-4 text-sm text-text-secondary">
                    <div className="space-y-2">
                      <p><span className="font-medium">Materials:</span> {mockProduct.materials}</p>
                      <p><span className="font-medium">Dimensions:</span> {mockProduct.dimensions}</p>
                      <p><span className="font-medium">Care:</span> {mockProduct.care}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery */}
              <div className="border-b border-border">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text-primary"
                >
                  <span>Shipping & Delivery</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-text-muted transition-transform ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-sm text-text-secondary">
                    <ul className="space-y-1">
                      <li>Delivery within 3-7 business days</li>
                      <li>Free shipping on orders above ₹499</li>
                      <li>Express delivery available at extra cost</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Returns & Exchange */}
              <div className="border-b border-border">
                <button
                  onClick={() => toggleAccordion('returns')}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text-primary"
                >
                  <span>Returns & Exchange</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-text-muted transition-transform ${
                      openAccordion === 'returns' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'returns' && (
                  <div className="pb-4 text-sm text-text-secondary">
                    <ul className="space-y-1">
                      <li>7-day return policy</li>
                      <li>Easy exchanges for size/colour</li>
                      <li>100% refund if item is defective</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 rounded-lg bg-surface-warm px-4 py-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <span>🧶</span>
                <span>Handmade</span>
              </div>
              <span className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1">
                <span>♻️</span>
                <span>Sustainable</span>
              </div>
              <span className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1">
                <span>📦</span>
                <span>Free Shipping ₹499+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like - Related Products */}
      <section className="bg-surface-warm py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-2xl text-text-primary md:text-3xl">
            You May Also Like
          </h2>
          {/* Horizontal Scroll on Mobile */}
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:mx-0">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block w-56 flex-shrink-0 md:w-full"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.originalPrice && (
                    <span className="absolute left-3 top-3 bg-secondary px-2 py-1 text-xs font-medium text-white">
                      SALE
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-text-muted">
                    {product.category}
                  </p>
                  <h3 className="mt-1 font-body text-[15px] text-text-primary">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    {product.originalPrice ? (
                      <>
                        <span className="font-medium text-primary">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-text-muted line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium text-text-primary">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12" id="reviews">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-2xl text-text-primary md:text-3xl">
            Customer Reviews
          </h2>

          {/* Rating Summary */}
          <div className="mb-8 flex items-center gap-4">
            <div className="text-center">
              <div className="font-display text-4xl font-medium text-text-primary">
                {mockProduct.rating}
              </div>
              <div className="mt-1 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= Math.floor(mockProduct.rating) ? '#C4714A' : 'none'}
                    stroke="#C4714A"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
              </div>
              <p className="mt-1 text-sm text-text-muted">
                Based on {mockProduct.reviewCount} reviews
              </p>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{review.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={star <= review.rating ? '#C4714A' : 'none'}
                              stroke="#C4714A"
                              strokeWidth="1.5"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-text-muted">
                          {new Date(review.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}