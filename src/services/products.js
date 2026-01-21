import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { sampleProducts, categories } from '../data/sampleProducts';

const PRODUCTS_COLLECTION = 'products';

// Use sample data for development, Firebase for production
const USE_SAMPLE_DATA = true;

// Get all products
export async function getAllProducts() {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.filter(p => p.active);
  }

  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(productsRef, where('active', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get products by category
export async function getProductsByCategory(category) {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.filter(p => p.category === category && p.active);
  }

  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(
    productsRef,
    where('category', '==', category),
    where('active', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get featured products
export async function getFeaturedProducts() {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.filter(p => p.featured && p.active);
  }

  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(
    productsRef,
    where('featured', '==', true),
    where('active', '==', true)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get single product by ID
export async function getProductById(id) {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.find(p => p.id === id) || null;
  }

  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

// Get product by slug
export async function getProductBySlug(slug) {
  if (USE_SAMPLE_DATA) {
    return sampleProducts.find(p => p.slug === slug) || null;
  }

  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(productsRef, where('slug', '==', slug));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  return null;
}

// Search products
export async function searchProducts(searchTerm) {
  const term = searchTerm.toLowerCase();

  if (USE_SAMPLE_DATA) {
    return sampleProducts.filter(p =>
      p.active && (
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )
    );
  }

  // For Firebase, we'll fetch all and filter client-side
  // (Firebase doesn't support full-text search natively)
  const products = await getAllProducts();
  return products.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term)
  );
}

// Get all categories
export function getCategories() {
  return categories;
}

// Admin functions (for managing products)
export async function createProduct(productData) {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const docRef = await addDoc(productsRef, {
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return docRef.id;
}

export async function updateProduct(id, productData) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...productData,
    updatedAt: new Date()
  });
}

export async function deleteProduct(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Get all products for admin (including inactive)
export async function getAllProductsAdmin() {
  if (USE_SAMPLE_DATA) {
    return sampleProducts;
  }

  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
