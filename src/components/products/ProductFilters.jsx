import { getCategories } from '../../services/products';

export default function ProductFilters({ filters, onChange }) {
  const categories = getCategories();

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gray', hex: '#6B7280' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Name' },
  ];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={!filters.category}
              onChange={(e) => onChange({ ...filters, category: e.target.value })}
              className="mr-2"
            />
            <span className="text-sm">All Products</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.id}
                checked={filters.category === cat.id}
                onChange={(e) => onChange({ ...filters, category: e.target.value })}
                className="mr-2"
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                const newSizes = filters.sizes?.includes(size)
                  ? filters.sizes.filter(s => s !== size)
                  : [...(filters.sizes || []), size];
                onChange({ ...filters, sizes: newSizes });
              }}
              className={`px-3 py-1 text-sm border ${
                filters.sizes?.includes(size)
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => {
                const newColors = filters.colors?.includes(color.name)
                  ? filters.colors.filter(c => c !== color.name)
                  : [...(filters.colors || []), color.name];
                onChange({ ...filters, colors: newColors });
              }}
              className={`w-8 h-8 rounded-full border-2 ${
                filters.colors?.includes(color.name)
                  ? 'ring-2 ring-black ring-offset-2'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Sort By</h3>
        <select
          value={filters.sort || 'newest'}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {(filters.category || filters.sizes?.length || filters.colors?.length) && (
        <button
          onClick={() => onChange({ sort: filters.sort })}
          className="text-sm text-gray-600 underline hover:text-black"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
