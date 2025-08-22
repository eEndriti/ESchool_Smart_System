import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../../firebaseConfig";
import { useToast } from "../../Universal Files/ToastProvider";

export default function AddSubjectModal({onClose}){
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [directions, setDirections] = useState([])
    const [subjectData, setSubjectData] = useState({})
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const [directionData, setDirectionData] = useState({directionID:'',directionName:''})
    const [teacherData, setTeacherData] = useState({teacherID:'',teacherName:''})
    const [selectedGeneration, setSelectedGeneration] = useState()
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
        collection(db, "directions")
      );
    
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const dirs = snapshot.docs.map((d) => ({
            id: d.id,          
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
      if(subjectData.subject && subjectData.credits && subjectData?.credits > 0 && teacherData.teacherID && directionData.directionID){
        const generation = directions.find((d => d.id == directionData.directionID ))
        setSelectedGeneration(generation.generationYear)
        setSaveButtonDisabled(false)
      }else{
        setSaveButtonDisabled(true)
      }
    },[subjectData,teacherData,directionData])


const saveSubject = async (e) => {
  e.preventDefault();
    try {
        setButtonLoading(true)
        await addDoc(collection(db, "subjects"), {
          
          ...subjectData,
          ...teacherData,
          ...directionData,
          generationYear: selectedGeneration, 
          createdDate: new Date().toISOString(),
        });

        toast.success('Subject is added successfully!')
        onClose?.()
    } catch (error) {
        toast.error('Error Saving Subject: ',error)
        console.log(error)
    }finally{
        setButtonLoading(false)
    } 
};

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-10 animate-fade-in transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add New Subject</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
           <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Subject</label>
            <input
              type="text"
              className="w-full input"
              value={subjectData?.subject}
              onChange={(e) => setSubjectData(prev => ({...prev , subject:e.target.value}))}
              placeholder="Type the Subject Name..."
            />
          </div>

          <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Credits</label>
            <input
              max={10}
              min={1}
              type="number"
              className="w-full input"
              value={subjectData?.credits}
              onChange={(e) => setSubjectData(prev => ({...prev , credits:e.target.value}))}
              placeholder="Type the Subject's Credit Level"
            />
          </div>

           <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">Teacher</label>
            <div className="relative">
              <select
                className="w-full appearance-none input pr-10 cursor-pointer"
                value={teacherData?.teacherID ?? ""}                         
                onChange={(e) => setTeacherData({  teacherID: e.target.value,teacherName:e.target.selectedOptions[0].dataset.name })}
              >
                <option value="" disabled>Select Teacher</option>
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
            <label className="block mb-2 font-semibold text-gray-700">Direction</label>
            <div className="relative">
              <select
                className="w-full appearance-none input pr-10 cursor-pointer"
                value={directionData.directionID ?? ""}
                onChange={(e) => setDirectionData({  directionID: e.target.value,directionName:e.target.selectedOptions[0].dataset.name })}
              >
                <option value="" disabled>Select Direction</option>
                {directions.map(d => (
                  <option key={d.id} value={d.id} data-name = {d.directionName}>{d.directionName}</option>
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
              onClick={(e) => saveSubject(e)}
              disabled={saveButtonDisabled}
              className={`px-6 py-2 text-base rounded-md transition 
                ${saveButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer'}`}
            >
              {buttonLoading ? <ClipLoader size={16} /> : 'Add Subject'}
            </button>
        </div>
      </div>
    </div>
    )
}