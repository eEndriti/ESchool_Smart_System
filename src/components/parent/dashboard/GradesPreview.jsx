import React from 'react';

const GradesPreview = ({ childId }) => {
  const grades = [
    { subject: 'Math', grade: 'A' },
    { subject: 'Science', grade: 'B+' },
    { subject: 'English', grade: 'A-' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-md font-semibold text-gray-700 mb-3">Grades Preview</h3>
      <ul className="space-y-2">
        {grades.map((item, idx) => (
          <li key={idx} className="flex justify-between text-sm text-gray-600">
            <span>{item.subject}</span>
            <span className="font-semibold text-gray-800">{item.grade}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GradesPreview
