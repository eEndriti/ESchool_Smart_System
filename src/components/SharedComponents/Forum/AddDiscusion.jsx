import React, { useEffect, useState } from 'react'
import { MessageCircle, SendHorizonal, UserCircle2 } from 'lucide-react';
import { addDoc, collection, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useToast } from '../../Universal Files/ToastProvider';
import { useUser } from '../../Universal Files/UserContext';

const AddDiscusion = ({directions = []}) => {
    const [newTopic, setNewTopic] = useState({message:'',title:''})
    const [category, setCategory] = useState({categoryId:'',categoryName:''})
    const [postButtonDisabled, setPostButtonDisabled] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const { currentUser } = useUser()
    const toast = useToast()

    useEffect(()=>{
        if(newTopic?.message && newTopic?.title && category?.categoryId && category?.categoryName){
            setPostButtonDisabled(false)
        }else{
            setPostButtonDisabled(true)
        }
    },[newTopic])


    const handlePost = async (e) =>{
        e.preventDefault()
        console.log(currentUser)
       try {
        setButtonLoading(true)
        await addDoc(collection(db,'forum'),{
            title:newTopic.title,
            message:newTopic.message,
            categoryId:category.categoryId,
            categoryName:category.categoryName,
            userId:currentUser.uid,
            userName:currentUser.userName,
            createdDate:serverTimestamp()
        })
        toast.success('Topic saved successfully!')
        setNewTopic({title:'',message:''})
        setCategory({categoryId:'',categoryName:''})
       } catch (error) {
        console.log(error)
        toast.error('Error saving Topic: ',error)
       }finally{
        setButtonLoading(false)
       }
    }

  return (
    <div className="bg-white shadow p-4 rounded-lg space-y-3 border border-gray-200">
        <h2 className="font-medium text-lg text-gray-700">Start a Discussion </h2>
        
        <input
          type="text"
          placeholder="Enter a topic..."
          value={newTopic?.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <textarea
          type="text"
          placeholder="Short Message.."
          value={newTopic?.message}
          onChange={(e) => setNewTopic({ ...newTopic, message: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        
        <select
          value={category?.categoryId}
          onChange={(e) => setCategory({  categoryId: e.target.value,categoryName:e.target.selectedOptions[0].dataset.name })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>Select Category</option>
          {directions.map((dir,index) => (
            <option key={dir.id} value={dir.id} data-name = {`${dir.directionName} - ${dir.generationYear}` }>{dir.directionName} - {dir.generationYear}</option>
          ))}
        </select>
        <button disabled = {postButtonDisabled}
          onClick={(e)=> handlePost(e)}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1 transition ease-in-out disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          <SendHorizonal className="w-4 h-4" /> Post
        </button>
      </div>
  )
}

export default AddDiscusion