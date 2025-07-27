import React from 'react';

const SubjectContent = ({ subject }) => {
  return subject ? (
    <div>
      <h1 className="text-2xl font-semibold mb-2">{subject.name}</h1>
      <p className="text-gray-600">Content for {subject.name} goes here...</p>
    </div>
  ) : (
    <p className="text-gray-400 italic">Select a subject from the left.</p>
  );
};

export default SubjectContent;
