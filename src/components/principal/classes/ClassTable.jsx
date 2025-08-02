import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const ClassTable = ({ data, onEdit, onDelete }) => {
  return (
         <div className="overflow-x-auto">
           <table className="min-w-full border text-sm text-left rounded-md overflow-hidden shadow-sm bg-white">
             <thead className="bg-gray-100 text-gray-700">
               <tr>
                 <th className="px-6 py-3 border-b">Class</th>
                 <th className="px-6 py-3 border-b">Teacher</th>
                 <th className="px-6 py-3 border-b">No. of Students</th>
                 <th className="px-6 py-3 border-b">Generation</th>
                 <th className="px-6 py-3 border-b text-center">Actions</th>
               </tr>
             </thead>
             <tbody>
               {data?.length > 0 ? (
                 data.map((item) => (
                   <tr key={item.id} className="hover:bg-gray-50 transition">
                     <td className="px-6 py-3 border-b">{item.class}</td>
                     <td className="px-6 py-3 border-b">{item.classTeacher}</td>
                     <td className="px-6 py-3 border-b">{item.nrStudents}</td>
                     <td className="px-6 py-3 border-b">{item.generation}</td>
                    
                     <td className="px-6 py-3 border-b text-center">
                       <button className="text-blue-600 hover:cursor-pointer hover:text-blue-800 mx-3" onClick={(e) => callUpdateModal(item)}>
                         <FontAwesomeIcon icon={faPenToSquare} className='text-lg'/>
                           
                       </button>
                       <button className="text-red-600 hover:cursor-pointer hover:text-red-800" onClick={(e) => deleteDocumet(item)}>
                         <FontAwesomeIcon icon={faTrash} className='text-lg'/>
                           
                       </button>
                     </td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan="5" className="text-center text-gray-500 py-4">No classes found.</td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>
  );
};

export default ClassTable;
