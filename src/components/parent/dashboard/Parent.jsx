import React, { useState } from 'react';
import ChildSelector from './ChildSelector';
import GradesPreview from './GradesPreview';
import AttendanceSummary from './AttendanceSummary';
import AssignmentsOverview from './AssignmentsOverview';
import MessagesFromTeachers from './MessagesFromTeachers';
import SubjectProgress from './SubjectProgress';
import ChildProfileCard from './ChildProfileCard';

const dummyChildren = [
  { id: 1, name: 'Ares Berisha',className:'A01' },
  { id: 2, name: 'Elira Berisha',className:'A01' },
];

const Parent = () => {
  const [selectedChildId, setSelectedChildId] = useState(dummyChildren[0].id);

  const selectedChild = dummyChildren.find((child) => child.id === selectedChildId);

  return (
    <div className="p-6 space-y-6">
      
      <ChildSelector
        children={dummyChildren}
        onSelect={setSelectedChildId}
        selectedId={selectedChildId}
      />

     <ChildProfileCard child={selectedChild}/>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GradesPreview childId={selectedChildId} />
        <AttendanceSummary childId={selectedChildId} />
        <AssignmentsOverview childId={selectedChildId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MessagesFromTeachers childId={selectedChildId} />
        <SubjectProgress childId={selectedChildId} />
      </div>

    </div>
  );
};

export default Parent;
