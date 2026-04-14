import { supabase } from './supabase';
import { sampleProducts, categories } from '../data/sampleProducts';

// Toggle for development - set to false when Supabase is configured
const USE_SAMPLE_DATA = !supabase;

// Helper to transform Supabase product to match existing interface
function transformProduct(product, colors = [], inventory = []) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    category: product.category_id,
    price: parseFloat(product.price),
    compareAtPrice: product.compare_at_price ? parseFloat(product.compare_at_price) : null,
    images: product.images || [],
    sizes: product.sizes || [],
    colors: [...colors].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)).map(c => ({ name: c.name, hex: c.hex })),
    inventory: inventory.reduce((acc, inv) => {
      acc[`${inv.size}-${inv.color}`] = inv.quantity;
      return acc;
    }, {}),
    featured: product.featured,
    active: product.active,
    createdAt: product.created_at,
    updatedAt: product.updated_at
  };
}

// Get all active products
export async function getAllProducts() {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.filter(p => p.active);
  }

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors (*),
      product_inventory (*)
    `)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return products.map(p =>
    transformProduct(p, p.product_colors, p.product_inventory)
  );
}

// Get products by category
export async function getProductsByCategory(category) {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.filter(p => p.category === category && p.active);
  }

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors (*),
      product_inventory (*)
    `)
    .eq('category_id', category)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return products.map(p =>
    transformProduct(p, p.product_colors, p.product_inventory)
  );
}

// Get featured products
export async function getFeaturedProducts() {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.filter(p => p.featured && p.active);
  }

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors (*),
      product_inventory (*)
    `)
    .eq('featured', true)
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return products.map(p =>
    transformProduct(p, p.product_colors, p.product_inventory)
  );
}

// Get single product by ID
export async function getProductById(id) {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.find(p => p.id === id) || null;
  }

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors (*),
      product_inventory (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }

  return transformProduct(product, product.product_colors, product.product_inventory);
}

// Get product by slug
export async function getProductBySlug(slug) {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.find(p => p.slug === slug) || null;
  }

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors (*),
      product_inventory (*)
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return transformProduct(product, product.product_colors, product.product_inventory);
}

// Search products
export async function searchProducts(searchTerm) {
  if (USE_SAMPLE_DATA) {
    const term = searchTerm.toLowerCase();
    return sampleProducts.filter(p =>
      p.active && (
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    );
  }

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors (*),
      product_inventory (*)
    `)
    .eq('active', true)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);

  if (error) throw error;

  return products.map(p =>
    transformProduct(p, p.product_colors, p.product_inventory)
  );
}

// Get all categories
export function getCategories() {
  return categories;
}

// Admin: Get all products including inactive
export async function getAllProductsAdmin() {
  if (USE_SAMPLE_DATA) {
    return sampleProducts;
  }

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_colors (*),
      product_inventory (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return products.map(p =>
    transformProduct(p, p.product_colors, p.product_inventory)
  );
}

// Admin: Create product with colors and inventory
export async function createProduct(productData) {
  if (USE_SAMPLE_DATA) {
    console.log('Sample data mode: createProduct called with', productData);
    return 'sample-id-' + Date.now();
  }

  const { colors, inventory, category, compareAtPrice, ...rest } = productData;

  // Insert product
  const { data: newProduct, error: productError } = await supabase
    .from('products')
    .insert({
      name: rest.name,
      slug: rest.slug,
      description: rest.description,
      category_id: category,
      price: rest.price,
      compare_at_price: compareAtPrice,
      images: rest.images,
      sizes: rest.sizes,
      featured: rest.featured,
      active: rest.active
    })
    .select()
    .single();

  if (productError) throw productError;

  // Insert colors
  if (colors && colors.length > 0) {
    const { error: colorsError } = await supabase
      .from('product_colors')
      .insert(colors.map((c, i) => ({
        product_id: newProduct.id,
        name: c.name,
        hex: c.hex,
        sort_order: i
      })));
    if (colorsError) throw colorsError;
  }

  // Insert inventory
  if (inventory) {
    const inventoryRows = Object.entries(inventory).map(([key, qty]) => {
      const [size, ...colorParts] = key.split('-');
      const color = colorParts.join('-'); // Handle color names with hyphens
      return {
        product_id: newProduct.id,
        size,
        color,
        quantity: qty
      };
    });

    if (inventoryRows.length > 0) {
      const { error: invError } = await supabase
        .from('product_inventory')
        .insert(inventoryRows);
      if (invError) throw invError;
    }
  }

  return newProduct.id;
}

// Admin: Update product
export async function updateProduct(id, productData) {
  if (USE_SAMPLE_DATA) {
    console.log('Sample data mode: updateProduct called with', id, productData);
    return;
  }

  const { colors, inventory, category, compareAtPrice, ...rest } = productData;

  // Update product
  const { error: productError } = await supabase
    .from('products')
    .update({
      name: rest.name,
      slug: rest.slug,
      description: rest.description,
      category_id: category,
      price: rest.price,
      compare_at_price: compareAtPrice,
      images: rest.images,
      sizes: rest.sizes,
      featured: rest.featured,
      active: rest.active
    })
    .eq('id', id);

  if (productError) throw productError;

  // Replace colors
  await supabase.from('product_colors').delete().eq('product_id', id);
  if (colors && colors.length > 0) {
    await supabase.from('product_colors').insert(
      colors.map((c, i) => ({
        product_id: id,
        name: c.name,
        hex: c.hex,
        sort_order: i
      }))
    );
  }

  // Replace inventory
  await supabase.from('product_inventory').delete().eq('product_id', id);
  if (inventory) {
    const inventoryRows = Object.entries(inventory).map(([key, qty]) => {
      const [size, ...colorParts] = key.split('-');
      const color = colorParts.join('-');
      return { product_id: id, size, color, quantity: qty };
    });
    if (inventoryRows.length > 0) {
      await supabase.from('product_inventory').insert(inventoryRows);
    }
  }
}

// Admin: Delete product
export async function deleteProduct(id) {
  if (USE_SAMPLE_DATA) {
    console.log('Sample data mode: deleteProduct called with', id);
    return;
  }

  // Cascading delete handles colors and inventory
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Admin: Update inventory for a product
export async function updateInventory(productId, inventory) {
  if (USE_SAMPLE_DATA) {
    console.log('Sample data mode: updateInventory called with', productId, inventory);
    return;
  }

  // Replace all inventory for the product
  await supabase.from('product_inventory').delete().eq('product_id', productId);

  const inventoryRows = Object.entries(inventory).map(([key, qty]) => {
    const [size, ...colorParts] = key.split('-');
    const color = colorParts.join('-');
    return { product_id: productId, size, color, quantity: qty };
  });

  if (inventoryRows.length > 0) {
    const { error } = await supabase
      .from('product_inventory')
      .insert(inventoryRows);
    if (error) throw error;
  }
}
