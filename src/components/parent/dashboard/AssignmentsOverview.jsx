import React from 'react';

const AssignmentsOverview = ({ childId }) => {
  const assignments = [
    { title: 'Math Homework 1', dueDate: '2025-07-30', status: 'Submitted' },
    { title: 'Science Project', dueDate: '2025-08-05', status: 'Pending' },
    { title: 'History Essay', dueDate: '2025-08-10', status: 'Pending' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-md font-semibold text-gray-700 mb-3">Assignments Overview</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {assignments.map((assignment, idx) => (
          <li key={idx} className="flex flex-col sm:flex-row justify-between border-b pb-1">
            <div>
              <p className="text-gray-800 font-medium">{assignment.title}</p>
              <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold w-fit mt-1 sm:mt-0 ${
                assignment.status === 'Submitted'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {assignment.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentsOverview;
