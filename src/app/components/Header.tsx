import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, LogOut, Settings, UserCircle } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
  cartItemCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export function Header({
  user,
  onLogout,
  onNavigate,
  cartItemCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onSearchSubmit
}: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 shrink-0"
          >
            <div 
              className="px-6 py-2 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #375201 0%, #F08427 100%)'
              }}
            >
              <h1 className="text-white font-bold text-xl">ShopHub</h1>
            </div>
          </button>

          {/* Search Bar */}
          {user && (
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full px-4 py-2 border-2 rounded-lg transition-colors bg-white"
                    style={{
                      borderColor: isFocused ? '#3b82f6' : '#d1d5db',
                      color: '#000000'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-lg transition-all hover:opacity-90"
                  style={{ backgroundColor: '#375201' }}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Wishlist */}
                <button
                  onClick={() => onNavigate('wishlist')}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Heart className="w-6 h-6" style={{ color: '#375201' }} />
                  {wishlistCount > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F08427' }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  onClick={() => onNavigate('cart')}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" style={{ color: '#375201' }} />
                  {cartItemCount > 0 && (
                    <span 
                      className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F08427' }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User className="w-6 h-6" style={{ color: '#375201' }} />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onNavigate('profile');
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors"
                      >
                        <UserCircle className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">View Profile</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onNavigate('orders');
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">My Orders</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onNavigate('settings');
                        }}
                        className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Settings</span>
                      </button>
                      
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            onLogout();
                          }}
                          className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-5 h-5 text-red-600" />
                          <span className="text-red-600">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-2 text-white rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#375201' }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
