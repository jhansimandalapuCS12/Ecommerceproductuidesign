import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { toast } from 'sonner';

interface WishlistScreenProps {
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onContinueShopping: () => void;
}

export function WishlistScreen({
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onContinueShopping
}: WishlistScreenProps) {
  const handleRemove = (product: Product) => {
    onRemoveFromWishlist(product);
    toast.success(`${product.name} removed from wishlist`);
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Heart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Save your favorite items to your wishlist for easy access later.
            </p>
            <button
              onClick={onContinueShopping}
              className="px-8 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#375201' }}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#375201' }}>
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <button
                  onClick={() => handleRemove(product)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span 
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: '#A65303' }}
                  >
                    {product.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold" style={{ color: '#375201' }}>
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 py-2 text-white rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#375201' }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>

                {product.stock < 10 && product.stock > 0 && (
                  <p className="mt-2 text-xs text-red-600 text-center">
                    Only {product.stock} left in stock!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
