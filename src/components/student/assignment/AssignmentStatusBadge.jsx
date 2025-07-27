import React from 'react';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Submitted: 'bg-blue-100 text-blue-700',
  Graded: 'bg-green-100 text-green-700',
};

const AssignmentStatusBadge = ({ status }) => {
  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};

export default AssignmentStatusBadge;
