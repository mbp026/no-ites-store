// Re-export all product functions from Supabase implementation
// This maintains backwards compatibility with existing imports
export {
  getAllProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getProductById,
  getProductBySlug,
  searchProducts,
  getCategories,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  updateInventory
} from './supabaseProducts';
