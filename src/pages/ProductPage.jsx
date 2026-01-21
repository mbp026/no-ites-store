import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getProductBySlug, getAllProducts } from '../services/products';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import Spinner from '../components/ui/Spinner';

export default function ProductPage() {
  const { slug } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const productData = await getProductBySlug(slug);
      setProduct(productData);

      if (productData) {
        // Set default selections
        setSelectedSize(productData.sizes[0] || '');
        setSelectedColor(productData.colors[0]?.name || '');

        // Load related products
        const allProducts = await getAllProducts();
        const related = allProducts
          .filter(p => p.category === productData.category && p.id !== productData.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }

      setLoading(false);
      setCurrentImageIndex(0);
      setQuantity(1);
      setAddedToCart(false);
    }

    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
      addItem(product, selectedSize, selectedColor, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Check stock
  const stockKey = `${selectedSize}-${selectedColor}`;
  const inStock = product?.inventory?.[stockKey] > 0;

  if (loading) {
    return (
      <div className="container-custom py-16 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/shop" className="text-gray-600 hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/shop" className="text-gray-500 hover:text-black">Shop</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-[3/4] bg-gray-100 mb-4">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </>
            )}
            {product.compareAtPrice && (
              <span className="absolute top-4 left-4 bg-black text-white text-sm px-3 py-1">
                Sale
              </span>
            )}
          </div>

          {/* Thumbnail navigation */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 border-2 ${
                    index === currentImageIndex ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-2xl font-medium ${product.compareAtPrice ? 'text-red-600' : ''}`}>
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xl text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">
              Color: <span className="font-normal">{selectedColor}</span>
            </h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color.name
                      ? 'ring-2 ring-black ring-offset-2'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Quantity</h3>
            <div className="flex items-center border border-gray-300 w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="w-full mb-4"
            size="lg"
          >
            {addedToCart
              ? 'Added to Cart!'
              : inStock
                ? 'Add to Cart'
                : 'Out of Stock'}
          </Button>

          {!inStock && (
            <p className="text-red-600 text-sm mb-4">
              This combination is currently out of stock
            </p>
          )}

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-sm font-semibold mb-3">Product Details</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Premium quality materials</li>
              <li>Screen printed or embroidered design</li>
              <li>Machine washable</li>
              <li>Designed and printed in the USA</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
