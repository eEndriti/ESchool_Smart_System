import  { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from '../../Universal Files/ToastProvider';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';


const AddDirectionModal = ({ onClose }) => {
  const [loading, setLoading] = useState(true)
  const [saveButtonDisabled,setSaveButtonDisabled] = useState(true)
  const [buttonLoading,setButtonLoading] = useState(false)
  const [directionName,setDirectionName] = useState(null)
  const [selectedGeneration,setSelectedGeneration] = useState({generationID:'',generationYear:''})
  const [generations, setGenerations] = useState([])
  const toast = useToast()
  
  useEffect(() => {
    console.log(selectedGeneration)
    if (directionName && selectedGeneration) {
      setSaveButtonDisabled(false)
    }else {
      setSaveButtonDisabled(true)
    }
   
  }, [directionName , selectedGeneration]);

useEffect(() => {
    const q = query(
        collection(db, "generation")
    );

    const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
        const gens = snapshot.docs.map((d) => ({
            id: d.id,          
            ...d.data(),       
        }));
        setGenerations(gens)
        setLoading(false);
        },
        (err) => {
        console.error(err);
        setLoading(false);
        }
    );

    return () => unsubscribe();
    }, []);

const saveDirection = async (e) => {
  e.preventDefault();
    try {
        setButtonLoading(true)
        await addDoc(collection(db, "directions"), {
        directionName: directionName,
        ...selectedGeneration,
        createdDate: new Date().toISOString(),
        });

        toast.success('Direction is added successfully!')
        onClose?.()
    } catch (error) {
        toast.error('Error Saving Direction: ',error)
        console.log(error)
    }finally{
        setButtonLoading(false)
    } 
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-10 animate-fade-in transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add New Direction</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Direction Name</label>
            <input
              type="text"
              className="w-full input"
              value={directionName}
              onChange={(e) => setDirectionName(e.target.value)}
              placeholder="General Medicine, Tooth technic"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-gray-700">Generations</label>
                <div className="relative">
                {loading ? <ClipLoader size={16} /> : <select
                    className="w-full appearance-none input pr-10 cursor-pointer"
                    value={selectedGeneration.generationID} 
                    onChange={(e) => setSelectedGeneration({  generationID: e.target.value,generationYear:e.target.selectedOptions[0].dataset.name })}
                >
                                  <option value="" disabled>Select Generation</option>

                    {generations.map((r) => (
                        
                    <option key={r.id} value={r.id} data-name = {r.year}>{r.year}</option>
                    ))}
                </select>}
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
              onClick={(e) => saveDirection(e)}
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

export default AddDirectionModal;
