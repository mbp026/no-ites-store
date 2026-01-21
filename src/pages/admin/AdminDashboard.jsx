import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CubeIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { getAllProductsAdmin } from '../../services/products';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const allProducts = await getAllProductsAdmin();
      setProducts(allProducts);
      setLoading(false);
    }
    loadData();
  }, []);

  // Calculate stats
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.active).length;

  // Find low stock items
  const lowStockItems = products.flatMap(product => {
    const lowStock = [];
    if (product.inventory) {
      Object.entries(product.inventory).forEach(([variant, qty]) => {
        if (qty <= 5) {
          lowStock.push({
            productId: product.id,
            productName: product.name,
            variant,
            quantity: qty
          });
        }
      });
    }
    return lowStock;
  });

  const stats = [
    {
      name: 'Total Products',
      value: totalProducts,
      icon: CubeIcon,
      href: '/admin/products'
    },
    {
      name: 'Active Products',
      value: activeProducts,
      icon: ShoppingCartIcon,
      href: '/admin/products'
    },
    {
      name: 'Low Stock Alerts',
      value: lowStockItems.length,
      icon: ExclamationTriangleIcon,
      href: '/admin/inventory',
      highlight: lowStockItems.length > 0
    },
    {
      name: 'Total Revenue',
      value: '$0.00',
      icon: CurrencyDollarIcon,
      href: '/admin/orders',
      subtext: 'Demo mode'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className={`bg-white p-6 shadow-sm hover:shadow-md transition-shadow ${
              stat.highlight ? 'ring-2 ring-red-500' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`h-8 w-8 ${stat.highlight ? 'text-red-500' : 'text-gray-400'}`} />
              <span className={`text-3xl font-bold ${stat.highlight ? 'text-red-600' : ''}`}>
                {stat.value}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{stat.name}</p>
            {stat.subtext && (
              <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-white p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            Low Stock Alerts
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Variant</th>
                  <th className="text-left py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.slice(0, 10).map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.productName}</td>
                    <td className="py-2">{item.variant}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 text-xs ${
                        item.quantity === 0
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.quantity} left
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {lowStockItems.length > 10 && (
            <Link
              to="/admin/inventory"
              className="text-sm text-gray-600 hover:underline mt-4 block"
            >
              View all {lowStockItems.length} low stock items
            </Link>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/products/new"
            className="px-4 py-2 bg-black text-white hover:bg-gray-800"
          >
            Add New Product
          </Link>
          <Link
            to="/admin/products"
            className="px-4 py-2 border border-gray-300 hover:border-black"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/inventory"
            className="px-4 py-2 border border-gray-300 hover:border-black"
          >
            Update Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
