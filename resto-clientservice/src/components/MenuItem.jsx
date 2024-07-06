import React, { useState } from 'react';

const MenuItem = ({ item, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/contact/menu-items/${item.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedItem),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        onUpdate(updatedItem);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/contact/menu-items/${item.id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDelete(item.id);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 m-4">
        <input
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={editedItem.price}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          value={editedItem.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="stocks"
          value={editedItem.stocks}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        <button onClick={handleUpdate} className="bg-green-500 text-white p-2 rounded mr-2">Save</button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <p className="text-green-600 font-semibold">Price: ${item.price}</p>
      <p className="text-blue-600">Stocks: {item.stocks}</p>
      <div className="mt-4">
        <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default MenuItem;
