import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { getAllProducts, getProductsByCategory, searchProducts, getCategories } from '../services/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = getCategories();

  // Get filters from URL
  const filters = {
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sizes: searchParams.get('sizes')?.split(',').filter(Boolean) || [],
    colors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
    sort: searchParams.get('sort') || 'newest',
  };

  // Update URL when filters change
  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.sizes?.length) params.set('sizes', newFilters.sizes.join(','));
    if (newFilters.colors?.length) params.set('colors', newFilters.colors.join(','));
    if (newFilters.sort && newFilters.sort !== 'newest') params.set('sort', newFilters.sort);
    setSearchParams(params);
  };

  // Load and filter products
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      let result;
      if (filters.search) {
        result = await searchProducts(filters.search);
      } else if (filters.category) {
        result = await getProductsByCategory(filters.category);
      } else {
        result = await getAllProducts();
      }

      // Client-side filtering for sizes and colors
      if (filters.sizes?.length) {
        result = result.filter(p =>
          p.sizes.some(size => filters.sizes.includes(size))
        );
      }

      if (filters.colors?.length) {
        result = result.filter(p =>
          p.colors.some(color => filters.colors.includes(color.name))
        );
      }

      // Sorting
      switch (filters.sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          // 'newest' - keep original order (would be by createdAt in real app)
          break;
      }

      setProducts(result);
      setLoading(false);
    }

    loadProducts();
  }, [filters.category, filters.search, filters.sizes?.join(','), filters.colors?.join(','), filters.sort]);

  const currentCategory = categories.find(c => c.id === filters.category);

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {filters.search
            ? `Search results for "${filters.search}"`
            : currentCategory
              ? currentCategory.name
              : 'All Products'}
        </h1>
        {currentCategory && (
          <p className="text-gray-600 mt-2">{currentCategory.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-black transition-colors"
        >
          <FunnelIcon className="h-5 w-5" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters filters={filters} onChange={handleFilterChange} />
        </aside>

        {/* Mobile Filters Overlay */}
        {mobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileFiltersOpen(false)}>
            <div
              className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <ProductFilters filters={filters} onChange={handleFilterChange} />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
