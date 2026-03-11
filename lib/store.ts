import { create } from 'zustand';

// Cart item type with all required fields
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

// Product type for adding items to cart
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug: string;
}

interface CartStore {
  // State
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed values (as functions)
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  // Initial state
  items: [],
  isOpen: false,

  // Add item to cart - handles both new and existing items
  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Increment quantity if item already exists
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // Add new item to cart
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            slug: product.slug,
          },
        ],
      };
    });
  },

  // Remove item from cart
  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // Update quantity of an item
  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  // Clear all items from cart
  clearCart: () => set({ items: [] }),

  // Toggle cart drawer visibility
  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),

  // Open cart drawer
  openCart: () => set({ isOpen: true }),

  // Close cart drawer
  closeCart: () => set({ isOpen: false }),

  // Calculate total price
  total: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  // Calculate total item count
  itemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));