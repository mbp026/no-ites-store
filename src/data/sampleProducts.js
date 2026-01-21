// Sample product data for development
// This will be replaced by Firebase data in production

export const sampleProducts = [
  {
    id: '1',
    name: 'Unity Hoodie',
    slug: 'unity-hoodie',
    description: 'Premium heavyweight cotton hoodie featuring "no manner of -ites" embroidered on the chest. A statement piece that embodies our message of unity.',
    category: 'hoodies',
    price: 65.00,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    inventory: {
      'S-Black': 10, 'M-Black': 15, 'L-Black': 20, 'XL-Black': 12, 'XXL-Black': 8,
      'S-White': 8, 'M-White': 12, 'L-White': 18, 'XL-White': 10, 'XXL-White': 6
    },
    featured: true,
    active: true
  },
  {
    id: '2',
    name: 'No -ites Tee',
    slug: 'no-ites-tee',
    description: 'Classic fit cotton tee with bold "no -ites" screen print. Soft, breathable fabric perfect for everyday wear.',
    category: 'tshirts',
    price: 35.00,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gray', hex: '#6B7280' }
    ],
    inventory: {
      'S-Black': 25, 'M-Black': 30, 'L-Black': 35, 'XL-Black': 20, 'XXL-Black': 15,
      'S-White': 20, 'M-White': 25, 'L-White': 30, 'XL-White': 18, 'XXL-White': 12,
      'S-Gray': 15, 'M-Gray': 20, 'L-Gray': 25, 'XL-Gray': 15, 'XXL-Gray': 10
    },
    featured: true,
    active: true
  },
  {
    id: '3',
    name: 'un-ITEd Pullover',
    slug: 'united-pullover',
    description: 'Midweight crewneck pullover with "un-ITEd" typography. The perfect layer for cool evenings and making a statement.',
    category: 'pullovers',
    price: 55.00,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    inventory: {
      'S-Black': 12, 'M-Black': 18, 'L-Black': 22, 'XL-Black': 14, 'XXL-Black': 8,
      'S-White': 10, 'M-White': 15, 'L-White': 20, 'XL-White': 12, 'XXL-White': 6
    },
    featured: true,
    active: true
  },
  {
    id: '4',
    name: 'Together Hat',
    slug: 'together-hat',
    description: 'Structured six-panel cap with embroidered "no -ites" logo. Adjustable strap for the perfect fit.',
    category: 'hats',
    price: 28.00,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=800&fit=crop'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    inventory: {
      'One Size-Black': 30,
      'One Size-White': 25
    },
    featured: false,
    active: true
  },
  {
    id: '5',
    name: 'Divided No More Hoodie',
    slug: 'divided-no-more-hoodie',
    description: 'Premium heavyweight hoodie with large back print. Our most powerful statement piece for those ready to unite.',
    category: 'hoodies',
    price: 68.00,
    compareAtPrice: 75.00,
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565693413579-8a73ffa0f2a5?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' }
    ],
    inventory: {
      'S-Black': 8, 'M-Black': 12, 'L-Black': 15, 'XL-Black': 10, 'XXL-Black': 5
    },
    featured: true,
    active: true
  },
  {
    id: '6',
    name: 'Simple Unity Tee',
    slug: 'simple-unity-tee',
    description: 'Minimalist design tee with subtle chest logo. Premium soft cotton for all-day comfort.',
    category: 'tshirts',
    price: 32.00,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Charcoal', hex: '#374151' }
    ],
    inventory: {
      'S-Black': 20, 'M-Black': 25, 'L-Black': 30, 'XL-Black': 18, 'XXL-Black': 12,
      'S-White': 18, 'M-White': 22, 'L-White': 28, 'XL-White': 15, 'XXL-White': 10,
      'S-Charcoal': 12, 'M-Charcoal': 18, 'L-Charcoal': 22, 'XL-Charcoal': 12, 'XXL-Charcoal': 8
    },
    featured: false,
    active: true
  },
  {
    id: '7',
    name: 'One People Pullover',
    slug: 'one-people-pullover',
    description: 'Cozy fleece-lined pullover perfect for layering. Features embroidered unity symbol on chest.',
    category: 'pullovers',
    price: 58.00,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Heather Gray', hex: '#9CA3AF' },
      { name: 'Black', hex: '#000000' }
    ],
    inventory: {
      'S-Heather Gray': 10, 'M-Heather Gray': 14, 'L-Heather Gray': 18, 'XL-Heather Gray': 10, 'XXL-Heather Gray': 6,
      'S-Black': 8, 'M-Black': 12, 'L-Black': 16, 'XL-Black': 8, 'XXL-Black': 5
    },
    featured: false,
    active: true
  },
  {
    id: '8',
    name: 'Movement Cap',
    slug: 'movement-cap',
    description: 'Relaxed fit dad cap with curved brim. Subtle "unity" text embroidered on the side.',
    category: 'hats',
    price: 25.00,
    compareAtPrice: null,
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&h=800&fit=crop'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Stone', hex: '#D6D3D1' }
    ],
    inventory: {
      'One Size-Black': 35,
      'One Size-Navy': 20,
      'One Size-Stone': 25
    },
    featured: false,
    active: true
  }
];

export const categories = [
  { id: 'hoodies', name: 'Hoodies', description: 'Premium hoodies for every occasion' },
  { id: 'pullovers', name: 'Pull Overs', description: 'Comfortable pullovers and crewnecks' },
  { id: 'tshirts', name: 'T-Shirts', description: 'Classic tees with bold statements' },
  { id: 'hats', name: 'Hats', description: 'Caps and hats to complete your look' }
];
