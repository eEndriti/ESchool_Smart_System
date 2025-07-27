import React from 'react';
import StudentCard from './StudentCard';
import GradesDashboard from './GradesDashboard';
import AttendanceDashboard from './AttendanceDashboard';
import ScheduleDashboard from './ScheduleDashboard';
import NotificationsDashboard from './NotificationsDashboard';

const Student = () => {
  return (
    <div className="p-9">

      <div className="flex flex-col lg:flex-row gap-6 mb-5">
        <div className="w-full lg:max-w-sm">
          <StudentCard />
        </div>

        <div className="flex-1">
          <ScheduleDashboard />
        </div>
      </div>
<hr/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GradesDashboard />
        <AttendanceDashboard />
        <NotificationsDashboard />
      </div>

    </div>
  );
};

export default Student;
