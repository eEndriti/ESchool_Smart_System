import React, { useState } from 'react';
import SubjectsList from './SubjectsList';
import SubjectContent from './SubjectContent';
import {PanelRightClose} from 'lucide-react'
const Subjects = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isListVisible, setIsListVisible] = useState(true);

  const subjects = [
    { name: 'Mathematics', id: 'math' },
    { name: 'Physics', id: 'physics' },
    { name: 'History', id: 'history' },
    { name: 'Biology', id: 'bio' },
  ];

  return (
    <div className="flex h-[calc(100vh-50px)] align-middle mt-5  transition-all">
      {isListVisible && (
        <SubjectsList
          subjects={subjects}
          onSelect={setSelectedSubject}
          onCollapse={() => setIsListVisible(false)}
        />
      )}

      <div className={`flex-1  transition-all`}>
        {!isListVisible && (
          <div className="flex justify-start p-2 w-10">
                <button
                onClick={() => setIsListVisible(true)}
                    className="mb-4 px-4 py-2  text-black rounded  cursor-pointer"                
                    title="Collapse"
                >
                <PanelRightClose/> 
                </button>
            </div>
        )}

        <SubjectContent subject={selectedSubject} />
      </div>
    </div>
  );
};

export default Subjects;
