import React, { useState } from 'react';
import LibraryBookCard from './LibraryBookCard';

const booksData = [
  {
    id: 1,
    title: 'Introduction to Biology',
    author: 'Dr. Linda Green',
    category: 'Science',
    description: 'A comprehensive guide to basic biology concepts.',
    rating: 4,
  },
  {
    id: 2,
    title: 'Modern Algebra',
    author: 'Prof. John Matheson',
    category: 'Mathematics',
    description: 'Explore algebraic structures and their applications.',
    rating: 5,
  },
  {
    id: 3,
    title: 'World History',
    author: 'Emily Stone',
    category: 'History',
    description: 'Journey through the significant events of world history.',
    rating: 3,
  },
];

const Library = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');

  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Library</h1>

      <input
        type="text"
        placeholder="Search books..."
        className="w-full md:w-1/3 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {favorites.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-3">📌 Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {booksData
              .filter((book) => favorites.includes(book.id))
              .map((book) => (
                <LibraryBookCard
                  key={book.id}
                  book={book}
                  isFavorite
                  onFavoriteToggle={toggleFavorite}
                />
              ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-blue-800 mb-3">📚 All Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <LibraryBookCard
              key={book.id}
              book={book}
              isFavorite={favorites.includes(book.id)}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
