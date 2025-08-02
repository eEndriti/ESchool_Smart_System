import React from 'react';

const AttendanceSummary = ({ childId }) => {
  const attendance = {
    present: 42,
    absent: 3,
    late: 2,
  };

  const total = attendance.present + attendance.absent + attendance.late;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-md font-semibold text-gray-700 mb-3">Attendance Summary</h3>
      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-medium text-gray-800">Present:</span> {attendance.present} days</p>
        <p><span className="font-medium text-gray-800">Absent:</span> {attendance.absent} days</p>
        <p><span className="font-medium text-gray-800">Late:</span> {attendance.late} days</p>
        <p className="pt-2 border-t"><span className="font-medium text-gray-800">Total Records:</span> {total} days</p>
      </div>
    </div>
  );
};

export default AttendanceSummary;
