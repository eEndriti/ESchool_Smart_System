import { addDoc, collection, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import  { useState, useEffect } from 'react';
import { AlertTriangle } from "lucide-react";

import ClipLoader from "react-spinners/ClipLoader";
import { db } from '../../../firebaseConfig';
import { useToast } from '../../Universal Files/ToastProvider';


const AddEvent = ({show, onClose }) => {
    
    const [event, setEvent] = useState({name:'',description:'',location:'',dateTime:''})
    const [types, setTypes] = useState([])
    const [generation, setGeneration] = useState([])
    const [selectedType, setSelectedType] = useState({id:'',type:''})
    const [directions, setDirections] = useState([])
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState({id:'',class:''})
    const [selectedDirection, setSelectedDirection] = useState({id:'',directionName:''})
    const [selectedGeneration,setSelectedGeneration] = useState({id:'',year:''})
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [eventApply, setEventApply] = useState({text:'',category:'',collectionID:''})
    const toast = useToast()
    useEffect(() => {
          const q = query(
            collection(db, "eventTypes")
          );
        
          const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
              const dirs = snapshot.docs.map((d) => ({
                id: d.id,          
                ...d.data(),       
              }));
              setTypes(dirs);
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
            collection(db, "generation")
          );
        
          const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
              const dirs = snapshot.docs.map((d) => ({
                id: d.id,          
                ...d.data(),       
              }));
              setGeneration(dirs);
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

    useEffect(() => {
    const q = query(
      collection(db, "classes")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const dirs = snapshot.docs.map((d) => ({
          id: d.id,          
          ...d.data(),       
        }));
        setClasses(dirs);
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
      if(selectedClass.id){
        setEventApply(
          {
            text:' the current selected Class only !',
            category:'class',
            collectionID:selectedClass.id
          }
        )
      }else if(selectedDirection.id){
        setEventApply(
          {
            text:' the current selected Direction (All of Classes of it) !',
            category:'direction',
            collectionID:selectedDirection.id
          }
        )
      }else if(selectedGeneration.id){
        setEventApply(
          {
            text:' the current selected Generation (All Directions,Classes of it) !',
            category:'generation',
            collectionID:selectedGeneration.id
          }
        )
      }else {
        setEventApply(
          {
            text:' All Generations,Directions and Classes !',
            category:'everyone'
          }
        )
      }
    },[selectedClass,selectedDirection,selectedGeneration])
  
    useEffect(() => {
     
      if(event.name && event.description && event.location  && selectedType.id && event.dateTime){
        setSaveButtonDisabled(false)
      }else {
        setSaveButtonDisabled(true)
      }
    },[event,selectedType])

    const addEvent = async (e) => {
      e.preventDefault()

      try {
        setButtonLoading(true)

        let objectWithData = {name:event.name,
          description:event.description,
          location:event.location,
          dateTime:event.dateTime,
          typeId:selectedType.id,
          type:selectedType.type,
          appliesTo:eventApply.category,
          createdDate: serverTimestamp()
        }

        if(eventApply.category != 'everyone'){
          objectWithData = {
            ...objectWithData,
            collectionID:eventApply.collectionID
          }
        }

        await addDoc(collection(db,'events'),objectWithData)
        toast.success('Event is saved successfully!')
        onClose()

      } catch (error) {
        toast.error('Error saving Event!: ',error)
      }finally{
        setButtonLoading(false)
      }

    }


  if(!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-10 animate-fade-in transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add New Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Event Name</label>
            <input
              type="text"
              className="w-full input cursor-pointer" 
              value={event.name}
              onChange={(e) => setEvent(prev => ({...prev, name:e.target.value}))}
              placeholder="Event Name..."
            />
          </div>

        <div >
            <label className="block mb-2 py-2 font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              className="w-full input cursor-pointer" 
              value={event.location}
              onChange={(e) => setEvent(prev => ({...prev, location:e.target.value}))}
              placeholder="Where will be the event held? Room 101?"

            />
          </div>

          <div className="md:col-span-2">
            <label className="flex justify-between items-center mb-2 font-semibold text-gray-700">
              Event Description
            </label>
            <input
              type="text"
              value={event.description}
              className="w-full input cursor-pointer" 
              onChange={(e) => setEvent(prev => ({...prev, description:e.target.value}))}
              placeholder="Short Description what's the event about..."
            />
          </div>

          

          <div>
            <label className="block mb-2  font-semibold text-gray-700">
              Date and Time
            </label>
            <input
              type="datetime-local"
              className="w-full input cursor-pointer"
              value={event.dateTime}
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, dateTime: e.target.value }))
              }
            />
          </div>


          <div className="md:col-span-1">
            <label className="block mb-2 font-semibold text-gray-700">Type</label>
            <div className="relative">
              <select
                className="w-full appearance-none input pr-10 cursor-pointer"
                value={selectedType.id ?? ""}
                onChange={(e) => setSelectedType({  id: e.target.value,type:e.target.selectedOptions[0].dataset.name })}
              >
                <option value="" disabled>Select Event Type</option>
                {types.map(t => (
                  <option key={t.id} value={t.id} data-name = {t.type}>{t.type}</option>
                ))}
              </select>

              <div className="absolute top-2.5 right-3 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block mb-2 font-semibold text-gray-700">Generation</label>
            <div className="relative">
              <select
                className="w-full appearance-none input pr-10 cursor-pointer"
                value={selectedGeneration.id ?? ""}
                onChange={(e) => setSelectedGeneration({  id: e.target.value,typeName:e.target.selectedOptions[0].dataset.year })}
              >
                <option value="" disabled>Select Generation</option>
                {generation.map(t => (
                  <option key={t.id} value={t.id} data-name = {t.year}>{t.year}</option>
                ))}
              </select>

              <div className="absolute top-2.5 right-3 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          {selectedGeneration.id && 
            <div className="md:col-span-1">
              <label className="block mb-2 font-semibold text-gray-700">Direction</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none input pr-10 cursor-pointer"
                    value={selectedDirection.id ?? ""}
                    onChange={(e) => setSelectedDirection({  id: e.target.value,typeName:e.target.selectedOptions[0].dataset.directionName })}
                  >
                    <option value="" disabled>Select Direction</option>
                    {directions.map(t => (
                      <option key={t.id} value={t.id} data-name = {t.directionName}>{t.directionName}</option>
                    ))}
                  </select>

                  <div className="absolute top-2.5 right-3 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
            </div>
          }

          {selectedDirection.id && <div className="md:col-span-1">
              <label className="block mb-2 font-semibold text-gray-700">Class</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none input pr-10 cursor-pointer"
                    value={selectedClass.id ?? ""}
                    onChange={(e) => setSelectedClass({  id: e.target.value,typeName:e.target.selectedOptions[0].dataset.class })}
                  >
                    <option value="" disabled>Select Class</option>
                    {classes.map(t => (
                      <option key={t.id} value={t.id} data-name = {t.class}>{t.class} - Level: {t.level}</option>
                    ))}
                  </select>

                  <div className="absolute top-2.5 right-3 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
            </div>}

        <div className="md:col-span-2 flex items-center gap-2 bg-amber-200 text-amber-900 p-3 rounded-lg">
          
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>
            With Current Selection the Event will apply to {eventApply.text}
          </span>
        </div>

        <div className="flex md:col-span-2 justify-end  gap-4 mt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-base rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
              onClick={(e) => addEvent(e)}
              disabled={saveButtonDisabled}
              className={`px-6 py-2 text-base rounded-md transition 
                ${saveButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer'}`}
            >
              {buttonLoading ? <ClipLoader size={16} /> : 'Save the Date'}
            </button>
        </div>

        

        </div>
      </div>
    </div>
  );
};

export default AddEvent;
