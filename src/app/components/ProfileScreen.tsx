import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileScreenProps {
  user: UserType;
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ user, onNavigate }: ProfileScreenProps) {
  const stats = [
    { label: 'Total Orders', value: '12' },
    { label: 'Pending Orders', value: '2' },
    { label: 'Completed Orders', value: '10' },
    { label: 'Wishlist Items', value: '8' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#375201' }}>
          My Profile
        </h1>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white"
              style={{
                background: 'linear-gradient(135deg, #375201 0%, #F08427 100%)'
              }}
            >
              <User className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600">Member since December 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{user.phone || '+1 234 567 8900'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">New York, USA</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">December 2024</p>
              </div>
            </div>
          </div>

          <button
            className="mt-6 px-6 py-2 border-2 rounded-lg font-medium transition-all hover:bg-gray-50"
            style={{ borderColor: '#375201', color: '#375201' }}
          >
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <p className="text-3xl font-bold mb-2" style={{ color: '#375201' }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#375201' }}>
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('orders')}
              className="p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#e5e7eb' }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">My Orders</h3>
              <p className="text-sm text-gray-600">Track and manage your orders</p>
            </button>

            <button
              onClick={() => onNavigate('wishlist')}
              className="p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#e5e7eb' }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">Wishlist</h3>
              <p className="text-sm text-gray-600">View your saved items</p>
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className="p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#e5e7eb' }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
              <p className="text-sm text-gray-600">Manage your preferences</p>
            </button>

            <button
              className="p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#e5e7eb' }}
            >
              <h3 className="font-semibold text-gray-900 mb-1">Addresses</h3>
              <p className="text-sm text-gray-600">Manage shipping addresses</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
