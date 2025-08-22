import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../../firebaseConfig";
import { useToast } from "../../Universal Files/ToastProvider";

export default function UpdateClassModal({onClose,currentClassData ={},currentGeneration = ''}){

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [classData, setClassData] = useState(currentClassData)
    const [teacherData,setTeacherData] = useState({teacherID:currentClassData?.teacherID,teacherName:currentClassData?.teacherName})
    const [directions, setDirections] = useState([])
    const [teachers,setTeachers] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    useEffect(() => {
      const q = query(
        collection(db, "users"),
        where("userRole", "==", "teacher")
      );
    
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const users = snapshot.docs.map((d) => ({
            userId: d.id,          
            ...d.data(),       
          }));
          setTeachers(users);
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
      const q = query(
        collection(db, "directions"),
        where("generationID", "==", currentGeneration)
      );
    
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const dirs = snapshot.docs.map((d) => ({
            directionID: d.id,          
            ...d.data(),       
          }));
          setDirections(dirs);
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        }
      );
    
      return () => unsubscribe();
    }, []);

    useEffect(()=> {
      
      if(classData?.class && classData?.level && teacherData?.teacherID && classData?.directionID ){
        setSaveButtonDisabled(false)
      }else{
        setSaveButtonDisabled(true)
      }
    },[classData])


const saveClass = async (e) => {
   e.preventDefault();
    
    try {
      setButtonLoading(true);

      const ref = doc(db, "classes", classData.id);

      const payload = {
        class: classData.class,
        directionID:classData.directionID,
        level:classData.level,
        teacherID:teacherData.teacherID,
        teacherName:teacherData.teacherName,
        updatedDate: serverTimestamp(),
      };

      Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k]);

      await updateDoc(ref, payload); 

      toast.success(`Class updated successfully!`);
      onClose?.();
    } catch (error) {
      toast.error(`Error updating Class!}: ${error.message || error}`);
    } finally {
      setButtonLoading(false);
    }
};

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-10 animate-fade-in transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add New Class</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
           <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Class</label>
            <input
              type="text"
              className="w-full input"
              value={classData?.class}
              onChange={(e) => setClassData(prev => ({...prev , class:e.target.value}))}
              placeholder="Type the Class Name..."
            />
          </div>

          <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Level</label>
            <input
              max={3}
              min={1}
              type="number"
              className="w-full input"
              value={classData?.level}
              onChange={(e) => setClassData(prev => ({...prev , level:e.target.value}))}
              placeholder="Type the Class Level, eg. 1,2,3"
            />
          </div>

           <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">Head Teacher</label>
            <div className="relative">
              <select
                className="w-full appearance-none input pr-10 cursor-pointer"
                value={teacherData?.teacherID ?? ""}                         
                onChange={(e) => setTeacherData({  teacherID: e.target.value,teacherName:e.target.selectedOptions[0].dataset.name })}
              >
                <option value="" disabled>Select head teacher</option>
                {teachers.map(t => (
                  <option key={t.userId}  value={t.userId} data-name = {t.userName}>{t.userName}</option>
                ))}
              </select>

              <div className="absolute top-2.5 right-3 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

           <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">Direction of Study</label>
            <div className="relative">
              <select
                className="w-full appearance-none input pr-10 cursor-pointer"
                value={classData.directionID ?? ""}
                onChange={(e) => setClassData(prev => ({ ...prev, directionID: e.target.value }))}
              >
                <option value="" disabled>Select direction</option>
                {directions.map(d => (
                  <option key={d.directionID} value={d.directionID}>{d.directionName}</option>
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
              onClick={(e) => saveClass(e)}
              disabled={saveButtonDisabled}
              className={`px-6 py-2 text-base rounded-md transition 
                ${saveButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer'}`}
            >
              {buttonLoading ? <ClipLoader size={16} /> : 'Save Class'}
            </button>
        </div>
      </div>
    </div>
    )
}