import React from 'react';

const ScheduleDashboard = () => {
  const weekSchedule = {
    Monday: [
      { type: 'Subject', name: 'Mathematics', time: '09:00 - 10:30' },
      { type: 'Event', name: 'Morning Assembly', time: '10:45 - 11:00' },
    ],
    Tuesday: [
      { type: 'Subject', name: 'Physics', time: '09:00 - 10:30' },
    ],
    Wednesday: [
      { type: 'Subject', name: 'Biology', time: '10:00 - 11:30' },
    ],
    Thursday: [
      { type: 'Event', name: 'Science Fair', time: '11:00 - 13:00' },
      { type: 'Subject', name: 'History', time: '14:00 - 15:30' },
    ],
    Friday: [
      { type: 'Subject', name: 'Chemistry', time: '08:30 - 10:00' },
    ],
  };

  return (
    <div className="p-1">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        This Week's Schedule
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-1">
        {Object.entries(weekSchedule).map(([day, activities]) => (
          <div key={day} className="bg-white rounded-xl shadow-md border p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-1">
              {day}
            </h3>
            {activities.length === 0 ? (
              <p className="text-sm text-gray-500">No activities</p>
            ) : (
              activities.map((item, idx) => (
                <div
                  key={idx}
                  className={`mb-2 p-3 rounded-md ${
                    item.type === 'Subject'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  }`}
                >
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs">{item.time}</p>
                  <span className="text-[10px] uppercase tracking-wide font-semibold">
                    {item.type}
                  </span>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleDashboard;
