import React from 'react';

const notifications = [
  "New submission from Class 9A",
  "Admin: Staff meeting at 3PM",
  "2 students absent in 10B",
];

const NotificationsPanel = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Notifications</h3>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPanel;
