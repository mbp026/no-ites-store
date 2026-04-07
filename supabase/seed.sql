-- =============================================
-- No Manner of -ites Store - Seed Data
-- Run this after schema.sql
-- Safe to re-run: uses ON CONFLICT DO NOTHING throughout
-- =============================================

-- =============================================
-- CATEGORIES
-- =============================================
INSERT INTO public.categories (id, name, description, sort_order) VALUES
('hoodies', 'Hoodies', 'Premium hoodies for every occasion', 1),
('pullovers', 'Pull Overs', 'Comfortable pullovers and crewnecks', 2),
('tshirts', 'T-Shirts', 'Classic tees with bold statements', 3),
('hats', 'Hats', 'Caps and hats to complete your look', 4)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PRODUCTS
-- =============================================

-- Product 1: Unity Hoodie
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'Unity Hoodie',
    'unity-hoodie',
    'Premium heavyweight cotton hoodie featuring "no manner of -ites" embroidered on the chest. A statement piece that embodies our message of unity.',
    'hoodies',
    65.00,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&h=800&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    true,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 0 FROM public.products WHERE slug = 'unity-hoodie'
ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'White', '#FFFFFF', 1 FROM public.products WHERE slug = 'unity-hoodie'
ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Black', 10 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Black', 15 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Black', 20 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Black', 12 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Black', 8 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'White', 8 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'White', 12 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'White', 18 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'White', 10 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'White', 6 FROM public.products WHERE slug = 'unity-hoodie' ON CONFLICT DO NOTHING;

-- =============================================
-- Product 2: No -ites Tee
-- =============================================
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'No -ites Tee',
    'no-ites-tee',
    'Classic fit cotton tee with bold "no -ites" screen print. Soft, breathable fabric perfect for everyday wear.',
    'tshirts',
    35.00,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=800&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    true,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 0 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'White', '#FFFFFF', 1 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Gray', '#6B7280', 2 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Black', 25 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Black', 30 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Black', 35 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Black', 20 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Black', 15 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'White', 20 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'White', 25 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'White', 30 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'White', 18 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'White', 12 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Gray', 15 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Gray', 20 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Gray', 25 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Gray', 15 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Gray', 10 FROM public.products WHERE slug = 'no-ites-tee' ON CONFLICT DO NOTHING;

-- =============================================
-- Product 3: un-ITEd Pullover
-- =============================================
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'un-ITEd Pullover',
    'united-pullover',
    'Midweight crewneck pullover with "un-ITEd" typography. The perfect layer for cool evenings and making a statement.',
    'pullovers',
    55.00,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=600&h=800&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    true,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 0 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'White', '#FFFFFF', 1 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Black', 12 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Black', 18 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Black', 22 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Black', 14 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Black', 8 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'White', 10 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'White', 15 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'White', 20 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'White', 12 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'White', 6 FROM public.products WHERE slug = 'united-pullover' ON CONFLICT DO NOTHING;

-- =============================================
-- Product 4: Together Hat
-- =============================================
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'Together Hat',
    'together-hat',
    'Structured six-panel cap with embroidered "no -ites" logo. Adjustable strap for the perfect fit.',
    'hats',
    28.00,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=800&fit=crop'],
    ARRAY['One Size'],
    false,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 0 FROM public.products WHERE slug = 'together-hat' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'White', '#FFFFFF', 1 FROM public.products WHERE slug = 'together-hat' ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'One Size', 'Black', 30 FROM public.products WHERE slug = 'together-hat' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'One Size', 'White', 25 FROM public.products WHERE slug = 'together-hat' ON CONFLICT DO NOTHING;

-- =============================================
-- Product 5: Divided No More Hoodie
-- =============================================
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'Divided No More Hoodie',
    'divided-no-more-hoodie',
    'Premium heavyweight hoodie with large back print. Our most powerful statement piece for those ready to unite.',
    'hoodies',
    68.00,
    75.00,
    ARRAY['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1565693413579-8a73ffa0f2a5?w=600&h=800&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    true,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 0 FROM public.products WHERE slug = 'divided-no-more-hoodie' ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Black', 8 FROM public.products WHERE slug = 'divided-no-more-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Black', 12 FROM public.products WHERE slug = 'divided-no-more-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Black', 15 FROM public.products WHERE slug = 'divided-no-more-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Black', 10 FROM public.products WHERE slug = 'divided-no-more-hoodie' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Black', 5 FROM public.products WHERE slug = 'divided-no-more-hoodie' ON CONFLICT DO NOTHING;

-- =============================================
-- Product 6: Simple Unity Tee
-- =============================================
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'Simple Unity Tee',
    'simple-unity-tee',
    'Minimalist design tee with subtle chest logo. Premium soft cotton for all-day comfort.',
    'tshirts',
    32.00,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    false,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 0 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'White', '#FFFFFF', 1 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Charcoal', '#374151', 2 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Black', 20 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Black', 25 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Black', 30 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Black', 18 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Black', 12 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'White', 18 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'White', 22 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'White', 28 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'White', 15 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'White', 10 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Charcoal', 12 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Charcoal', 18 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Charcoal', 22 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Charcoal', 12 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Charcoal', 8 FROM public.products WHERE slug = 'simple-unity-tee' ON CONFLICT DO NOTHING;

-- =============================================
-- Product 7: One People Pullover
-- =============================================
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'One People Pullover',
    'one-people-pullover',
    'Cozy fleece-lined pullover perfect for layering. Features embroidered unity symbol on chest.',
    'pullovers',
    58.00,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1609873814058-a8928924184a?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=600&h=800&fit=crop'],
    ARRAY['S', 'M', 'L', 'XL', 'XXL'],
    false,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Heather Gray', '#9CA3AF', 0 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 1 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Heather Gray', 10 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Heather Gray', 14 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Heather Gray', 18 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Heather Gray', 10 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Heather Gray', 6 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'S', 'Black', 8 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'M', 'Black', 12 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'L', 'Black', 16 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XL', 'Black', 8 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'XXL', 'Black', 5 FROM public.products WHERE slug = 'one-people-pullover' ON CONFLICT DO NOTHING;

-- =============================================
-- Product 8: Movement Cap
-- =============================================
INSERT INTO public.products (name, slug, description, category_id, price, compare_at_price, images, sizes, featured, active)
VALUES (
    'Movement Cap',
    'movement-cap',
    'Relaxed fit dad cap with curved brim. Subtle "unity" text embroidered on the side.',
    'hats',
    25.00,
    NULL,
    ARRAY['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&h=800&fit=crop', 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=600&h=800&fit=crop'],
    ARRAY['One Size'],
    false,
    true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Black', '#000000', 0 FROM public.products WHERE slug = 'movement-cap' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Navy', '#1E3A5F', 1 FROM public.products WHERE slug = 'movement-cap' ON CONFLICT DO NOTHING;
INSERT INTO public.product_colors (product_id, name, hex, sort_order)
SELECT id, 'Stone', '#D6D3D1', 2 FROM public.products WHERE slug = 'movement-cap' ON CONFLICT DO NOTHING;

INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'One Size', 'Black', 35 FROM public.products WHERE slug = 'movement-cap' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'One Size', 'Navy', 20 FROM public.products WHERE slug = 'movement-cap' ON CONFLICT DO NOTHING;
INSERT INTO public.product_inventory (product_id, size, color, quantity)
SELECT id, 'One Size', 'Stone', 25 FROM public.products WHERE slug = 'movement-cap' ON CONFLICT DO NOTHING;
