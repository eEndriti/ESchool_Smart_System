import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddSubjectModal from '../students/AddSubjectModal';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import DeleteDocumentModal from '../../universalComponentModals/DeleteDocumentModal'
import PropagateLoader from 'react-spinners/PropagateLoader';


const Subjects = () => {
  const [search, setSearch] = useState('');
  const [addSubject, setAddSubject] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteSubject,setDeleteSubject] = useState()
  useEffect(() => {
      setLoading(true)
        const q = query(
          collection(db, "subjects")
        );
      
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const users = snapshot.docs.map((d) => ({
              id: d.id,          
              ...d.data(),       
            }));
            setSubjects(users);
            setLoading(false);
          },
          (err) => {
            console.error(err);
            setLoading(false);
          }
        );
      
        return () => unsubscribe();
      }, []);

  

  const filteredSubjects = subjects.filter(sub =>
    sub.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Subjects</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search subjects..."
          className="border border-gray-300 rounded px-3 py-2 w-60 focus:outline-none focus:ring focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='text-white bg-green-700 p-3 rounded-xl cursor-pointer hover:bg-green-800' onClick={() => setAddSubject(true)}>Add Subject +</button>

      </div>

      <div className="overflow-x-auto">
        {loading ? <div className='d-flex justify-self-center'> <PropagateLoader size={28} color='#38bdf8'/> </div> :<table className="min-w-full border text-sm capitalize text-left rounded-md overflow-hidden shadow-sm bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Subject</th>
              <th className="px-6 py-3 border-b">Teacher</th>
              <th className="px-6 py-3 border-b">Credits</th>
              <th className="px-6 py-3 border-b">Direction</th>
              <th className="px-6 py-3 border-b">Generation</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 border-b ">{subject.subject}</td>
                  <td className="px-6 py-3 border-b">{subject.teacherName}</td>
                  <td className="px-6 py-3 border-b ">{subject.credits}</td>
                  <td className="px-6 py-3 border-b">{subject.directionName}</td>
                  <td className="px-6 py-3 border-b">{subject.generationYear}</td>
                  <td className="px-6 py-3 border-b text-center">
                    <button className="text-blue-600 text-lg hover:underline mr-3 cursor-pointer">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="text-red-600 text-lg hover:underline cursor-pointer" onClick={() => setDeleteSubject(subject)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">No subjects found.</td>
              </tr>
            )}
          </tbody>
        </table>}
      </div>
      {addSubject && <AddSubjectModal onClose={() => setAddSubject(false)}/>}
      {deleteSubject && <DeleteDocumentModal open={true} deleteData={deleteSubject} onClose={() => setDeleteSubject(null)} collection='subjects' type='Subject'/>}
    </div>
  );
};

export default Subjects;
