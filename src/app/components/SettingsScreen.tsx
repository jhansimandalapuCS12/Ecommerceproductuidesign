import { Bell, Lock, CreditCard, Globe, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function SettingsScreen() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    promotions: false
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#375201' }}>
          Settings
        </h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6" style={{ color: '#375201' }} />
              <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Change Password</h3>
                <p className="text-sm text-gray-600">Update your password regularly for security</p>
              </button>

              <button className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </button>

              <button className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Connected Accounts</h3>
                <p className="text-sm text-gray-600">Link social media and other accounts</p>
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6" style={{ color: '#375201' }} />
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#375201' }}
                />
              </label>

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-600">Get instant notifications on your device</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#375201' }}
                />
              </label>

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Receive text messages for updates</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#375201' }}
                />
              </label>

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">Order Updates</h3>
                  <p className="text-sm text-gray-600">Get notified about order status changes</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.orderUpdates}
                  onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#375201' }}
                />
              </label>

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">Promotional Emails</h3>
                  <p className="text-sm text-gray-600">Receive special offers and deals</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.promotions}
                  onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#375201' }}
                />
              </label>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6" style={{ color: '#375201' }} />
              <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Saved Cards</h3>
                <p className="text-sm text-gray-600">Manage your saved payment methods</p>
              </button>

              <button className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Billing Address</h3>
                <p className="text-sm text-gray-600">Update your billing information</p>
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6" style={{ color: '#375201' }} />
              <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <div>
                    <h3 className="font-semibold text-gray-900">Dark Mode</h3>
                    <p className="text-sm text-gray-600">Toggle dark mode theme</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="w-5 h-5 rounded"
                  style={{ accentColor: '#375201' }}
                />
              </label>

              <button className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Language</h3>
                <p className="text-sm text-gray-600">English (US)</p>
              </button>

              <button className="w-full p-4 border-2 rounded-lg text-left hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Currency</h3>
                <p className="text-sm text-gray-600">USD ($)</p>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            className="w-full py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#375201' }}
          >
            Save Settings
          </button>

          {/* Danger Zone */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-900 mb-4">Danger Zone</h2>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
