import React from 'react';

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-wrap gap-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Broadcast Announcement
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Generate Monthly Report
      </button>
      <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
        Review Staff Requests
      </button>
    </div>
  );
};

export default QuickActions;
