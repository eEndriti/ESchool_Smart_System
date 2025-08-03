import React,{useState,useEffect} from 'react'
import Tabs from './Tabs';
import { useToast } from '../../Universal Files/ToastProvider';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ClipLoader from 'react-spinners/ClipLoader';
import AddDirectionModal from './AddDirectionModal';

const Directions = ({currentGeneration = '',onSelect}) => {

  const [loading, setLoading] = useState(false)
  const [directions, setDirections] = useState([])
  const [currentDirection, setCurrentDirection] = useState(directions[0]);
  const [directionsForTabs, setDirectionsForTabs] = useState([])
  const [addDirectionBtnLoading, setAddDirectionBtnLoading] = useState(false)
  const [addDirectionModal, setAddDirectionModal] = useState(false)
  const toast = useToast()


    useEffect(() => {
        const q = query(
            collection(db, "directions"),where("generationID" ,'==', currentGeneration)
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const dirs = snapshot.docs.map((d) => ({
                    id: d.id,          
                    ...d.data(),       
            }));
           
            setDirections(dirs)
            const tabs = dirs.map((g) => ({
                id: g.id,
                label: String(g.directionName ?? ""),
                }));

            setDirectionsForTabs(tabs);
            setLoading(false);
            },
            (err) => {
            console.error(err);
            setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [currentGeneration]);

    useEffect(()=>{
        onSelect(currentDirection)
    },[currentDirection])

  return (
    <div>
        <header className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">Directions</h2>
          <button
            onClick= {() => setAddDirectionModal(true)}
            className="rounded-lg cursor-pointer bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Direction
          </button>
        </header>
        <div className="px-3 pb-3 pt-2">
         {loading ? <ClipLoader size={30} />:  
            <>
                {directionsForTabs.length > 0 ? 
                    <Tabs
                        selected={currentDirection}
                        onSelect={setCurrentDirection}
                        arrayWithData={directionsForTabs}
                    /> : <h1 className='text-center font-medium'>There are no Directions for this Generation!</h1>}
            </>
         }
        </div>

        {addDirectionModal && <AddDirectionModal onClose = {() => setAddDirectionModal(false)} />}
    </div>
  )
}

export default Directions