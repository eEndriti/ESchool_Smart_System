import  { useState, useEffect } from 'react';
import { collection,  serverTimestamp, setDoc,doc, addDoc } from "firebase/firestore";
import { db,auth } from '../../firebaseConfig.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from "../Universal Files/ToastProvider"; 
import ClipLoader from "react-spinners/ClipLoader";


const AddGenDirModal = ({ onClose,data }) => {
  
  const [saveButtonDisabled,setSaveButtonDisabled] = useState(true)
  const [buttonLoading,setButtonLoading] = useState(false)
  const toast = useToast()
  
  useEffect(() => {
    if (fullName && sidn && email && password && birthDate && phone && address && role) {
      setSaveButtonDisabled(false)
    }else {
      setSaveButtonDisabled(true)
    }
   
  }, [fullName, sidn,fullName,password,birthDate,phone,address,role]);


const saveUser = async (e) => {
  e.preventDefault();
  try {
    setButtonLoading(true)
    await addDoc(collection(db, "users"), {
      userName: fullName,
      userRole: role.toLowerCase(),
      sidn,
      email,
      birthDate,
      password,
      phone,
      address,
      createdDate: new Date().toISOString(),
    });

    toast.success('Administrator is saved successfully!')
    onClose()

  } catch (error) {
    toast.error('Error Saving Administrator: ',error)
  }finally{
    setButtonLoading(false)
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-10 animate-fade-in transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add New {role}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="flex justify-between items-center mb-2 font-semibold text-gray-700">
              SIDN
              <button
                onClick={() => setSidn(generateSIDN())} disabled = {generateButtonDisabled}
                className={`px-6 py-2 text-base rounded-md transition
                ${generateButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Auto Generate
              </button>
            </label>
            <input
              type="text"
              className="w-full input bg-gray-100 cursor-not-allowed"
              value={sidn} disabled = {true}
              onChange={(e) => setSidn(e.target.value)}
              placeholder="SIDN-123456"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex justify-between items-center mb-2 font-semibold text-gray-700">
              Email
              <button
                onClick={() => setEmail(generateEmail(fullName, sidn))} disabled = {generateButtonDisabled}
                className={`px-6 py-2 text-base rounded-md transition
                ${generateButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                Generate
              </button>
            </label>
            <input
              type="text"
              className="w-full input bg-gray-100 cursor-not-allowed"
              value={email}
              readOnly
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Birth Date</label>
            <input
              type="date"
              className="w-full input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              className="w-full input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number with Entry..."
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Address</label>
            <input
              type="text"
              className="w-full input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              onClick={(e) => saveUser(e)}
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

export default AddGenDirModal;
