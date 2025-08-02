import  { useState, useEffect } from 'react';
import {   serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig.js';
import { useToast } from "../Universal Files/ToastProvider"; 
import ClipLoader from "react-spinners/ClipLoader";

const UpdateUserModal = ({ onClose,roles = '',dataForUpdate = {},setUpdateUserData }) => {
 
  const [role, setRole] = useState(roles[0]);
  const [saveButtonDisabled,setSaveButtonDisabled] = useState(true)
  const [buttonLoading,setButtonLoading] = useState(false)
  
  const toast = useToast()
  
  useEffect(() => {
    if (dataForUpdate?.userName && dataForUpdate?.sidn && dataForUpdate?.email && dataForUpdate?.birthDate && dataForUpdate?.phone && dataForUpdate?.address ) {
      setSaveButtonDisabled(false)
    }else {
      setSaveButtonDisabled(true)
    }

  }, [dataForUpdate]);


const updateUser = async (e) => {
  e.preventDefault();
  if (!dataForUpdate?.userId) {
    toast.error("Missing user id to update.");
    return;
  }
  try {
    setButtonLoading(true);

    const ref = doc(db, "users", dataForUpdate.userId);

    const payload = {
      userName: dataForUpdate.userName,
      password:dataForUpdate.password,
      birthDate:dataForUpdate.birthDate,
      phone:dataForUpdate.phone,
      address:dataForUpdate.address,
      updatedDate: serverTimestamp(),
    };

    Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

    await updateDoc(ref, payload); 

    toast.success(`${dataForUpdate?.userRole ?? "User"} updated successfully!`);
    onClose?.();
  } catch (error) {
    toast.error(`Error updating ${dataForUpdate?.userRole ?? "User"}: ${error.message || error}`);
  } finally {
    setButtonLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-10 animate-fade-in transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Update {role}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full input"
              value={dataForUpdate?.userName}
              onChange={(e) =>setUpdateUserData(prev => ({ ...prev, userName: e.target.value }))}
            />
          </div>

          <div>
            <label className="flex justify-between items-center py-2 mb-2 font-semibold text-gray-700">
              SIDN
             
            </label>
            <input
              type="text"
              className="w-full input bg-gray-100 cursor-not-allowed"
              value={dataForUpdate.sidn} disabled = {true}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex justify-between items-center mb-2 font-semibold text-gray-700">
              Email
             
            </label>
            <input
              type="text"
              className="w-full input bg-gray-100 cursor-not-allowed"
              value={dataForUpdate.email}
              readOnly
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full input"
              onChange={(e) =>setUpdateUserData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Type the new Password"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Birth Date</label>
            <input
              type="date"
              className="w-full input"
              value={dataForUpdate.birthDate}
              onChange={(e) =>setUpdateUserData(prev => ({ ...prev, birthDate: e.target.value }))}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              className="w-full input"
              value={dataForUpdate.phone}
              onChange={(e) =>setUpdateUserData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone Number with Entry..."
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Address</label>
            <input
              type="text"
              className="w-full input"
              value={dataForUpdate.address}
              onChange={(e) =>setUpdateUserData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="City, Street..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">Role</label>
            <div className="relative">
              <select
                className="w-full appearance-none input pr-10 cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <div className="absolute top-2.5 right-3 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={onClose}
            className="px-5 py-2 text-base rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
              onClick={(e) => updateUser(e)}
              disabled={saveButtonDisabled}
              className={`px-6 py-2 text-base rounded-md transition 
                ${saveButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer'}`}
            >
              {buttonLoading ? <ClipLoader size={16} /> : 'Save User'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
