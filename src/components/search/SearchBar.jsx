import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchProducts } from '../../services/products';

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        const searchResults = await searchProducts(query);
        setResults(searchResults.slice(0, 5));
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
      setQuery('');
    }
  };

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl mx-auto mt-20 rounded-none shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-12 py-4 text-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </form>

        {/* Results */}
        {(results.length > 0 || loading) && (
          <div className="border-t border-gray-200">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : (
              <ul>
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      onClick={() => handleProductClick(product.slug)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      </div>
                    </button>
                  </li>
                ))}
                {query.trim() && (
                  <li>
                    <button
                      onClick={handleSubmit}
                      className="w-full p-4 text-center text-sm text-gray-600 hover:bg-gray-50 border-t border-gray-100"
                    >
                      View all results for "{query}"
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
