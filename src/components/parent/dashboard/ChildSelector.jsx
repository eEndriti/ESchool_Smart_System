import React from 'react';

const ChildSelector = ({ children, onSelect, selectedId }) => {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">Select Child:</h2>
      {children.map((child) => (
        <button
          key={child.id}
          onClick={() => onSelect(child.id)}
          className={`px-4 py-2 rounded-md transition font-medium
            ${selectedId === child.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-100'}`}
        >
          {child.name}
        </button>
      ))}
    </div>
  );
};

export default ChildSelector;
