import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                      <Dialog.Title className="text-lg font-semibold">
                        Your Cart ({cart.length})
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="p-2 -mr-2 hover:bg-gray-100 transition-colors"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Cart items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      {cart.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-gray-500 mb-4">Your cart is empty</p>
                          <Button variant="secondary" onClick={onClose}>
                            Continue Shopping
                          </Button>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {cart.map((item) => (
                            <li key={item.itemKey} className="py-4 flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <Link
                                  to={`/product/${item.slug}`}
                                  onClick={onClose}
                                  className="font-medium hover:underline block truncate"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-sm text-gray-500 mt-1">
                                  {item.size} / {item.color}
                                </p>
                                <p className="text-sm font-medium mt-1">
                                  ${item.price.toFixed(2)}
                                </p>

                                {/* Quantity controls */}
                                <div className="flex items-center gap-2 mt-2">
                                  <button
                                    onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                                    className="p-1 border border-gray-300 hover:bg-gray-50"
                                  >
                                    <MinusIcon className="h-3 w-3" />
                                  </button>
                                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                                    className="p-1 border border-gray-300 hover:bg-gray-50"
                                  >
                                    <PlusIcon className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => removeItem(item.itemKey)}
                                    className="ml-auto p-1 text-gray-400 hover:text-red-500"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                      <div className="border-t border-gray-200 px-6 py-4 space-y-4">
                        <div className="flex justify-between text-base font-medium">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <Link to="/checkout" onClick={onClose}>
                          <Button className="w-full">Checkout</Button>
                        </Link>
                        <Link to="/cart" onClick={onClose}>
                          <Button variant="secondary" className="w-full mt-2">
                            View Cart
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
