import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { toast } from 'sonner';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartScreen({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onContinueShopping
}: CartScreenProps) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleRemoveItem = (productId: string, productName: string) => {
    onRemoveItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={onContinueShopping}
              className="px-8 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#375201' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#375201' }}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex gap-6">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      {item.product.category}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 border-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ borderColor: '#375201' }}
                        >
                          <Minus className="w-4 h-4" style={{ color: '#375201' }} />
                        </button>
                        <span className="text-lg font-semibold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="p-2 border-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ borderColor: '#375201' }}
                        >
                          <Plus className="w-4 h-4" style={{ color: '#375201' }} />
                        </button>
                      </div>

                      <span className="text-xl font-bold" style={{ color: '#375201' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6" style={{ color: '#375201' }}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold" style={{ color: '#375201' }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    Add ${(100 - subtotal).toFixed(2)} more to get FREE shipping!
                  </p>
                </div>
              )}

              <button
                onClick={onCheckout}
                className="w-full py-3 text-white rounded-lg font-medium transition-all hover:opacity-90 mb-3"
                style={{ backgroundColor: '#375201' }}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={onContinueShopping}
                className="w-full py-3 border-2 rounded-lg font-medium transition-all hover:bg-gray-50"
                style={{ borderColor: '#375201', color: '#375201' }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
