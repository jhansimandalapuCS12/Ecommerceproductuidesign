import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { categories } from '../data/mockData';

interface HomeScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  wishlist: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function HomeScreen({
  products,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  wishlist,
  selectedCategory,
  onCategoryChange
}: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #375201 0%, #F08427 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to ShopHub
          </h1>
          <p className="text-xl text-white opacity-90">
            Discover amazing products at unbeatable prices
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#375201' }}>
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className="px-4 py-2 rounded-full font-medium transition-all"
                style={{
                  backgroundColor: selectedCategory === category ? '#A65303' : '#f3f4f6',
                  color: selectedCategory === category ? '#ffffff' : '#374151'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold" style={{ color: '#375201' }}>
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onViewDetails={onViewDetails}
                  isInWishlist={wishlist.includes(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
