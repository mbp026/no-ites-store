import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

export default function Cart() {
  const { cart, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-8">Your cart is empty</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 75 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="border-b border-gray-200 pb-4 mb-4 hidden md:grid md:grid-cols-12 text-sm font-semibold text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.itemKey} className="py-6 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                {/* Product Info */}
                <div className="flex gap-4 md:col-span-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <div>
                    <Link
                      to={`/product/${item.slug}`}
                      className="font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.size} / {item.color}
                    </p>
                    <button
                      onClick={() => removeItem(item.itemKey)}
                      className="text-sm text-red-600 hover:underline mt-2 flex items-center gap-1 md:hidden"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden md:block md:col-span-2 text-center">
                  ${item.price.toFixed(2)}
                </div>

                {/* Quantity */}
                <div className="mt-4 md:mt-0 md:col-span-2 flex justify-center">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="hidden md:flex md:col-span-2 justify-end items-center gap-4">
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(item.itemKey)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-6">
            <Link to="/shop" className="text-sm text-gray-600 hover:underline">
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-gray-50 p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-gray-500 mt-4">
                Free shipping on orders over $75. Add ${(75 - subtotal).toFixed(2)} more to qualify.
              </p>
            )}

            <div className="border-t border-gray-300 mt-4 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block mt-6">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
