import React, { useState } from 'react';
import { Eye, Pencil } from 'lucide-react';

const dummySubjects = [
  { id: 1, name: 'Mathematics', teacher: 'Mrs. Smith', credits: 5, class: '10-A' },
  { id: 2, name: 'Biology', teacher: 'Dr. John', credits: 3, class: '11-B' },
  { id: 3, name: 'Physics', teacher: 'Mr. Brown', credits: 4, class: '12-A' },
];

const Subjects = () => {
  const [search, setSearch] = useState('');
  
  const filteredSubjects = dummySubjects.filter(sub =>
    sub.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Subjects</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search subjects..."
          className="border border-gray-300 rounded px-3 py-2 w-60 focus:outline-none focus:ring focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Future dropdowns or filters can go here */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left rounded-md overflow-hidden shadow-sm bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Subject</th>
              <th className="px-6 py-3 border-b">Teacher</th>
              <th className="px-6 py-3 border-b">Credits</th>
              <th className="px-6 py-3 border-b">Class</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 border-b">{subject.name}</td>
                  <td className="px-6 py-3 border-b">{subject.teacher}</td>
                  <td className="px-6 py-3 border-b">{subject.credits}</td>
                  <td className="px-6 py-3 border-b">{subject.class}</td>
                  <td className="px-6 py-3 border-b text-center">
                    <button className="text-blue-600 hover:underline mr-3">
                      <Eye size={16} className="inline mr-1" />
                      View
                    </button>
                    <button className="text-yellow-600 hover:underline">
                      <Pencil size={16} className="inline mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">No subjects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subjects;
