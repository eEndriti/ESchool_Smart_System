import React from 'react';
import { CalendarDays, Users, Eye, Pencil, Trash2 } from 'lucide-react';

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="w-full md:w-72 bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{assignment.title}</h2>
      <p className="text-sm text-gray-600">{assignment.subject} - {assignment.class}</p>
      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
        <CalendarDays className="w-4 h-4" />
        Due: {assignment.dueDate}
      </div>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
        <div><Users className="inline w-4 h-4" /> {assignment.submissions} Submissions</div>
        <div className="text-red-600">{assignment.pending} Pending</div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className={`text-xs px-2 py-1 rounded-full ${
          assignment.status === 'Published' ? 'bg-green-100 text-green-700' :
          assignment.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {assignment.status}
        </span>

        <div className="flex gap-2 text-gray-600">
          <Eye className="w-5 h-5 hover:text-blue-600 cursor-pointer" title="View" />
          <Pencil className="w-5 h-5 hover:text-yellow-600 cursor-pointer" title="Edit" />
          <Trash2 className="w-5 h-5 hover:text-red-600 cursor-pointer" title="Delete" />
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
