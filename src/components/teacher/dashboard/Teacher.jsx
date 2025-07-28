import React from 'react';
import Schedule from './Schedule';
import AssignmentsOverview from './AssignmentsOverview';
import QuickActions from './QuickActions';
import NotificationsPanel from './NotificationsPanel';
import TeacherCard from './TeacherCard';
import PerformanceChart from './PerformanceChart';
const Teacher = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TeacherCard/>
        <QuickActions />
        <NotificationsPanel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Schedule />
        <AssignmentsOverview />
        <PerformanceChart />
      </div>
    </div>
  );
};

export default Teacher;
