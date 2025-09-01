import React, { useEffect, useState } from 'react';
import {  MessageCircle, SendHorizonal, UserCircle2 } from 'lucide-react';
import AddDiscusion from './AddDiscusion';
import { collection, getCountFromServer, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import  { formatFirestoreTimestamp } from '../../Universal Files/GeneralMethods';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const Forum = () => {
  const [topics, setTopics] = useState();
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [newTopic, setNewTopic] = useState({ title: '', author: '', category: '' });
  const [directions, setDirections] = useState([])

  const navigate = useNavigate()


      useEffect(() => {

      const fetchData = async () => {
        setLoading(true);
        const q = await query(
        collection(db, "directions")
      );
    
      const unsubscribe = await  onSnapshot(
        q,
        (snapshot) => {
          const dirs = snapshot.docs.map((d) => ({
            id: d.id,          
            ...d.data(),       
          }));
          setDirections(dirs)
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

    useEffect(() => {
  const fetchData = async () => {
    setLoading(true);

    const q = query(collection(db, "forum"));
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const topics = await Promise.all(
          snapshot.docs.map(async (d) => {
            const topicId = d.id;

            const repliesQuery = query(
              collection(db, "forumReplies"),
              where("topicId", "==", topicId)
            );
            const repliesCount = await getCountFromServer(repliesQuery);

            return {
              id: topicId,
              ...d.data(),
              repliesCount: repliesCount.data().count,
            };
          })
        );

        setTopics(topics);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  };

  fetchData();
}, []);

    const filteredTopics = topics?.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || topic.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePost = () => {
    if (newTopic.title && newTopic.author && newTopic.category) {
      const topic = {
        ...newTopic,
        id: topics.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
        replies: 0,
      };
      setTopics([topic, ...topics]);
      setNewTopic({ title: '', author: '', category: '' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <MessageCircle className="text-blue-500" /> Student Forum
      </h1>

      {!loading  && directions && <AddDiscusion directions={directions}/>}

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Language">Language</option>
          <option value="General">General</option>
        </select>
      </div>

      {filteredTopics && <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <NavLink to={`${topic.id}`} >
            <div
            key={topic.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start border border-gray-100 hover:shadow-lg transition cursor-pointer my-5"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <UserCircle2 className="w-4 h-4" /> {topic.userName} • {formatFirestoreTimestamp(topic.createdDate)}
              </p>
              <span className="text-xs inline-block mt-2 px-2 py-1 bg-gray-100 rounded text-gray-600">
                {topic.categoryName}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              💬 {topic?.repliesCount} replies
            </div>
          </div>
          </NavLink>
        ))}

        {filteredTopics.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No topics found.</p>
        )}
      </div>}
    </div>
  );
};

export default Forum;
