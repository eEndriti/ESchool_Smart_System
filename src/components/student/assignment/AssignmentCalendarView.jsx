import React,{useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import AssignmentCard from './AssignmentCard';

const AssignmentCalendarView = ({ assignments }) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [clickedAssignment,setClickedAssignment] = useState(null)

    
const handleDateClick = (value) => {
  const clickedDate = value.toLocaleDateString('en-CA');
  setSelectedDate(clickedDate);
 
};

useEffect(() => {
 const as =  assignments.find((a) => (
    a.dueDate == selectedDate
 ))
 setClickedAssignment(as)
},[selectedDate])


  const tileContent = ({ date }) => {
    const dateStr = date.toLocaleDateString('en-CA').split('T')[0];
    const match = assignments.find((a) => a.dueDate === dateStr);
    if (match) {
      return <span className="text-red-500 text-xs">📌</span>;
    }
    return null;
  };

  return (
    <div className=" p-4 rounded-xl   w-full">
        <div className="text-sm text-gray-500 m-2">📌 indicates a due assignment</div>
        <div className='flex flex-row flex-wrap gap-6'>
            <Calendar
            tileContent={tileContent}
            onClickDay={handleDateClick}
            className="REACT-CALENDAR p-2 rounded-lg"
        />
        {selectedDate && (
            <div className="mt-4 text-sm text-gray-700 flex flex-row flex-wrap">
            {clickedAssignment &&  <AssignmentCard key={clickedAssignment.id} assignment={clickedAssignment} />}
            </div>
        )}
        </div>
    </div>
  );
};

export default AssignmentCalendarView;
