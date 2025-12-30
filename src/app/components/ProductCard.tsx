import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  isInWishlist
}: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <button
          onClick={() => onViewDetails(product)}
          className="w-full"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover"
          />
        </button>
        
        {discount > 0 && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: '#F08427' }}
          >
            {discount}% OFF
          </div>
        )}

        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-red-500 text-white text-xs rounded-full">
            Only {product.stock} left!
          </div>
        )}
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

        <button
          onClick={() => onViewDetails(product)}
          className="text-left w-full"
        >
          <h3 className="font-semibold text-gray-900 mb-2 hover:underline">
            {product.name}
          </h3>
        </button>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

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

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full py-2 text-white rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: '#375201' }}
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
