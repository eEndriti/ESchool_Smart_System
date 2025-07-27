import React, { useState } from 'react';
import AssignmentCard from './AssignmentCard';
import { Calendar, Bell, CheckCircle } from 'lucide-react';
import RecentlyGraded from './RecentlyGraded';
import AssignmentCalendarView from './AssignmentCalendarView';

const Assignments = () => {
  const [filter, setFilter] = useState('Pending');
  const [search, setSearch] = useState('');
const [showCalendar, setShowCalendar] = useState(false);

  const assignments = [
    {
      id: 1,
      title: 'Algebra Worksheet 3',
      subject: 'Mathematics',
      dueDate: '2025-07-30',
      status: 'Pending',
      description: 'Solve equations on page 42.',
      attachment: 'worksheet.pdf',
    },
    {
      id: 2,
      title: 'WWII Essay',
      subject: 'History',
      dueDate: '2025-07-25',
      status: 'Graded',
      grade: 'A-',
      feedback: 'Solid research!',
    },
    {
      id: 3,
      title: 'Photosynthesis Quiz',
      subject: 'Biology',
      dueDate: '2025-07-01',
      status: 'Submitted',
    },
    {
      id: 4,
      title: 'Chemistry Lab Report',
      subject: 'Chemistry',
      dueDate: '2025-07-27',
      status: 'Pending',
    },
    {
      id: 5,
      title: 'Geometry Assignment',
      subject: 'Mathematics',
      dueDate: '2025-07-03',
      status: 'Graded',
      grade: 'B+',
    },
  ];

  // Derived data
  const filtered = assignments
    .filter((a) => a.status === filter)
    .filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase())
    );

  const recentlyGraded = assignments.filter((a) => a.status === 'Graded').slice(0, 2);
  const dueToday = assignments.filter((a) => a.dueDate === new Date().toISOString().split('T')[0]);
  const graded = assignments.filter((a) => a.status === 'Graded').length;
  const completed = assignments.filter((a) => a.status !== 'Pending').length;
  const total = assignments.length;
  const progress = Math.round((completed / total) * 100);

  const filters = ['Pending', 'Submitted', 'Graded'];

  return (
    <div className="p-6 px-10 mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-blue-800">My Assignments</h1>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
          <CheckCircle size={18} />
          {completed} of {total} completed ({progress}%)
        </div>

        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm">
          <Bell size={18} />
          {dueToday.length} Due Today | {graded} Graded
        </div>

        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="ml-auto flex items-center gap-2 px-4 py-2 border rounded-full text-sm hover:bg-blue-100 text-blue-700 border-blue-300 transition"
        >
          <Calendar size={18} />
          {showCalendar ? 'Card View' : 'Calendar View'}
        </button>
      </div>

      <div className="flex gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full border text-sm ${
              filter === f
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 hover:bg-blue-100 border-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Search assignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showCalendar ? (
          <AssignmentCalendarView assignments={assignments} />
        ) : (
          <div className="flex flex-wrap gap-6">
            {filtered.length > 0 ? (
              filtered.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))
            ) : (
              <p className="text-gray-500">No assignments match your search/filter.</p>
            )}
          </div>
        )}

    </div>
  );
};

export default Assignments;
