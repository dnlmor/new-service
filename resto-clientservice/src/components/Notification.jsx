import React from 'react';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-md`}>
      {message}
    </div>
  );
};

export default Notification;
