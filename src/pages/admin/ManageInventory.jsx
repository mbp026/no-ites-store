import { useState, useEffect } from 'react';
import { getAllProductsAdmin, updateInventory } from '../../services/products';
import Button from '../../components/ui/Button';

export default function ManageInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changes, setChanges] = useState({});

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getAllProductsAdmin();
      setProducts(allProducts);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const handleQuantityChange = (productId, variant, newQuantity) => {
    const qty = Math.max(0, parseInt(newQuantity) || 0);
    setChanges(prev => ({
      ...prev,
      [`${productId}-${variant}`]: qty
    }));
  };

  const getCurrentQuantity = (product, variant) => {
    const key = `${product.id}-${variant}`;
    if (key in changes) {
      return changes[key];
    }
    return product.inventory?.[variant] || 0;
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // Group changes by product
      const productChanges = {};
      for (const [key, qty] of Object.entries(changes)) {
        const [productId, ...variantParts] = key.split('-');
        const variant = variantParts.join('-'); // Rejoin in case variant has hyphens

        if (!productChanges[productId]) {
          // Get the product's current inventory
          const product = products.find(p => p.id === productId);
          productChanges[productId] = { ...product.inventory };
        }
        productChanges[productId][variant] = qty;
      }

      // Update each product's inventory
      for (const [productId, inventory] of Object.entries(productChanges)) {
        await updateInventory(productId, inventory);
      }

      // Update local state
      setProducts(products.map(product => {
        if (productChanges[product.id]) {
          return { ...product, inventory: productChanges[product.id] };
        }
        return product;
      }));

      setChanges({});
      alert('Inventory updated successfully!');
    } catch (err) {
      console.error('Failed to save inventory:', err);
      alert('Failed to save inventory. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = Object.keys(changes).length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        {hasChanges && (
          <Button onClick={handleSave} loading={saving}>
            Save Changes ({Object.keys(changes).length})
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 object-cover"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {product.sizes.flatMap(size =>
                  product.colors.map(color => {
                    const variant = `${size}-${color.name}`;
                    const quantity = getCurrentQuantity(product, variant);
                    const hasChange = `${product.id}-${variant}` in changes;

                    return (
                      <div key={variant} className="text-center">
                        <label className="block text-xs text-gray-500 mb-1">
                          {size} / {color.name}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(product.id, variant, e.target.value)}
                          className={`w-full px-3 py-2 text-center border ${
                            quantity === 0
                              ? 'border-red-300 bg-red-50'
                              : quantity <= 5
                                ? 'border-yellow-300 bg-yellow-50'
                                : hasChange
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-300'
                          } focus:outline-none focus:border-black`}
                        />
                        {quantity === 0 && (
                          <span className="text-xs text-red-600">Out of stock</span>
                        )}
                        {quantity > 0 && quantity <= 5 && (
                          <span className="text-xs text-yellow-600">Low stock</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Save Button */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={handleSave} loading={saving} size="lg">
            Save Changes ({Object.keys(changes).length})
          </Button>
        </div>
      )}
    </div>
  );
}
