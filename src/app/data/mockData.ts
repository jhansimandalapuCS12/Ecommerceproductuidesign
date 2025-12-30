import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Laptop Pro',
    description: 'High-performance laptop with 16GB RAM, 512GB SSD, and stunning display',
    price: 1299.99,
    originalPrice: 1499.99,
    image: 'https://images.unsplash.com/photo-1763162410742-1d0097cea556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJvbmljcyUyMGxhcHRvcHxlbnwxfHx8fDE3NjcwNzkxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Electronics',
    stock: 15,
    rating: 4.5,
    reviews: 234
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzY3MDY5MDU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Audio',
    stock: 42,
    rating: 4.8,
    reviews: 567
  },
  {
    id: '3',
    name: 'Smartphone X Pro',
    description: '5G smartphone with 128GB storage, triple camera, and AMOLED display',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2Njk4NzI5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mobile',
    stock: 28,
    rating: 4.6,
    reviews: 892
  },
  {
    id: '4',
    name: 'Smart Watch Series 5',
    description: 'Fitness tracker with heart rate monitor, GPS, and water resistance',
    price: 399.99,
    originalPrice: 449.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNofGVufDF8fHx8MTc2NzAwNjgyOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Wearables',
    stock: 67,
    rating: 4.4,
    reviews: 423
  },
  {
    id: '5',
    name: 'Professional Camera',
    description: '24MP DSLR camera with 18-55mm lens, perfect for photography enthusiasts',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1579535984712-92fffbbaa266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjcwMTg3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cameras',
    stock: 12,
    rating: 4.9,
    reviews: 156
  },
  {
    id: '6',
    name: 'Tablet Pro 11"',
    description: 'Powerful tablet with stylus support, perfect for work and creativity',
    price: 799.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjcwNzAyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tablets',
    stock: 34,
    rating: 4.7,
    reviews: 345
  }
];

export const categories = [
  'All',
  'Electronics',
  'Audio',
  'Mobile',
  'Wearables',
  'Cameras',
  'Tablets'
];
