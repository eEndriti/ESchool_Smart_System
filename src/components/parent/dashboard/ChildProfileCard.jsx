import React from 'react';
import userIcon from '../../../assets/images/userIcon.png'

const ChildProfileCard = ({ child }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow">
        <img src={userIcon} alt="Child Profile" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{child.name}</h3>
        <p className="text-sm text-gray-500">Class: {child.className}</p>
        <p className="text-sm text-gray-500">Student ID: {child.id}</p>
      </div>
    </div>
  );
};

export default ChildProfileCard;
