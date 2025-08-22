import React, { useContext, useEffect, useState } from 'react';
import LibraryBookCard from './LibraryBookCard';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { UserContext } from '../../Universal Files/UserContext';
import AddBook from './AddBook';


const Library = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const {userRole} = useContext(UserContext)
  const [addBook, setAddBook] = useState(false)
  useEffect(() => {
  setLoading(true)
        const q = query(
            collection(db, "library")
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const books = snapshot.docs.map((d) => ({
                    id: d.id,          
                    ...d.data(),       
            }));
            
            setBooks(books)
            setLoading(false)
            },
            (err) => {
            console.error(err);
            setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Library </h1>

      <div className='flex justify-between '>
          <input
          type="text"
          placeholder="Search books..."
          className="w-full md:w-1/3 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:border-blue-300 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {(userRole == 'principal' || userRole == 'administrator') && <button className='text-white bg-green-700 p-3 rounded-xl cursor-pointer hover:bg-green-800' onClick={() => setAddBook(!addBook)}>Add Book +</button>}
      </div>

      {favorites.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-800 mb-3">📌 Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books
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

      {addBook && <AddBook show = {addBook}  onClose = {(e)=> setAddBook(false)} />}
    </div>
  );
};

export default Library;
