import { useState } from 'react';
import { MapPin, Trash2, Pencil } from 'lucide-react';
import manualDateFormat from '../../Universal Files/GeneralMethods';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import DeleteDocumentModal from '../../universalComponentModals/DeleteDocumentModal';

const EventCard = ({ event, userRole,onDelete }) => {



  const typeColorMap = {
    Exam: 'bg-red-100 text-red-700 border-red-300',
    Meeting: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Holiday: 'bg-green-100 text-green-700 border-green-300',
    Default: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  const formattedDate = manualDateFormat(event.dateTime).split(' ');

  return (
    <div
      key={event.id}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.02] border-l-4 p-5 space-y-3 group cursor-pointer"
    >
     

      <div className="flex justify-between items-start flex-wrap gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-gray-800 leading-tight">{event.name}</h2>
          <p className="text-sm text-gray-600">{event.description}</p>
          {event.location && (
            <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4" /> {event.location}
            </p>
          )}
        </div>

        <div className="text-right space-y-2">
          <div className='flex flex-row gap-5'>
            {(userRole == 'principal' || userRole == 'administrator') && (
              <div className=" flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onDelete(event)}
                    title="Delete"
                    className="rounded-md px-2 py-1 text-sm text-rose-700 hover:bg-rose-200   cursor-pointer">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
              </div>
            )}

            <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${
                  typeColorMap[event.type] || typeColorMap.Default
                }`}
              >
                {event.type}
            </span>
          </div>
          
          <div className="text-sm text-gray-600 bg-gray-50 rounded-md px-2 py-1 shadow-inner">
            <div>📅 {formattedDate[0]}</div>
            <div>🕒 {formattedDate[1]}</div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default EventCard;
