import React, { useState } from 'react';
import { MessageCircle, SendHorizonal, UserCircle2 } from 'lucide-react';

const sampleTopics = [
  {
    id: 1,
    title: "What’s the best way to prepare for the math midterm?",
    author: "Arber G.",
    category: "Mathematics",
    createdAt: "2025-07-25",
    replies: 3,
  },
  {
    id: 2,
    title: "Can we submit assignments late if we're sick?",
    author: "Liria K.",
    category: "General",
    createdAt: "2025-07-24",
    replies: 1,
  },
  {
    id: 3,
    title: "Any tips for writing essays in English class?",
    author: "Besnik T.",
    category: "Language",
    createdAt: "2025-07-20",
    replies: 2,
  },
];

const Forum = () => {
  const [topics, setTopics] = useState(sampleTopics);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [newTopic, setNewTopic] = useState({ title: '', author: '', category: '' });

  const filteredTopics = topics.filter((topic) => {
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

      {/* Post a topic */}
      <div className="bg-white shadow p-4 rounded-lg space-y-3 border border-gray-200">
        <h2 className="font-medium text-lg text-gray-700">Start a Discussion</h2>
        <input
          type="text"
          placeholder="Your name"
          value={newTopic.author}
          onChange={(e) => setNewTopic({ ...newTopic, author: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter a topic..."
          value={newTopic.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={newTopic.category}
          onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Language">Language</option>
          <option value="General">General</option>
        </select>
        <button
          onClick={handlePost}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
        >
          <SendHorizonal className="w-4 h-4" /> Post
        </button>
      </div>

      {/* Filters */}
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

      {/* Topic list */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start border border-gray-100 hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <UserCircle2 className="w-4 h-4" /> {topic.author} • {topic.createdAt}
              </p>
              <span className="text-xs inline-block mt-2 px-2 py-1 bg-gray-100 rounded text-gray-600">
                {topic.category}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              💬 {topic.replies} replies
            </div>
          </div>
        ))}

        {filteredTopics.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No topics found.</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
