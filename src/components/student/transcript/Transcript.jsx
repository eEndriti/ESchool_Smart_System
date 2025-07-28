import React from 'react';

const gradesData = [
  {
    subject: 'Mathematics',
    gradeLetter: 'A',
    gradeNumber: 10,
    gradePoints:95,
    gradedFrom:'Essay',
    teacher: 'Mr. Berisha',
    date: '05-April-2025',
  },
  {
    subject: 'Physics',
    gradeLetter: 'B+',
    gradeNumber: 9,
    gradePoints:88,
    gradedFrom:'Test',
    teacher: 'Ms. Kelmendi',
    date: '12-April-2025',
  },
  {
    subject: 'Biology',
    gradeLetter: 'A-',
    gradeNumber: 10,
    gradePoints:91,
    gradedFrom:'Essay',
    teacher: 'Dr. Dreshaj',
    date: '20-April-2025',
  },
];

const calculateAverage = (grades) => {
  const total = grades.reduce((acc, g) => acc + g.gradeNumber, 0);
  return (total / grades.length).toFixed(1);
};

const Transcript = () => {
  const average = calculateAverage(gradesData);

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-500 to-[#212B4B] text-white rounded-lg shadow-lg p-6 text-center mb-6">
        <h2 className="text-lg font-semibold">Average Grade</h2>
        <p className="text-4xl font-bold">{average}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-2 px-4">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th className="p-3">#</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Letter Grade</th>
              <th className="p-3">Numeric Grade</th>
              <th className="p-3">Achieved Points</th>
              <th className="p-3">Graded From</th>
              <th className="p-3">Teacher</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {gradesData.map((grade, index) => (
              <tr
                key={index}
                className="bg-slate-50 hover:bg-slate-100 transition text-sm"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{grade.subject}</td>
                <td className="p-3 text-blue-600 font-semibold">{grade.gradeLetter}</td>
                <td className="p-3">{grade.gradeNumber}</td>
                <td className="p-3">{grade.gradePoints}</td>
                <td className="p-3">{grade.gradedFrom}</td>
                <td className="p-3">{grade.teacher}</td>
                <td className="p-3 text-gray-500">{grade.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transcript;
