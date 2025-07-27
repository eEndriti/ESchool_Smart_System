import React from 'react';
import { Bell, AlertTriangle, BookOpenText } from 'lucide-react';

const NotificationsDashboard = () => {
  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment: Algebra Worksheet',
      message: 'Due by April 30th at 11:59 PM',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'event',
      title: 'Science Fair Tomorrow',
      message: 'Don’t forget your project materials!',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'alert',
      title: 'Attendance Warning',
      message: 'You were marked absent in Physics today.',
      time: '3 hours ago',
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <BookOpenText className="text-blue-600" />;
      case 'event':
        return <Bell className="text-yellow-500" />;
      case 'alert':
        return <AlertTriangle className="text-red-500" />;
      default:
        return <Bell className="text-gray-400" />;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-start gap-4 bg-white rounded-xl shadow-md border p-4 hover:shadow-lg transition"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
              {getIcon(notif.type)}
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                {notif.title}
              </h3>
              <p className="text-sm text-gray-600">{notif.message}</p>
              <span className="text-xs text-gray-400">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsDashboard;
