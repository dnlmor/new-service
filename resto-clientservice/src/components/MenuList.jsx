import React, { useState, useEffect } from 'react';
import CreateMenuItem from './CreateMenuItem';
import MenuItem from './MenuItem';
import CartList from './CartList';
import Notification from './Notification';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/menu/');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else {
        throw new Error('Failed to fetch menu items');
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setNotification({ message: 'Failed to fetch menu items', type: 'error' });
    }
  };

  const handleItemCreated = (newItem) => {
    setMenuItems([...menuItems, newItem]);
    setNotification({ message: 'Item created successfully', type: 'success' });
  };

  const handleItemUpdated = (updatedItem) => {
    setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    setNotification({ message: 'Item updated successfully', type: 'success' });
  };

  const handleItemDeleted = (itemId) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
    setNotification({ message: 'Item deleted successfully', type: 'success' });
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setNotification({ message: 'Item added to cart', type: 'success' });
  };

  return (
    <div className="container mx-auto px-4">
      <CreateMenuItem onItemCreated={handleItemCreated} />
      <div className="flex mt-8">
        <div className="w-2/3 pr-4">
          <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
          {menuItems.map(item => (
            <MenuItem
                            key={item.id}
              item={item}
              onUpdate={handleItemUpdated}
              onDelete={handleItemDeleted}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <div className="w-1/3 pl-4">
          <CartList cartItems={cartItems} setCartItems={setCartItems} setNotification={setNotification} />
        </div>
      </div>
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default MenuList;

