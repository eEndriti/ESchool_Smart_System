import React, { useState } from 'react';
import {PanelRightOpen} from 'lucide-react'
const SubjectsList = ({ subjects, onSelect, onCollapse }) => {
  const [active, setActive] = useState(null);

  return (
    <div className="w-fit px-5 h-full bg-[#64748B] text-white flex flex-col shadow-md border-r rounded-r-xl ">
        
      <div className="flex flex-row justify-between  p-3 border-b border-slate-700">
         <h2 className="text-start mx-3">
            Subjects List
        </h2>
         <button
          onClick={onCollapse}
          className="text-white hover:text-slate-300 transition cursor-pointer "
          title="Collapse"
        >
          <PanelRightOpen/> 
        </button>
      </div>

     

      <ul className="flex-1 px-2 py-1 space-y-1">
        {subjects.map((subject) => (
          <li
            key={subject.id}
            onClick={() => {
              onSelect(subject);
              setActive(subject.id);
            }}
            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium tracking-wide transition
              ${
                active === subject.id
                  ? 'text-slate-300 bg-[#1E293B]'
                  : 'text-white hover:text-slate-300 hover:bg-[#1E293B]'
              }`}
          >
            {subject.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectsList;
