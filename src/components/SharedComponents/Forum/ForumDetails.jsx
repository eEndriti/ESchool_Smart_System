import { useEffect, useState } from "react";
import { Trash2, Edit3, Reply, ThumbsUp, ThumbsDown } from "lucide-react";
import { addDoc, collection, doc, getDoc, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { useToast } from "../../Universal Files/ToastProvider";
import { formatFirestoreTimestamp } from "../../Universal Files/GeneralMethods";
import { useUser } from "../../Universal Files/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faThumbTackSlash } from "@fortawesome/free-solid-svg-icons";
import DeleteDocumentModal from "../../universalComponentModals/DeleteDocumentModal";

export default function ForumDetail() {
  const [topic, setTopic] = useState([])
  const [loading, setLoading] = useState()
  const {id} = useParams()
  const {currentUser} = useUser()
  const toast = useToast()
  const [replyInputArea, setReplyInputArea] = useState('')
  const [postButtonLoading, setPostButtonLoading] = useState(false)
  const [replies, setReplies] = useState([])
  const [deleteTopic,setDeleteTopic] = useState()

    useEffect(() => {
       const fetchData = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, "forum", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const topicData = { id: docSnap.id, ...docSnap.data() };
            setTopic(topicData);
            console.log(topicData);
          } else {
            toast.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
          toast.error("Failed to fetch document");
        } finally {
          setLoading(false);
        }
      };
        fetchData()
      }, []);


       useEffect(() => {
      
            const fetchData = async () => {
              setLoading(true);
              const q = await query(
              collection(db, "forumReplies")
            );
          
            const unsubscribe = await  onSnapshot(
              q,
              (snapshot) => {
                const replies = snapshot.docs.map((d) => ({
                  id: d.id,          
                  ...d.data(),       
                }));
                setReplies(replies)
                setLoading(false);
              },
              (err) => {
                console.error(err);
                setLoading(false);
              }
            );
          
            return () => unsubscribe();
            }
          
            fetchData()
          }, []);

  const handleDeleteReply = (id) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      setReplies(replies.filter((r) => r.id !== id));
    }
  };

  const handleEditReply = (id) => {
    const newContent = prompt("Edit your reply:");
    if (newContent) {
      setReplies(
        replies.map((r) => (r.id === id ? { ...r, content: newContent } : r))
      );
    }
  };
  const postReply = async (e) => {
    e.preventDefault()
    try {
      setPostButtonLoading(true)
      await addDoc(collection(db,'forumReplies'),{
        text:replyInputArea,
        userId:currentUser.uid,
        userName:currentUser.userName,
        userRole:currentUser.userRole,
        createdDate:serverTimestamp(),
      })
      toast.success('Replied With Success!')
      setReplyInputArea('')
    } catch (error) {
      toast.error('Error Replying... ',error)
      console.log(error)
    }finally{
      setPostButtonLoading(false)
    }
  }
  return (
    <div className="max-w-8xl mx-auto p-4 space-y-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold">{topic.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Posted by <span className="font-medium">{topic.userName}</span> • {formatFirestoreTimestamp(topic.createdDate)}
        </p>
        <p className="text-gray-700 leading-relaxed">{topic.message}</p>
        <div className="flex justify-end mt-4">
          
          {(topic.userId == currentUser?.uid || currentUser.userRole == 'principal' || currentUser.userRole == 'administrator') && <button
            onClick={(e) => setDeleteTopic(true)}
            className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <Trash2 size={16} /> Delete Topic
          </button>}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Replies</h2>
        {replies.map((reply) => (
          <div key={reply.id} className="bg-white shadow rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{reply.userName}  <span className=" capitalize font-light text-sm text-gray-500">•{reply.userRole}</span></p>
              <span className="text-xs text-gray-500">{formatFirestoreTimestamp(reply.createdDate)}</span>
            </div>
            <p className="text-gray-700">{reply.text}</p>
            <div className="flex gap-2 justify-between mt-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleThumbsUp(reply.id)}
                    className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                     {reply.likes}
                  </button>
                  <button
                    onClick={() => handleThumbsDown(reply.id)}
                    className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm"
                  >
                    <FontAwesomeIcon icon={faThumbsDown} />
                    {reply.dislikes}
                  </button>
                </div>

                <div className="flex gap-2">
                  {reply.userId == currentUser.uid && <button
                    onClick={() => handleEditReply(reply.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm"
                  >
                    <Edit3 size={16} /> Edit
                  </button>}
                  {(reply.userId == currentUser.uid || currentUser.userRole == 'principal' || currentUser.userRole == 'administrator') && <button
                    onClick={() => handleDeleteReply(reply.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-sm"
                  >
                    <Trash2 size={16} /> Delete
                  </button>}
                </div>
              </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-white border-t pt-4">
        <textarea
          placeholder="Write a reply..." value={replyInputArea}
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none" onChange={(e) => setReplyInputArea(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button className="cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition" onClick={(e) => postReply(e)}>
            {postButtonLoading ? <ClipLoader size={16} /> : <><Reply size={16} /> Post Reply</>}
          </button>
        </div>
      </div>

      {deleteTopic && <DeleteDocumentModal open={deleteTopic} onClose={(e) => setDeleteTopic(null)} deleteData={topic} type="Topic" collection="forum"/>}
    </div>
  );
}
