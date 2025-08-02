import React, { useEffect, useState } from 'react';
import ClassTable from './ClassTable';
import ClassFormModal from './ClassFormModal';
import AddClassModal from './AddClassModal';
import Tabs from './Tabs';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useToast } from '../../Universal Files/ToastProvider';
import GeneralConfirmModal from '../../Universal Files/GeneralConfirmModal';
import ClipLoader from 'react-spinners/ClipLoader';

const sampleData = {
  2019: [{ id: 1, name: '9-A', teacher: 'Mrs. Smith', students: 22, generation: 2019 }],
  2020: [{ id: 2, name: '10-B', teacher: 'Mr. John', students: 25, generation: 2020 }],
};

const directionsList = ['Medicine', 'Tooth', 'Heart']; 

const Classes = () => {
  const [loading, setLoading] = useState(true)
  const [generations, setGenerations] = useState([])
  const [generationForTabs, setGenerationForTabs] = useState([])
  const [generation, setGeneration] = useState(2019);
  const [direction, setDirection] = useState(directionsList[0]);
  const [classes, setClasses] = useState(sampleData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openAddClassModal, setOpenAddClassModal] = useState(false);
  const [generalConfirmModal, setGeneralConfirmModal] = useState(false)
  const [addGenerationButtonLoading, setAddGenerationButtonLoading] = useState(false)
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
  const onAddDirection = () => {
    const name = prompt('Add direction name:');
    if (!name) return;
    directionsList.push(name);
    setDirection(name);
  };

  return (
    <div className="mx-auto max-w-8xl p-6 space-y-6">

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
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
            selected={direction}
            onSelect={setDirection}
            arrayWithData={generationForTabs}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <header className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">Directions</h2>
          <button
            onClick={onAddDirection}
            className="rounded-lg cursor-pointer bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Direction
          </button>
        </header>
        <div className="px-3 pb-3 pt-2">
          <Tabs
            selected={direction}
            onSelect={setDirection}
            arrayWithData={directionsList}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <header className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Classes</h2>
            <p className="text-xs text-gray-500">
              Generation <span className="font-medium">{generation}</span>
              {direction ? ` • Direction ${direction}` : null}
            </p>
          </div>
          <button
            onClick={() => setOpenAddClassModal(true)}
            className="rounded-lg cursor-pointer bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Class
          </button>
        </header>

        <div className="p-4">
          <ClassTable
            data={classes[generation] || []}

          />
        </div>
      </section>

      {modalOpen && (
        <ClassFormModal
          onClose={() => setModalOpen(false)}
          initialData={selectedClass}
          generation={generation}
          onSave={handleSave}
        />
      )}
      {openAddClassModal && (
        <AddClassModal onClose={() => setOpenAddClassModal(false)} />
      )}

      { generalConfirmModal && (<GeneralConfirmModal open = {true} title = {`The Generation ${currentYear} will be added, please confirm if you want to proceed`} 
          onClose = {(e) => setGeneralConfirmModal(false)} onYes = {(e) => addGenerationApproved(e)}/>)}
    </div>
  );
};

export default Classes;
