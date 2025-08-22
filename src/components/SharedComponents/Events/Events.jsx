import React, { useContext, useEffect, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import EventCard from './EventCard';
import AddEvent from './AddEvent';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { UserContext } from '../../Universal Files/UserContext';
import DeleteDocumentModal from '../../universalComponentModals/DeleteDocumentModal';


const Events = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [addEvent, setAddEvent] = useState()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [eventTypes, setEventTypes] = useState([])
  const {userRole} = useContext(UserContext)
  const [deleteEvent, setDeleteEvent] = useState()
  useEffect(() => {
    setLoading(true)
            const q = query(
              collection(db, "events")
            );
          
            const unsubscribe = onSnapshot(
              q,
              (snapshot) => {
                const dirs = snapshot.docs.map((d) => ({
                  id: d.id,          
                  ...d.data(),       
                }));
                setEvents(dirs);
                setLoading(false);

              },
              (err) => {
                console.error(err);
                setLoading(false);
              }
            );
          
            return () => unsubscribe();
          }, []);

    useEffect(() => {
    setLoading(true)
            const q = query(
              collection(db, "eventTypes")
            );
          
            const unsubscribe = onSnapshot(
              q,
              (snapshot) => {
                const dirs = snapshot.docs.map((d) => ({
                  id: d.id,          
                  ...d.data(),       
                }));
                setEventTypes(dirs);
                setLoading(false);

              },
              (err) => {
                console.error(err);
                setLoading(false);
              }
            );
          
            return () => unsubscribe();
          }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All' || event.type === typeFilter;
    const matchesDate = !dateFilter || event.date === dateFilter;

    return matchesSearch && matchesType && matchesDate;
  });

 
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <CalendarDays className="text-blue-500" /> Events
      </h1>

      <div className="flex flex-col md:flex-row justify-between ">

        <div className='flex flex-row gap-4  w-200'>
            <input
            type="text"
            placeholder="Search by title or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="All" disabled>All Types</option>
            {eventTypes.map((type) => (
              <option key={type.id}>{type.type}</option>
            ))}
            
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />

        </div>

        <div className=''>
          <button className='text-white bg-green-700 p-3 rounded-xl cursor-pointer hover:bg-green-800' onClick={() => setAddEvent(true)}>Add Event +</button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        filteredEvents.map((event) => (
          <EventCard event={event} userRole={userRole} onDelete={(event) => setDeleteEvent(event)}/>
        ))
      )}


      {addEvent && <AddEvent show = {addEvent} onClose={(e) => setAddEvent(null)} />}
      {deleteEvent && <DeleteDocumentModal open={deleteEvent} onClose={(e) => setDeleteEvent(null)} collection='events' type='Event' deleteData={deleteEvent}/>}

    </div>
  );
};

export default Events;
