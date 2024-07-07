import React, { useState } from 'react';

const CreateMenuItem = ({ onItemCreated }) => {
  const [item, setItem] = useState({ name: '', price: '', description: '', stocks: '' });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/menu/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const newItem = await response.json();
        onItemCreated(newItem);
        setItem({ name: '', price: '', description: '', stocks: '' });
      } else {
        throw new Error('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Menu Item</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="price"
          value={item.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="stocks"
          value={item.stocks}
          onChange={handleChange}
          placeholder="Stocks"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Create Item</button>
    </form>
  );
};

export default CreateMenuItem;
