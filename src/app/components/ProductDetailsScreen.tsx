import { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw } from 'lucide-react';
import { Product, Review } from '../types';
import { toast } from 'sonner';

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductDetailsScreen({
  product,
  onBack,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}: ProductDetailsScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const mockReviews: Review[] = [
    {
      id: '1',
      productId: product.id,
      userId: '1',
      userName: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent product! Exceeded my expectations. Highly recommended.',
      date: '2024-12-15'
    },
    {
      id: '2',
      productId: product.id,
      userId: '2',
      userName: 'Mike Chen',
      rating: 4,
      comment: 'Great quality and fast shipping. Would buy again.',
      date: '2024-12-10'
    }
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
  };

  const handleToggleWishlist = () => {
    onToggleWishlist(product);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#375201' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-4">
              <span 
                className="text-sm px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: '#A65303' }}
              >
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold" style={{ color: '#375201' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span 
                    className="px-2 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: '#F08427' }}
                  >
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Stock: {product.stock > 0 ? (
                  <span className="text-green-600">{product.stock} available</span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border-2 rounded-lg hover:bg-gray-50"
                  style={{ borderColor: '#375201' }}
                >
                  <Minus className="w-5 h-5" style={{ color: '#375201' }} />
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="p-2 border-2 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  style={{ borderColor: '#375201' }}
                >
                  <Plus className="w-5 h-5" style={{ color: '#375201' }} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: '#375201' }}
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleToggleWishlist}
                className="px-4 py-3 border-2 rounded-lg hover:bg-gray-50 transition-colors"
                style={{ borderColor: '#375201' }}
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`}
                  style={{ color: isInWishlist ? undefined : '#375201' }}
                />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2" style={{ color: '#375201' }} />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2" style={{ color: '#375201' }} />
                <p className="text-xs text-gray-600">1 Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2" style={{ color: '#375201' }} />
                <p className="text-xs text-gray-600">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex gap-6 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 font-medium transition-colors ${
                activeTab === 'description' ? 'border-b-2' : ''
              }`}
              style={{
                borderColor: activeTab === 'description' ? '#375201' : 'transparent',
                color: activeTab === 'description' ? '#375201' : '#6b7280'
              }}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 font-medium transition-colors ${
                activeTab === 'reviews' ? 'border-b-2' : ''
              }`}
              style={{
                borderColor: activeTab === 'reviews' ? '#375201' : 'transparent',
                color: activeTab === 'reviews' ? '#375201' : '#6b7280'
              }}
            >
              Reviews ({mockReviews.length})
            </button>
          </div>

          {activeTab === 'description' ? (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                This premium product is designed with the latest technology and highest quality materials. 
                Perfect for both professional and personal use, it combines functionality with style.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
