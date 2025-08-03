import React, { useEffect, useState } from 'react';
import ClassTable from './ClassTable';
import ClassFormModal from './ClassFormModal';
import AddClassModal from './AddClassModal';
import Tabs from './Tabs';
import { useToast } from '../../Universal Files/ToastProvider';
import GeneralConfirmModal from '../../Universal Files/GeneralConfirmModal';
import Generations from './Generations';
import Directions from './Directions';

const sampleData = {
  2019: [{ id: 1, name: '9-A', teacher: 'Mrs. Smith', students: 22, generation: 2019 }],
  2020: [{ id: 2, name: '10-B', teacher: 'Mr. John', students: 25, generation: 2020 }],
};


const Classes = () => {

  const [generation, setGeneration] = useState(2019);
  const [currentGeneration, setCurrentGeneration] = useState()
  const [currentDirection, setCurrentDirection] = useState()
  const [classes, setClasses] = useState(sampleData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [openAddClassModal, setOpenAddClassModal] = useState(false);

  const toast = useToast()


  return (
    <div className="mx-auto max-w-8xl p-6 space-y-6">

      <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
       <Generations onSelect={setCurrentGeneration}/>
      </section>

      {currentGeneration && <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Directions currentGeneration = {currentGeneration} onSelect={setCurrentDirection}/>
       
      </section>}

      {currentDirection && <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <header className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Classes</h2>
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
            direction = {currentDirection}

          />
        </div>
      </section>}

      {modalOpen && (
        <ClassFormModal
          onClose={() => setModalOpen(false)}
          initialData={selectedClass}
          generation={generation}
          onSave={handleSave}
        />
      )}
      {openAddClassModal && (
        <AddClassModal onClose={() => setOpenAddClassModal(false)} currentGeneration = {currentGeneration} />
      )}

      
    </div>
  );
};

export default Classes;
