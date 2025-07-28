import React from 'react';

const filters = ['All', 'Published', 'Draft', 'Closed'];

const AssignmentFilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex gap-3 text-sm font-medium text-gray-600">
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={`px-4 py-2 rounded-full border transition ${
            currentFilter === status
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default AssignmentFilterBar;
