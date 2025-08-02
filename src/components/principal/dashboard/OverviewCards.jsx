import React from 'react';

const OverviewCards = () => {
  const stats = [
    { label: "Total Students", value: 842 },
    { label: "Total Teachers", value: 65 },
    { label: "Subjects", value: 34 },
    { label: "Active Events", value: 5 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white p-4 rounded shadow text-center">
          <p className="text-lg font-semibold text-gray-700">{s.label}</p>
          <p className="text-2xl font-bold text-blue-600">{s.value}</p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
