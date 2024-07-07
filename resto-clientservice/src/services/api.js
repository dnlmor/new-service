const API_BASE_URL = 'http://localhost:8000/api/menu';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred');
  }
  return response.json();
};

export const createMenuItem = async (menuItem) => {
  const response = await fetch(`${API_BASE_URL}/menu/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menuItem),
  });
  return handleResponse(response);
};

// Menu Service API calls
export const getMenuItems = async () => {
  const response = await fetch(`${API_BASE_URL}/menu/`);
  return handleResponse(response);
};

// Cart Service API calls
export const getCartItems = async () => {
  const response = await fetch(`${API_BASE_URL}/cart/1/`); // Assuming user ID 1 for simplicity
  return handleResponse(response);
};

export const addToCart = async (menuItemId) => {
  const response = await fetch(`${API_BASE_URL}/cart/1/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      menu_item_id: menuItemId,
      quantity: 1, // Default to adding 1 item
    }),
  });
  return handleResponse(response);
};

export const updateCartItem = async (cartItemId, quantity) => {
  const response = await fetch(`${API_BASE_URL}/cart/1/item/${cartItemId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });
  return handleResponse(response);
};

export const removeFromCart = async (cartItemId) => {
  const response = await fetch(`${API_BASE_URL}/cart/1/item/${cartItemId}/`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const checkout = async () => {
  const response = await fetch(`${API_BASE_URL}/cart/1/checkout/`, {
    method: 'POST',
  });
  return handleResponse(response);
};
