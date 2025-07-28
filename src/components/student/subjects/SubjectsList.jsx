import React, { useState } from 'react';
import { PanelRightOpen } from 'lucide-react';

const SubjectsList = ({ subjects, onSelect, onCollapse }) => {
  const [active, setActive] = useState(null);

  return (
    <div className="w-64 h-full bg-[#1B2233] text-white flex flex-col shadow-lg rounded-r-2xl transition-all duration-300 ease-in-out">
      
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <h2 className="text-lg font-semibold tracking-wide">Subjects</h2>
        <button
          onClick={onCollapse}
          className="text-gray-400 hover:text-white transition"
          title="Collapse"
        >
          <PanelRightOpen size={20} />
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {subjects.map((subject) => (
          <li key={subject.id}>
            <button
              onClick={() => {
                onSelect(subject);
                setActive(subject.id);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg transition duration-200 font-medium tracking-wide text-sm ${
                active === subject.id
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {subject.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectsList;
