import React, { useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';

const eventsData = [
  {
    id: 1,
    title: 'Mathematics Midterm Exam',
    type: 'Exam',
    date: '2025-08-10',
    time: '10:00 AM',
    location: 'Room 203',
    description: 'Chapter 1–6 midterm exam covering algebra and geometry.',
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    type: 'Meeting',
    date: '2025-08-14',
    time: '5:00 PM',
    location: 'Auditorium',
    description: 'Quarterly feedback and discussion for student progress.',
  },
  {
    id: 3,
    title: 'Independence Day - No School',
    type: 'Holiday',
    date: '2025-08-28',
    time: 'All Day',
    location: '',
    description: 'Public holiday observed school-wide.',
  },
];

const typeColorMap = {
  Exam: 'bg-red-100 text-red-700',
  Meeting: 'bg-yellow-100 text-yellow-700',
  Holiday: 'bg-green-100 text-green-700',
};

const Events = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState({}); // e.g., { 1: 'Yes', 2: 'No' }

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || event.type === typeFilter;
    const matchesDate = !dateFilter || event.date === dateFilter;

    return matchesSearch && matchesType && matchesDate;
  });

  const handleRSVP = (eventId, response) => {
    setRsvpStatus((prev) => ({ ...prev, [eventId]: response }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <CalendarDays className="text-blue-500" /> Events
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Types</option>
          <option value="Exam">Exam</option>
          <option value="Meeting">Meeting</option>
          <option value="Holiday">Holiday</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-all border-l-4 border-blue-400 space-y-2"
          >
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.description}</p>
                {event.location && (
                  <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4" /> {event.location}
                  </p>
                )}
              </div>

              <div className="text-right space-y-1">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${typeColorMap[event.type]}`}
                >
                  {event.type}
                </span>
                <div className="text-sm text-gray-600">
                  📅 {event.date}
                  <br />
                  🕒 {event.time}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-sm text-gray-700 mb-1 font-medium">RSVP:</p>
              <div className="flex gap-2">
                {['Yes', 'No', 'Maybe'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleRSVP(event.id, option)}
                    className={`px-3 py-1 text-sm rounded-full border ${
                      rsvpStatus[event.id] === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-blue-100'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {rsvpStatus[event.id] && (
                <p className="text-xs text-gray-500 mt-1">
                  You responded: <strong>{rsvpStatus[event.id]}</strong>
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
