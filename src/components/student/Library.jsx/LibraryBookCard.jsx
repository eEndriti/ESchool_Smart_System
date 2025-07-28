import React from 'react';
import { Star, StarHalf, StarOff, Heart, HeartCrack } from 'lucide-react';

const LibraryBookCard = ({ book, isFavorite, onFavoriteToggle }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= book.rating ? (
          <Star key={i} className="text-yellow-400 w-5 h-5" fill="currentColor" />
        ) : (
          <StarOff key={i} className="text-gray-300 w-5 h-5" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md transition hover:scale-[1.02] space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
        </div>
        <button onClick={() => onFavoriteToggle(book.id)} title="Toggle Favorite">
          {isFavorite ? (
            <HeartCrack className="text-red-500 w-6 h-6" />
          ) : (
            <Heart className="text-gray-400 w-6 h-6 hover:text-red-500" />
          )}
        </button>
      </div>

      <p className="text-sm text-gray-700">{book.description}</p>
      <div className="flex items-center space-x-1">{renderStars()}</div>
      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
        {book.category}
      </span>
    </div>
  );
};

export default LibraryBookCard;
