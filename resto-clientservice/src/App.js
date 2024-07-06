import React from 'react';
import MenuList from './components/MenuList';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-3xl font-bold text-center">Restaurant Menu</h1>
      </header>
      <main className="py-8">
        <MenuList />
      </main>
    </div>
  );
};

export default App;
