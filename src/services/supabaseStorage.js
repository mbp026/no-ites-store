import { supabase } from './supabase';

const BUCKET_NAME = 'product-images';

// Upload a single image file
export async function uploadProductImage(file, productSlug) {
  if (!supabase) {
    console.log('Sample data mode: uploadProductImage called');
    // Return a placeholder URL for demo mode
    return URL.createObjectURL(file);
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const timestamp = Date.now();
  const fileName = `${productSlug}/${timestamp}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrl;
}

// Upload multiple images
export async function uploadProductImages(files, productSlug) {
  const uploadPromises = files.map(file => uploadProductImage(file, productSlug));
  return Promise.all(uploadPromises);
}

// Delete an image by URL
export async function deleteProductImage(imageUrl) {
  if (!supabase) {
    console.log('Sample data mode: deleteProductImage called');
    return;
  }

  // Extract path from URL
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split('/');
  const bucketIndex = pathParts.findIndex(p => p === BUCKET_NAME);

  if (bucketIndex === -1) {
    console.warn('Image not from Supabase storage:', imageUrl);
    return;
  }

  const filePath = pathParts.slice(bucketIndex + 1).join('/');

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) throw error;
}

// Delete multiple images
export async function deleteProductImages(imageUrls) {
  if (!supabase || imageUrls.length === 0) return;

  const paths = imageUrls
    .filter(url => url.includes(BUCKET_NAME))
    .map(url => {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const bucketIndex = pathParts.findIndex(p => p === BUCKET_NAME);
      return pathParts.slice(bucketIndex + 1).join('/');
    });

  if (paths.length === 0) return;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(paths);

  if (error) throw error;
}

// List images for a product
export async function listProductImages(productSlug) {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(productSlug);

  if (error) throw error;

  return data.map(file => {
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`${productSlug}/${file.name}`);
    return publicUrl;
  });
}
