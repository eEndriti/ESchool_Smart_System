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

const Administrators = () => {
  const [addAdministratorModal, setAddAdministratorModal] = useState(false)
  const [loading,setLoading] = useState(true)
  const [administrators, setAdministrators] = useState([])
  const [searchParam, setSearchParam] = useState()
  const [filteredAdministrators, setFilteredAdministrators] = useState()
  const [deleteModal, setDeleteModal] = useState(null)
  const [updateUserData, setUpdateUserData] = useState(null)

  
useEffect(() => {
  const q = query(
    collection(db, "users"),
    where("userRole", "==", "administrator")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const users = snapshot.docs.map((d) => ({
        userId: d.id,          
        ...d.data(),       
      }));
      setAdministrators(users);
      setFilteredAdministrators(users);
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

    let filter = administrators.filter(admin => (admin.userName?.toLowerCase().includes(searchParam?.toLowerCase())))
    setFilteredAdministrators(filter)

},[searchParam])

  const deleteDocumet = (subject) => {
    setDeleteModal(subject)
  }
  const callUpdateModal = (subject) => {

    setUpdateUserData(subject)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Administrators</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search administrators..."
          className="border border-gray-300 rounded px-3 py-2 w-60 focus:outline-none focus:ring focus:ring-blue-200"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <button className='text-white bg-green-700 p-3 rounded-xl cursor-pointer hover:bg-green-800' onClick={() => setAddAdministratorModal(true)}>Add Adminstrator +</button>
      </div>

      {loading ? 'Loading Component...' : 
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left rounded-md overflow-hidden shadow-sm bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Administrator SIDN</th>
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
            {filteredAdministrators?.length > 0 ? (
              filteredAdministrators.map((subject) => (
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
                <td colSpan="5" className="text-center text-gray-500 py-4">No administrators found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      }

      {deleteModal && <DeleteDocumentModal open={true} deleteData = {deleteModal} onClose={() => setDeleteModal(null)}   collection = {'users'} type='Administrator'/>}
      {addAdministratorModal && <AddUserModal onClose={() => setAddAdministratorModal(false)} roles={['Administrator']} />}
      {updateUserData && <UpdateUserModal onClose={() => setUpdateUserData(null)} roles={['Administrator']} dataForUpdate={updateUserData} setUpdateUserData = {setUpdateUserData}/>} 
    </div>
  );
};

export default Administrators;
