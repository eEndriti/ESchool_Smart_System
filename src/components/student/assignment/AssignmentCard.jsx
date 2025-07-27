import React from 'react';
import AssignmentStatusBadge from './AssignmentStatusBadge';

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="bg-white w-80 p-5 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{assignment.title}</h2>
          <p className="text-sm text-gray-500">{assignment.subject}</p>
        </div>
        <AssignmentStatusBadge status={assignment.status} />
      </div>

      <p className="text-sm text-gray-600">
        Due: {new Date(assignment.dueDate).toLocaleDateString()}
      </p>

      {assignment.description && (
        <p className="text-sm text-gray-700 mt-2">{assignment.description}</p>
      )}

      {assignment.attachment && (
        <p className="text-sm text-blue-600 mt-2">
          📎 <a href={`#`} className="underline hover:text-blue-800">{assignment.attachment}</a>
        </p>
      )}

      {assignment.grade && (
        <p className="text-sm mt-2">
          <span className="font-semibold text-gray-800">Grade:</span>{' '}
          <span className="text-green-600 font-bold">{assignment.grade}</span>
        </p>
      )}

      {assignment.feedback && (
        <p className="text-sm text-blue-600 mt-1 italic">Feedback: {assignment.feedback}</p>
      )}

      {assignment.status === 'Pending' && (
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
          Submit Assignment
        </button>
      )}
    </div>
  );
};

export default AssignmentCard;
