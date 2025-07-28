import React from 'react';

const TeacherCard = () => {
  const today = new Date().toLocaleDateString('en-GB');


  return (
    <div className="bg-blue-100 text-blue-900 rounded-xl p-5 shadow-md">
      <h2 className="text-xl font-bold">Welcome back, Prof. Arber! </h2>
      <p className="mt-2 text-sm">Today's Date: {today}</p>
      <p className="text-sm mt-1">You have 3 classes today and 5 assignments to review.</p>
    </div>
  );
};

export default TeacherCard;
