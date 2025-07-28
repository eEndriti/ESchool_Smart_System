import React, { useState } from 'react';
import AssignmentCard from './AssignmentsCard';
import AssignmentFilterBar from './AssignmentsFilterBar';

const mockAssignments = [
  {
    id: 1,
    title: 'Algebra Homework',
    subject: 'Mathematics',
    class: 'Grade 9A',
    dueDate: '2025-08-01',
    submissions: 14,
    pending: 4,
    status: 'Published',
  },
  {
    id: 2,
    title: 'Photosynthesis Quiz',
    subject: 'Biology',
    class: 'Grade 10B',
    dueDate: '2025-08-03',
    submissions: 18,
    pending: 0,
    status: 'Closed',
  },
  {
    id: 3,
    title: 'Essay on WWII',
    subject: 'History',
    class: 'Grade 11C',
    dueDate: '2025-08-05',
    submissions: 5,
    pending: 5,
    status: 'Published',
  },
];

const Assignments = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAssignments = assignments.filter((assignment) =>
    statusFilter === 'All' ? true : assignment.status === statusFilter
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Assignments</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Create Assignment
        </button>
      </div>

      <AssignmentFilterBar
        currentFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />

      <div className="flex flex-wrap gap-6">
        {filteredAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default Assignments;
