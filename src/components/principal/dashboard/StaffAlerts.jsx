import React from 'react';

const StaffAlerts = () => {
  const alerts = [
    "3 teachers have not submitted attendance today.",
    "1 pending staff request for leave.",
    "2 events are awaiting approval."
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Staff & System Alerts</h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-600">
        {alerts.map((alert, idx) => <li key={idx}>{alert}</li>)}
      </ul>
    </div>
  );
};

export default StaffAlerts;
