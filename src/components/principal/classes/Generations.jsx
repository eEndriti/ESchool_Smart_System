import React,{useState,useEffect} from 'react'
import ClipLoader from 'react-spinners/ClipLoader';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import GeneralConfirmModal from '../../Universal Files/GeneralConfirmModal';
import Tabs from './Tabs';
import { useToast } from '../../Universal Files/ToastProvider';

const directionsList = ['Medicine', 'Tooth', 'Heart']; 


const Generations = ({onSelect}) => {

    const [loading, setLoading] = useState(true)
    const [generationForTabs, setGenerationForTabs] = useState([])
    const [addGenerationButtonLoading, setAddGenerationButtonLoading] = useState(false)
    const [generations, setGenerations] = useState([])
    const [generalConfirmModal, setGeneralConfirmModal] = useState(false)
    const [currentGeneration, setCurrentGeneration] = useState(generationForTabs[0]);
    const toast = useToast()
    
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

        const tabs = gens.map((g) => ({
            id: g.id,
            label: String(g.year ?? ""),
            }));

        setGenerationForTabs(tabs);
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
      onSelect(currentGeneration)
    },[currentGeneration])


    let currentYear = new Date().getFullYear()

  const onAddGeneration = () => {

    let checkGen = generations.some(gen =>  gen.year == currentYear)
   
    if(!checkGen){
      setGeneralConfirmModal(true) 
    }else{
      toast.error(`The latest generation ${currentYear} already excits and cannot be duplicated!`)
    }
    
  };

  const addGenerationApproved = async(e) => {
    e.preventDefault();
      try {
        setAddGenerationButtonLoading(true)
        await addDoc(collection(db, "generation"), {
          year: currentYear,
          createdDate: new Date().toISOString(),
        });
    
        toast.success('Generation is added successfully!')
        setGeneralConfirmModal(false)
      } catch (error) {
        toast.error('Error Saving Generation: ',error)
        console.log(error)
      }finally{
        setAddGenerationButtonLoading(false)
      }
    }

 

  return (
    <div> 
        <header className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">Generations</h2>
          <button
            onClick={onAddGeneration}
            className="rounded-lg cursor-pointer bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {addGenerationButtonLoading ? <><ClipLoader size={16} /></> : '+ Add Generation'}
          </button>
        </header>

        <div className="px-3 pb-3 pt-2">
           <Tabs
                selected={currentGeneration}
                onSelect={setCurrentGeneration}
            arrayWithData={generationForTabs}
          />
        </div>

        { generalConfirmModal && (<GeneralConfirmModal open = {true} title = {`The Generation ${currentYear} will be added, please confirm if you want to proceed`} 
          onClose = {(e) => setGeneralConfirmModal(false)} onYes = {(e) => addGenerationApproved(e)}/>)}
    </div>
  )
}

export default Generations