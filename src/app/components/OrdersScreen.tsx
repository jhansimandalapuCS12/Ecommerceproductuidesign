import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Order } from '../types';

interface OrdersScreenProps {
  orders: Order[];
}

export function OrdersScreen({ orders }: OrdersScreenProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'processing':
        return '#3b82f6';
      case 'shipped':
        return '#8b5cf6';
      case 'delivered':
        return '#10b981';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#375201' }}>
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Order Header */}
              <div 
                className="px-6 py-4 flex items-center justify-between"
                style={{
                  background: 'linear-gradient(135deg, #375201 0%, #F08427 100%)'
                }}
              >
                <div>
                  <p className="text-white font-semibold">Order #{order.id}</p>
                  <p className="text-white text-sm opacity-90">Placed on {order.date}</p>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {getStatusIcon(order.status)}
                  <span className="font-semibold capitalize">{order.status}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        <p className="font-semibold" style={{ color: '#375201' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                    <p className="text-gray-900">{order.shippingAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="text-gray-900">{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Order Total */}
                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold" style={{ color: '#375201' }}>
                    ${order.total.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  <button
                    className="flex-1 py-2 text-white rounded-lg font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#375201' }}
                  >
                    Track Order
                  </button>
                  <button
                    className="flex-1 py-2 border-2 rounded-lg font-medium transition-all hover:bg-gray-50"
                    style={{ borderColor: '#375201', color: '#375201' }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
