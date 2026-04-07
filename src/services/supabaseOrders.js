import { supabase } from './supabase';

// Generate unique order number
function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NI-${timestamp}-${random}`;
}

// Create a new order
export async function createOrder(orderData) {
  if (!supabase) {
    console.log('Sample data mode: createOrder called with', orderData);
    return {
      id: 'sample-order-' + Date.now(),
      order_number: generateOrderNumber()
    };
  }

  const {
    email,
    items,
    shippingAddress,
    billingAddress,
    subtotal,
    shipping,
    tax,
    total,
    userId = null
  } = orderData;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: generateOrderNumber(),
      user_id: userId,
      email,
      subtotal,
      shipping,
      tax,
      total,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.name,
    product_slug: item.slug,
    product_image: item.image,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return order;
}

// Get order by ID
export async function getOrderById(orderId) {
  if (!supabase) {
    return null;
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return transformOrder(order);
}

// Get order by order number
export async function getOrderByNumber(orderNumber) {
  if (!supabase) {
    return null;
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('order_number', orderNumber)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return transformOrder(order);
}

// Get orders for a user
export async function getUserOrders(userId) {
  if (!supabase) {
    return [];
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return orders.map(transformOrder);
}

// Admin: Get all orders
export async function getAllOrders() {
  if (!supabase) {
    return [];
  }

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return orders.map(transformOrder);
}

// Admin: Update order status
export async function updateOrderStatus(orderId, status) {
  if (!supabase) {
    console.log('Sample data mode: updateOrderStatus called with', orderId, status);
    return;
  }

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) throw error;
}

// Helper to transform order data
function transformOrder(order) {
  return {
    id: order.id,
    orderNumber: order.order_number,
    userId: order.user_id,
    email: order.email,
    status: order.status,
    subtotal: parseFloat(order.subtotal),
    shipping: parseFloat(order.shipping),
    tax: parseFloat(order.tax),
    total: parseFloat(order.total),
    shippingAddress: order.shipping_address,
    billingAddress: order.billing_address,
    notes: order.notes,
    items: order.order_items?.map(item => ({
      id: item.id,
      productId: item.product_id,
      name: item.product_name,
      slug: item.product_slug,
      image: item.product_image,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitPrice: parseFloat(item.unit_price),
      totalPrice: parseFloat(item.total_price)
    })) || [],
    createdAt: order.created_at,
    updatedAt: order.updated_at
  };
}
