import React from 'react';
import StudentCard from './StudentCard';
import GradesDashboard from './GradesDashboard';
import AttendanceDashboard from './AttendanceDashboard';
import ScheduleDashboard from './ScheduleDashboard';
import NotificationsDashboard from './NotificationsDashboard';

const Student = () => {
  return (
    <div className="p-6 sm:p-8 md:p-10 bg-[#F9FAFB] min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        <div className="w-full lg:max-w-sm">
          <StudentCard />
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">This Week's Schedule</h2>
          <ScheduleDashboard />
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Average Grades</h2>
          <GradesDashboard />
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Attendance Overview</h2>
          <AttendanceDashboard />
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Latest Notifications</h2>
          <NotificationsDashboard />
        </div>
      </div>
    </div>
  );
};

export default Student;
