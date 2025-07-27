import React from 'react';

const AttendanceDashboard = () => {
  const attendanceData = {
    totalDays: 180,
    present: 162,
    absent: 12,
    late: 6,
  };

  const attendancePercentage = ((attendanceData.present / attendanceData.totalDays) * 100).toFixed(1);

  return (
    <div className="p-6 max-w-3xl  space-y-6">
      
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Overall Attendance</h2>
        <p className="text-5xl font-extrabold">{attendancePercentage}%</p>
        <p className="mt-1 text-sm font-light">Based on {attendanceData.totalDays} total school days</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-xl shadow p-4 border">
          <p className="text-lg font-semibold text-gray-700">Present</p>
          <p className="text-3xl font-bold text-green-600">{attendanceData.present}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border">
          <p className="text-lg font-semibold text-gray-700">Absent</p>
          <p className="text-3xl font-bold text-red-500">{attendanceData.absent}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border">
          <p className="text-lg font-semibold text-gray-700">Late</p>
          <p className="text-3xl font-bold text-yellow-500">{attendanceData.late}</p>
        </div>
      </div>

    </div>
  );
};

export default AttendanceDashboard;
