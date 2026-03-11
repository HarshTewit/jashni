import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductGrid from '@/components/product/ProductGrid';

// Sample products for testing
const sampleProducts = [
  {
    id: '1',
    name: 'Floral Crochet Doily',
    price: 1200,
    originalPrice: 1500,
    images: [
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop'
    ],
    slug: 'floral-crochet-doily',
    isNew: true,
    category: 'Home Decor'
  },
  {
    id: '2',
    name: 'Handmade Crochet Blanket',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&h=800&fit=crop'
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
      'https://images.unsplash.com/photo-1622205313162-be1d5712a43f?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=800&fit=crop'
    ],
    slug: 'macrame-wall-hanging',
    category: 'Wall Art'
  },
  {
    id: '4',
    name: 'Crochet Flower Coasters (Set of 6)',
    price: 450,
    images: [
      'https://images.unsplash.com/photo-1607153541484-878b200638f4?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&h=800&fit=crop'
    ],
    slug: 'crochet-flower-coasters',
    isNew: true,
    category: 'Kitchen'
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-display text-3xl text-text-primary">
          Featured Products
        </h2>
        <ProductGrid products={sampleProducts} />
      </section>
    </>
  );
}