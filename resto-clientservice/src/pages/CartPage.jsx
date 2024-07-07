import React, { useState, useEffect } from 'react';
import { getCartItems, updateCartItem, removeFromCart, checkout } from '../services/api';
import Notification from '../components/Notification';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const data = await getCartItems();
      setCartItems(data);
    } catch (err) {
      setError('Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
      await fetchCartItems();
      setNotification({ message: 'Cart updated', type: 'success' });
    } catch (err) {
      setNotification({ message: 'Failed to update cart', type: 'error' });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      await fetchCartItems();
      setNotification({ message: 'Item removed from cart', type: 'success' });
    } catch (err) {
      setNotification({ message: 'Failed to remove item', type: 'error' });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      await fetchCartItems();
      setNotification({ message: 'Order has been made successfully!', type: 'success' });
    } catch (err) {
      setNotification({ message: 'Checkout failed', type: 'error' });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Order Receipt</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4 text-right">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default CartPage;
