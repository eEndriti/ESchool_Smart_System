import React, { useEffect, useState } from 'react';
import { Trash2, FilePenLine } from 'lucide-react';
import AddUserModal from '../../universalComponentModals/AddUserModal';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import manualDateFormat from '../../Universal Files/GeneralMethods';
import { faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteDocumentModal from '../../universalComponentModals/DeleteDocumentModal';
import UpdateUserModal from '../../universalComponentModals/UpdateUserModal';

const Parents = () => {
  const [addParentModal, setAddParentModal] = useState(false)
  const [loading,setLoading] = useState(true)
  const [parents, setParents] = useState([])
  const [searchParam, setSearchParam] = useState()
  const [filteredParents, setFilteredParents] = useState()
  const [deleteModal, setDeleteModal] = useState(null)
  const [updateUserData, setUpdateUserData] = useState(null)
useEffect(() => {
  const q = query(
    collection(db, "users"),
    where("userRole", "==", "parent")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const users = snapshot.docs.map((d) => ({
        userId: d.id,          
        ...d.data(),       
      }));
      setParents(users);
      setFilteredParents(users);
      setLoading(false);
    },
    (err) => {
      console.error(err);
      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);


useEffect(()=>{

    let filter = parents.filter(admin => (admin.userName?.toLowerCase().includes(searchParam?.toLowerCase())))
    setFilteredParents(filter)

},[searchParam])

  const deleteDocumet = (subject) => {
    setDeleteModal(subject)
  }
  const callUpdateModal = (subject) => {

    setUpdateUserData(subject)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Parents</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search parents..."
          className="border border-gray-300 rounded px-3 py-2 w-60 focus:outline-none focus:ring focus:ring-blue-200"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <button className='text-white bg-green-700 p-3 rounded-xl cursor-pointer hover:bg-green-800' onClick={() => setAddParentModal(true)}>Add Parent +</button>
      </div>

      {loading ? 'Loading Component...' : 
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left rounded-md overflow-hidden shadow-sm bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Parent SIDN</th>
              <th className="px-6 py-3 border-b">Full Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Role</th>
              <th className="px-6 py-3 border-b">Phone</th>
              <th className="px-6 py-3 border-b">Address</th>
              <th className="px-6 py-3 border-b">Date of Birth</th>
              <th className="px-6 py-3 border-b">Date of Join</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParents?.length > 0 ? (
              filteredParents.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 border-b">{subject.sidn}</td>
                  <td className="px-6 py-3 border-b">{subject.userName}</td>
                  <td className="px-6 py-3 border-b">{subject.email}</td>
                  <td className="px-6 py-3 border-b">{subject.userRole}</td>
                  <td className="px-6 py-3 border-b">{subject.phone}</td>
                  <td className="px-6 py-3 border-b">{subject.address}</td>
                  <td className="px-6 py-3 border-b">{manualDateFormat(subject.birthDate)}</td>
                  <td className="px-6 py-3 border-b">{manualDateFormat(subject.createdDate)}</td>
                  <td className="px-6 py-3 border-b text-center">
                   <button class="inline-flex items-center cursor-pointer gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white transition-all ease-in-out hover:text-black">
                      Details...
                   </button>



                    <button className="text-blue-600 hover:cursor-pointer hover:text-blue-800 mx-3" onClick={(e) => callUpdateModal(subject)}>
                      <FontAwesomeIcon icon={faPenToSquare} className='text-lg'/>
                        
                    </button>
                    <button className="text-red-600 hover:cursor-pointer hover:text-red-800" onClick={(e) => deleteDocumet(subject)}>
                      <FontAwesomeIcon icon={faTrash} className='text-lg'/>
                        
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">No parents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      }

      {deleteModal && <DeleteDocumentModal open={true} deleteData = {deleteModal} onClose={() => setDeleteModal(null)}   collection = {'users'} type='Parent'/>}
      {addParentModal && <AddUserModal onClose={() => setAddParentModal(false)} roles={['parent']} />}
      {updateUserData && <UpdateUserModal onClose={() => setUpdateUserData(null)} roles={['parent']} dataForUpdate={updateUserData} setUpdateUserData = {setUpdateUserData}/>} 
    </div>
  );
};

export default Parents;
