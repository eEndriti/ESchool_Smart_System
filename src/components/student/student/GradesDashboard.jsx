import React from 'react';

const GradesDashboard = () => {
  const grades = [
    {
      id: 1,
      subject: 'Mathematics',
      grade: 'A',
      date: '05-April-2025',
    },
    {
      id: 2,
      subject: 'Physics',
      grade: 'B+',
      date: '12-April-2025',
    },
    {
      id: 3,
      subject: 'History',
      grade: 'A-',
      date: '20-April-2025',
    },
  ];

  const avgGrade = '4.5';

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-1">Average Grade</h2>
        <p className="text-5xl font-extrabold">{avgGrade}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {grades.map((grade) => (
          <div key={grade.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{grade.subject}</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">Grade:</span>
              <span className="text-gray-800 font-semibold">{grade.grade}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span className="font-medium">Date:</span>
              <span>{grade.date}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default GradesDashboard;
