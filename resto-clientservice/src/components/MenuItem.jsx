import React, { useState } from 'react';

const MenuItem = ({ item, onUpdate, onDelete, onAddToCart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/menu/${item.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedItem),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        onUpdate(updatedItem);
        setIsEditing(false);
      } else {
        throw new Error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/menu/${item.id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDelete(item.id);
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (isEditing) {
    return (
      <div className="border p-4 mb-4 rounded">
        <input
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleChange}
          className="w-full mb-2 p-1 border rounded"
        />
        <input
          type="number"
          name="price"
          value={editedItem.price}
          onChange={handleChange}
          className="w-full mb-2 p-1 border rounded"
        />
        <textarea
          name="description"
          value={editedItem.description}
          onChange={handleChange}
          className="w-full mb-2 p-1 border rounded"
        />
        <input
          type="number"
          name="stocks"
          value={editedItem.stocks}
          onChange={handleChange}
          className="w-full mb-2 p-1 border rounded"
        />
        <button onClick={handleUpdate} className="bg-green-500 text-white p-2 rounded mr-2">Save</button>
        <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
      </div>
    );
  }

  return (
    <div className="border p-4 mb-4 rounded">
      <h3 className="text-xl font-bold">{item.name}</h3>
      <p>Price: ${item.price}</p>
      <p>{item.description}</p>
      <p>In stock: {item.stocks}</p>
      <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
      <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
      <button onClick={() => onAddToCart(item)} className="bg-green-500 text-white p-2 rounded">Add to Cart</button>
    </div>
  );
};

export default MenuItem;
