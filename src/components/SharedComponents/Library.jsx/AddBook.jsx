import { addDoc, collection } from 'firebase/firestore';
import {useEffect, useState} from 'react'
import ClipLoader from 'react-spinners/ClipLoader';
import { db } from '../../../firebaseConfig';
import { useToast } from '../../Universal Files/ToastProvider';

const AddBook = ({show,onClose}) => {
const [bookData, setBookData] = useState({title:'',author:'',category:'',rating:'',description:'',link:''})
const [buttonLoading, setButtonLoading] = useState(false)
const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
const toast = useToast()
useEffect(() => {
    if(bookData.title && bookData.author && bookData.category && bookData.rating && bookData.description && bookData.link){
        setSaveButtonDisabled(false)
    }else{
        setSaveButtonDisabled(true)
    }
},[bookData])

const checkNumber = (value) => {
    return Number(value) > 5 || Number(value) < 1 ? null : value
}

const saveBook = async (e) => {
    e.preventDefault();
      try {
        setButtonLoading(true)
        await addDoc(collection(db, "library"), {
          ...bookData,
          createdDate: new Date().toISOString(),
        });
    
        toast.success('Book is saved successfully!')
        onClose()
    
      } catch (error) {
        toast.error('Error Saving Book: ',error)
      }finally{
        setButtonLoading(false)
      }
}

if(!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-2xl shadow-2xl p-10 animate-fade-in transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Add New Book</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl cursor-pointer">&times;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          <div>
            <label className="block mb-2 py-2 font-semibold text-gray-700">Book Title</label>
            <input
              type="text"
              className="w-full input"
              value={bookData?.title ?? ''}
              onChange={(e) => setBookData({...bookData,title:e.target.value})}
              placeholder="The Mountains..."
            />
          </div>

            <div>
                <label className="block mb-2 py-2 font-semibold text-gray-700">Book Author</label>
                <input
                type="text"
                className="w-full input"
                value={bookData?.author ?? ''}
                onChange={(e) => setBookData({...bookData,author:e.target.value})}
                placeholder="John Doe"
                />
            </div>

            <div>
                <label className="block mb-2 py-2 font-semibold text-gray-700">Book Category</label>
                <input
                type="text"
                className="w-full input"
                value={bookData?.category ?? ''}
                onChange={(e) => setBookData({...bookData,category:e.target.value})}
                placeholder="History..."
                />
            </div>

            <div>
                <label className="block mb-2 py-2 font-semibold text-gray-700">Book Rating</label>
                <input
                type="number"
                min={1} max={5}
                className="w-full input"
                value={bookData?.rating ?? ''} 
                onChange={(e) => setBookData({...bookData,rating:checkNumber(e.target.value)})}
                placeholder="1,2,3"
                />
            </div>

            
        </div>
            <div>
                <label className="block mb-2 py-2 font-semibold text-gray-700">Book Description</label>
                <textarea
                type="text"
                className="w-full input"
                value={bookData?.description ?? ''} onKeyDown={null}
                onChange={(e) => setBookData({...bookData,description:e.target.value})}
                />
            </div>

            <div>
                <label className="block mb-2 py-2 font-semibold text-gray-700">Link</label>
                <input
                type="link"
                className="w-full input"
                value={bookData?.link ?? ''} onKeyDown={null}
                onChange={(e) => setBookData({...bookData,link:e.target.value})}
                placeholder="Type the link of the online PDF book..."
                />
            </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={onClose}
            className="px-5 py-2 text-base rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
              onClick={(e) => saveBook(e)}
              disabled={saveButtonDisabled}
              className={`px-6 py-2 text-base rounded-md transition 
                ${saveButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer'}`}
            >
              {buttonLoading ? <ClipLoader size={16} /> : 'Save Book'}
            </button>
        </div>
      </div>
    </div>

  );
}

export default AddBook