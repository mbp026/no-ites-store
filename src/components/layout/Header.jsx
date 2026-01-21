import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import SearchBar from '../search/SearchBar';
import CartDrawer from '../cart/CartDrawer';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Shop All', href: '/shop' },
    { name: 'Hoodies', href: '/shop?category=hoodies' },
    { name: 'Pull Overs', href: '/shop?category=pullovers' },
    { name: 'T-Shirts', href: '/shop?category=tshirts' },
    { name: 'Hats', href: '/shop?category=hats' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        Free shipping on orders over $75 | United, not divided
      </div>

      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-bold tracking-tight">no manner of -ites</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="p-2 hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-base font-medium text-gray-700 hover:text-black transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search overlay */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cart drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
