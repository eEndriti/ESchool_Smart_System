import React from 'react';

const SubjectProgress = ({ childId }) => {
  const subjects = [
    { name: 'Mathematics', progress: 85 },
    { name: 'Science', progress: 72 },
    { name: 'English', progress: 90 },
    { name: 'History', progress: 65 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-md font-semibold text-gray-700 mb-3">Subject Progress</h3>
      <ul className="space-y-3">
        {subjects.map((subject, idx) => (
          <li key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-800">{subject.name}</span>
              <span className="text-gray-600">{subject.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectProgress;
