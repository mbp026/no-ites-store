import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { getProductById, getCategories } from '../../services/products';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const categories = getCategories();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'tshirts',
    price: '',
    compareAtPrice: '',
    images: [''],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black', hex: '#000000' }],
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (isEditing) {
      async function loadProduct() {
        const product = await getProductById(id);
        if (product) {
          setFormData({
            ...product,
            price: product.price.toString(),
            compareAtPrice: product.compareAtPrice?.toString() || '',
          });
        }
        setLoading(false);
      }
      loadProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleColorChange = (index, field, value) => {
    const newColors = [...formData.colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setFormData(prev => ({ ...prev, colors: newColors }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: '', hex: '#000000' }]
    }));
  };

  const removeColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Prepare data
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
      images: formData.images.filter(img => img.trim()),
    };

    // In real app, save to Firebase
    console.log('Saving product:', productData);

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSaving(false);
    navigate('/admin/products');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Basic Information</h2>

          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            required
            placeholder="Unity Hoodie"
          />

          <Input
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            placeholder="unity-hoodie"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Describe the product..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Pricing</h2>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="65.00"
            />

            <Input
              label="Compare at Price ($)"
              type="number"
              name="compareAtPrice"
              value={formData.compareAtPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="75.00 (optional)"
            />
          </div>
        </div>

        <div className="bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Images</h2>

          {formData.images.map((image, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Image URL"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-3 text-gray-400 hover:text-red-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImage}
            className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Add another image
          </button>
        </div>

        <div className="bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Sizes</h2>

          <div className="flex flex-wrap gap-2">
            {allSizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 border ${
                  formData.sizes.includes(size)
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Colors</h2>

          {formData.colors.map((color, index) => (
            <div key={index} className="flex gap-2 items-end">
              <Input
                label={index === 0 ? "Color Name" : ""}
                placeholder="Black"
                value={color.name}
                onChange={(e) => handleColorChange(index, 'name', e.target.value)}
              />
              <div>
                {index === 0 && (
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hex
                  </label>
                )}
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                  className="w-12 h-12 border border-gray-300 cursor-pointer"
                />
              </div>
              {formData.colors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="p-3 text-gray-400 hover:text-red-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addColor}
            className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Add another color
          </button>
        </div>

        <div className="bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">Settings</h2>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Featured product (show on homepage)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Active (visible in store)</span>
          </label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" loading={saving}>
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
