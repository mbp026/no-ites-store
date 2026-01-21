import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductGrid from '../components/products/ProductGrid';
import { getFeaturedProducts, getCategories } from '../services/products';
import Button from '../components/ui/Button';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = getCategories();

  useEffect(() => {
    async function loadProducts() {
      const products = await getFeaturedProducts();
      setFeaturedProducts(products);
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="container-custom py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              No manner of -ites
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              United, not divided. Clothing that reminds us we're all part of one human family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100">
                  Shop Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white border border-white hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
      </section>

      {/* Brand Message */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container-custom text-center">
          <p className="text-2xl md:text-3xl font-light text-gray-700 max-w-3xl mx-auto leading-relaxed">
            "There should be no -ites among us. We are one people, one family, united in purpose and love."
          </p>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative aspect-square bg-black overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <div className="absolute inset-0 flex items-end p-6 z-20">
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
                    <span className="text-white/80 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Shop now <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/shop" className="text-sm font-medium hover:underline flex items-center gap-1">
              View all <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts.slice(0, 4)} loading={loading} />
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-white/30 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Unity</h3>
              <p className="text-gray-400">
                Every piece we create carries a message of togetherness and belonging.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-white/30 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-400">
                Premium materials and ethical manufacturing for clothing that lasts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-white/30 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Purpose</h3>
              <p className="text-gray-400">
                A portion of every sale supports community building initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Be the first to know about new releases, exclusive offers, and stories of unity.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
