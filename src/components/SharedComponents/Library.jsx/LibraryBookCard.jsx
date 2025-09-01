import React, { useContext, useMemo,useState } from "react";
import {Star,StarHalf,Star as StarOutline,Heart,HeartCrack,BookOpen,Calendar,Tag,ArrowRight} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Universal Files/UserContext";
import UpdateBook from "./UpdateBook";
import DeleteDocumentModal from '../../universalComponentModals/DeleteDocumentModal'


const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const Rating = ({ value = 0 }) => {
  const v = clamp(Number(value) || 0, 0, 5);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (v >= i) stars.push(<Star key={i} className="h-4 w-4" fill="currentColor" />);
    else if (v > i - 1 && v < i) stars.push(<StarHalf key={i} className="h-4 w-4" />);
    else stars.push(<StarOutline key={i} className="h-4 w-4" />);
  }
  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label={`Rating: ${v} out of 5`}>
      {stars}
      <span className="ml-1 text-xs font-medium text-slate-500">{v.toFixed(1)}</span>
    </div>
  );
};

const Meta = ({ icon: Icon, children, title }) => (
  <div className="flex items-center gap-1.5 text-xs text-slate-500" title={title}>
    <Icon className="h-3.5 w-3.5" />
    <span className="truncate">{children}</span>
  </div>
);

const LibraryBookCard = ({book,isFavorite,onFavoriteToggle}) => {
  const { userRole } = useContext(UserContext);
  const [updateBook, setUpdateBook] = useState()
  const [deleteBook, setDeleteBook] = useState()

  return (
    <div
      className="
        group grid w-full grid-cols-[96px,1fr] gap-0 overflow-hidden rounded-2xl
        bg-white shadow-sm ring-1 ring-slate-200 transition
        hover:shadow-md dark:bg-slate-200 dark:ring-slate-200
      "
    >
      

      <div className="flex min-w-0 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-3 border-b-1 pb-1 border-slate-400">
          <div className="min-w-0 ">
            <h3 className="truncate text-lg font-semibold leading-tight text-slate-900 capitalize">
              {book?.title || "Untitled"}
            </h3>
            <div className="mt-0.5 flex items-center gap-2 ">
              <span className="truncate text-sm text-slate-900 capitalize">
                {book?.author || "Unknown author"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onFavoriteToggle?.(book?.id)}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={!!isFavorite}
              className="
                rounded-full p-2 transition hover:bg-slate-50 active:scale-95
                dark:hover:bg-slate-800 cursor-pointer
              "
            >
              {isFavorite ? (
                <HeartCrack className="h-5 w-5 text-rose-500" />
              ) : (
                <Heart className="h-5 w-5 text-slate-400 hover:text-rose-500" />
              )}
            </button>

            {(userRole === "principal" || userRole === "administrator") && (
              <div className="relative">
                
                <div className="ml-2 flex items-center gap-1.5">
                  <button
                    onClick={() => setUpdateBook(book)}
                    title="Edit"
                    className="rounded-md px-2 py-1 text-sm text-blue-600 cursor-pointer  hover:bg-blue-200"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    onClick={() => setDeleteBook(book)}
                    title="Delete"
                    className="rounded-md px-2 py-1 text-sm text-rose-700 hover:bg-rose-200   cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p
          className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-700 capitalize"
          title={book?.description}
        >
          {book?.description || "No description available."}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 capitalize">
          <Rating value={book?.rating} />

          {book?.category && (
            <Meta icon={Tag} title="Category">
              {book.category}
            </Meta>
          )}

          {book?.pages && (
            <Meta icon={BookOpen} title="Pages">
              {book.pages} pages
            </Meta>
          )}

          {book?.published && (
            <Meta icon={Calendar} title="Published">
              {book.published}
            </Meta>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {Array.isArray(book?.tags) &&
              book.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300"
                >
                  {t}
                </span>
              ))}
          </div>

          <a
            href={'https://manybooks.net'} target="_blank" rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2
              text-sm font-medium text-white transition hover:shadow-md
              active:translate-y-[1px]
              dark:bg-slate-100 dark:text-slate-900 cursor-pointer
            "
          >
            Explore
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
      {updateBook && <UpdateBook show={updateBook} onClose={() => setUpdateBook(null)} incomingData={updateBook} />}
      {deleteBook && <DeleteDocumentModal open={deleteBook} onClose={()=>setDeleteBook(null)} deleteData={deleteBook} collection='library' type="Book"  />}
    </div>
  );
};

export default LibraryBookCard;
