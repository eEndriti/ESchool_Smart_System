import React from 'react';
import { ClipboardList, FilePlus, Bell } from 'lucide-react';

const actions = [
  { icon: <FilePlus />, label: 'Create Assignment' },
  { icon: <ClipboardList />, label: 'Take Attendance' },
  { icon: <Bell />, label: 'Send Announcement' },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h3>
      <div className="flex flex-col gap-3">
        {actions.map((action, idx) => (
          <button key={idx} className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition">
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
