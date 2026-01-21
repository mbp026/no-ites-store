import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'no-ites-cart';

// Load cart from localStorage
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Save cart to localStorage
function saveCartToStorage(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
}

function cartReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, quantity = 1 } = action.payload;
      const itemKey = `${product.id}-${size}-${color}`;

      const existingIndex = state.findIndex(
        item => item.itemKey === itemKey
      );

      if (existingIndex >= 0) {
        newState = state.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newState = [...state, {
          itemKey,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images[0],
          size,
          color,
          quantity
        }];
      }
      break;
    }

    case 'REMOVE_ITEM': {
      newState = state.filter(item => item.itemKey !== action.payload);
      break;
    }

    case 'UPDATE_QUANTITY': {
      const { itemKey, quantity } = action.payload;
      if (quantity <= 0) {
        newState = state.filter(item => item.itemKey !== itemKey);
      } else {
        newState = state.map(item =>
          item.itemKey === itemKey ? { ...item, quantity } : item
        );
      }
      break;
    }

    case 'CLEAR_CART': {
      newState = [];
      break;
    }

    case 'LOAD_CART': {
      newState = action.payload;
      break;
    }

    default:
      return state;
  }

  saveCartToStorage(newState);
  return newState;
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Load cart from storage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  const addItem = (product, size, color, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, color, quantity } });
  };

  const removeItem = (itemKey) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemKey });
  };

  const updateQuantity = (itemKey, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemKey, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
