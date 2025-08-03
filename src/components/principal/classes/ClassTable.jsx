import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ClipLoader from 'react-spinners/ClipLoader';
import DeleteDocumentModal from '../../universalComponentModals/DeleteDocumentModal';

const ClassTable = ({ direction}) => {

  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState({})
  const [deleteModal, setDeleteModal] = useState(false)

   useEffect(() => {
    setLoading(true)
          const q = query(
              collection(db, "classes"),where("directionID" ,'==', direction)
          );
  
          const unsubscribe = onSnapshot(
              q,
              (snapshot) => {
                  const classses = snapshot.docs.map((d) => ({
                      id: d.id,          
                      ...d.data(),       
              }));
             
              setClasses(classses)
              setLoading(false)
              },
              (err) => {
              console.error(err);
              setLoading(false);
              }
          );
  
          return () => unsubscribe();
      }, [direction]);
  
   
  return (
         <div className="overflow-x-auto">
           {loading ? <ClipLoader size={30} /> : <table className="min-w-full border text-sm text-left rounded-md overflow-hidden shadow-sm bg-white">
             <thead className="bg-gray-100 text-gray-700">
               <tr>
                 <th className="px-6 py-3 border-b">Class</th>
                 <th className="px-6 py-3 border-b">Level</th>
                 <th className="px-6 py-3 border-b">Teacher</th>
                 <th className="px-6 py-3 border-b">No. of Students</th>
                 <th className="px-6 py-3 border-b text-center">Actions</th>
               </tr>
             </thead>
             <tbody>
               {classes?.length > 0 ? (
                 classes.map((item) => (
                   <tr key={item.id} className="hover:bg-gray-50 transition">
                     <td className="px-6 py-3 border-b">{item.class}</td>
                     <td className="px-6 py-3 border-b">{item.level}</td>
                     <td className="px-6 py-3 border-b">{item.teacherName}</td>
                     <td className="px-6 py-3 border-b">{item.noStudents}</td>
                    
                     <td className="px-6 py-3 border-b text-center">
                       <button className="text-blue-600 hover:cursor-pointer hover:text-blue-800 mx-3" onClick={(e) => callUpdateModal(item)}>
                         <FontAwesomeIcon icon={faPenToSquare} className='text-lg'/>
                           
                       </button>
                       <button className="text-red-600 hover:cursor-pointer hover:text-red-800" onClick={(e) => setDeleteModal(item)}>
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
           </table>}

           {deleteModal && <DeleteDocumentModal open={true} onClose={() => setDeleteModal(null) } collection = "classes" deleteData = {deleteModal} type='Class'/>}
         </div>
  );
};

export default ClassTable;
