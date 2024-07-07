import React, { useState, useEffect } from 'react';
import { getMenuItems, addToCart, createMenuItem } from '../services/api';
import MenuList from '../components/MenuList';
import Notification from '../components/Notification';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', stocks: '' });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const data = await getMenuItems();
      setMenuItems(data);
    } catch (err) {
      setError('Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (itemId) => {
    try {
      await addToCart(itemId);
      setNotification({ message: 'Item added to cart', type: 'success' });
    } catch (err) {
      setNotification({ message: 'Failed to add item to cart', type: 'error' });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMenuItem(newItem);
      setNotification({ message: 'New item added to menu', type: 'success' });
      setNewItem({ name: '', price: '', description: '', stocks: '' });
      fetchMenuItems();
    } catch (err) {
      setNotification({ message: 'Failed to add new item', type: 'error' });
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      
      <div className="mb-8 p-4 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="Item Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="stocks"
            value={newItem.stocks}
            onChange={handleInputChange}
            placeholder="Stocks"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Item
          </button>
        </form>
      </div>

      <MenuList items={menuItems} onAddToCart={handleAddToCart} />
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default MenuPage;
