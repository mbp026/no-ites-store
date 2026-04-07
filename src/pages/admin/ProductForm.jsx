import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { XMarkIcon, PlusIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { getProductById, getCategories, createProduct, updateProduct } from '../../services/products';
import { uploadProductImage } from '../../services/supabaseStorage';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const categories = getCategories();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const slug = formData.slug || 'temp-' + Date.now();
      const uploadPromises = files.map(file => uploadProductImage(file, slug));
      const urls = await Promise.all(uploadPromises);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images.filter(img => img.trim()), ...urls]
      }));
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload image(s)');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Prepare data
      const productData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        images: formData.images.filter(img => img.trim()),
        sizes: formData.sizes,
        colors: formData.colors.filter(c => c.name.trim()),
        featured: formData.featured,
        active: formData.active,
        inventory: formData.inventory || {}
      };

      if (isEditing) {
        await updateProduct(id, productData);
      } else {
        await createProduct(productData);
      }

      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to save product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
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
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4">
            {error}
          </div>
        )}

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

          {/* Image previews */}
          {formData.images.filter(img => img.trim()).length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.images.filter(img => img.trim()).map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(formData.images.indexOf(image))}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* File upload */}
          <div className="border-2 border-dashed border-gray-300 p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <PhotoIcon className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">
                {uploading ? 'Uploading...' : 'Click to upload images'}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG up to 10MB
              </span>
            </label>
          </div>

          {/* URL inputs */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Or add image URLs directly:</p>
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
          </div>

          <button
            type="button"
            onClick={addImage}
            className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
          >
            <PlusIcon className="h-4 w-4" />
            Add another URL
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
