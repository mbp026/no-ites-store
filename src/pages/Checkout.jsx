import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/supabaseOrders';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // 1: Info, 2: Shipping, 3: Payment

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const shipping = subtotal >= 75 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const order = await createOrder({
        email: formData.email,
        userId: user?.id || null,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          slug: item.slug,
          image: item.image,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          phone: formData.phone
        },
        subtotal,
        shipping,
        tax,
        total
      });

      clearCart();
      navigate('/order-confirmation', {
        state: { orderNumber: order.order_number }
      });
    } catch (err) {
      console.error('Order creation failed:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-500 mb-8">Your cart is empty</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            {['Information', 'Shipping', 'Payment'].map((label, index) => (
              <div key={label} className="flex items-center">
                <button
                  onClick={() => index + 1 < step && setStep(index + 1)}
                  className={`flex items-center ${
                    index + 1 <= step ? 'text-black' : 'text-gray-400'
                  }`}
                  disabled={index + 1 > step}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    index + 1 < step
                      ? 'bg-black text-white'
                      : index + 1 === step
                        ? 'border-2 border-black'
                        : 'border border-gray-300'
                  }`}>
                    {index + 1 < step ? '✓' : index + 1}
                  </span>
                  <span className="text-sm font-medium">{label}</span>
                </button>
                {index < 2 && (
                  <div className={`w-12 h-px mx-4 ${
                    index + 1 < step ? 'bg-black' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Contact Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="you@example.com"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />
                </div>
                <Input
                  label="Phone (optional)"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 555-5555"
                />
                <Button
                  type="button"
                  onClick={() => validateStep1() && setStep(2)}
                  className="w-full mt-6"
                >
                  Continue to Shipping
                </Button>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  placeholder="123 Main St"
                />
                <Input
                  label="Apartment, suite, etc. (optional)"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                  />
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={errors.state}
                  />
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => validateStep2() && setStep(3)}
                    className="flex-1"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Payment</h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-4">
                    {error}
                  </div>
                )}

                <div className="bg-gray-50 p-6 border border-gray-200">
                  <p className="text-gray-600 mb-4">
                    This is a demo store. No real payment will be processed.
                  </p>
                  <p className="text-sm text-gray-500">
                    In a production environment, this would integrate with Stripe
                    or another payment processor.
                  </p>
                </div>

                {/* Order Review */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Shipping to:</h3>
                  <p className="text-gray-600">
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}{formData.apartment && `, ${formData.apartment}`}<br />
                    {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    loading={loading}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <div className="bg-gray-50 p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <ul className="divide-y divide-gray-200 mb-4">
              {cart.map((item) => (
                <li key={item.itemKey} className="py-4 flex gap-4">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size} / {item.color}</p>
                  </div>
                  <p className="text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-4 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
