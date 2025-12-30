import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProductDetailsScreen } from './components/ProductDetailsScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { User, Product, CartItem, Order } from './types';
import { mockProducts } from './data/mockData';

type Screen = 
  | 'login' 
  | 'signup' 
  | 'forgot-password' 
  | 'home' 
  | 'product-details' 
  | 'cart' 
  | 'checkout' 
  | 'wishlist' 
  | 'profile' 
  | 'orders' 
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory]);

  const handleLogin = (email: string, password: string) => {
    // Mock login - accept any credentials for demo
    const newUser: User = {
      id: '1',
      name: 'Demo User',
      email: email,
      phone: '+1 234 567 8900'
    };
    setUser(newUser);
    setCurrentScreen('home');
  };

  const handleSignup = (name: string, email: string, password: string, phone: string) => {
    const newUser: User = {
      id: '1',
      name: name,
      email: email,
      phone: phone
    };
    setUser(newUser);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setWishlist([]);
    setOrders([]);
    setCurrentScreen('login');
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-details');
  };

  const handlePlaceOrder = (orderDetails: any) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: orderDetails.total,
      status: 'pending',
      shippingAddress: orderDetails.shippingAddress,
      paymentMethod: orderDetails.paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
  };

  const handleSearchSubmit = () => {
    if (currentScreen !== 'home') {
      setCurrentScreen('home');
    }
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const wishlistProducts = mockProducts.filter(p => wishlist.includes(p.id));
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />

      {user && (
        <Header
          user={user}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
          cartItemCount={cartItemCount}
          wishlistCount={wishlist.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
        />
      )}

      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'signup' && (
        <SignupScreen onSignup={handleSignup} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'forgot-password' && (
        <ForgotPasswordScreen onNavigate={handleNavigate} />
      )}

      {currentScreen === 'home' && user && (
        <HomeScreen
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onViewDetails={handleViewDetails}
          wishlist={wishlist}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {currentScreen === 'product-details' && selectedProduct && (
        <ProductDetailsScreen
          product={selectedProduct}
          onBack={() => setCurrentScreen('home')}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlist.includes(selectedProduct.id)}
        />
      )}

      {currentScreen === 'cart' && (
        <CartScreen
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={() => setCurrentScreen('checkout')}
          onContinueShopping={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'checkout' && user && (
        <CheckoutScreen
          cartItems={cartItems}
          onBack={() => setCurrentScreen('cart')}
          onPlaceOrder={handlePlaceOrder}
          userEmail={user.email}
        />
      )}

      {currentScreen === 'wishlist' && (
        <WishlistScreen
          wishlistProducts={wishlistProducts}
          onRemoveFromWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onContinueShopping={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'profile' && user && (
        <ProfileScreen user={user} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'orders' && (
        <OrdersScreen orders={orders} />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen />
      )}
    </div>
  );
}
