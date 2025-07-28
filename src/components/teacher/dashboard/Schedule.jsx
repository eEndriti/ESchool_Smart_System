import React from 'react';

const classes = [
  { time: "09:00 - 10:00", subject: "Math - 9A", room: "Room 101" },
  { time: "11:00 - 12:00", subject: "Physics - 10B", room: "Room 204" },
  { time: "14:00 - 15:00", subject: "Chemistry - 11C", room: "Room 303" },
];

const Schedule = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Today’s Schedule</h3>
      <ul className="divide-y text-sm">
        {classes.map((cls, index) => (
          <li key={index} className="py-2 flex justify-between text-gray-700">
            <span>{cls.time}</span>
            <span>{cls.subject}</span>
            <span>{cls.room}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
