import React from 'react';

const MessagesFromTeachers = ({ childId }) => {
  const messages = [
    {
      from: 'Mrs. Nora Mathers',
      subject: 'Great Progress!',
      message: 'Your child has been doing exceptionally well in math this month!',
      date: '2025-07-25',
    },
    {
      from: 'Mr. Genc Islami',
      subject: 'Late Assignment Notice',
      message: 'Please ensure your child submits their science project by Friday.',
      date: '2025-07-22',
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-md font-semibold text-gray-700 mb-3">Messages from Teachers</h3>
      <ul className="space-y-4 text-sm text-gray-600">
        {messages.map((msg, idx) => (
          <li key={idx} className="border-b pb-2">
            <div className="font-semibold text-gray-800">{msg.subject}</div>
            <div className="text-xs text-gray-500 mb-1">From: {msg.from} | {msg.date}</div>
            <p className="text-sm text-gray-600">{msg.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesFromTeachers;
