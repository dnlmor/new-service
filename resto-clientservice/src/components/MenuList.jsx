import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import CreateMenuItem from './CreateMenuItem';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:8000/contact/menu-items/');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleItemCreated = (newItem) => {
    setMenuItems([...menuItems, newItem]);
  };

  const handleItemUpdated = (updatedItem) => {
    setMenuItems(menuItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleItemDeleted = (deletedItemId) => {
    setMenuItems(menuItems.filter(item => item.id !== deletedItemId));
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center my-8">Menu</h2>
      <CreateMenuItem onItemCreated={handleItemCreated} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {menuItems.map(item => (
          <MenuItem 
            key={item.id} 
            item={item} 
            onUpdate={handleItemUpdated}
            onDelete={handleItemDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
