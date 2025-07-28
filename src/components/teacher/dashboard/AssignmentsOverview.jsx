import React from 'react';

const AssignmentsOverview = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Assignments Overview</h3>
      <ul className="text-sm text-gray-700 space-y-2">
        <li>📝 3 pending to grade</li>
        <li>📬 7 submitted today</li>
        <li>📤 2 assignments due this week</li>
      </ul>
    </div>
  );
};

export default AssignmentsOverview;
