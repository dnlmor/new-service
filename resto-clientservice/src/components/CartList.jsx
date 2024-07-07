import React from 'react';

const CartList = ({ cartItems, setCartItems, setNotification }) => {
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/cart/checkout/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
      if (response.ok) {
        setCartItems([]);
        setNotification({ message: 'Order submitted successfully', type: 'success' });
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setNotification({ message: 'Error submitting order', type: 'error' });
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="mb-2">
          <span>{item.name} - ${item.price} x </span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
            className="w-16 p-1 border rounded"
            min="0"
          />
        </div>
      ))}
      <div className="font-bold mt-4">Total: ${total.toFixed(2)}</div>
      <button
        onClick={handleSubmitOrder}
        className="mt-4 bg-green-500 text-white p-2 rounded w-full"
      >
        Submit Order
      </button>
    </div>
  );
};

export default CartList;
