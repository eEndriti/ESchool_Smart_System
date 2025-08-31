import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "../Universal Files/ToastProvider";
import { useNavigate } from "react-router-dom";

const ANIM_MS = 200; 

export default function DeleteDocumentModal({open,title = "Are you sure?",description = "",yesText = "Yes",noText = "No",onClose,deleteData = {},collection = "",type = "",}) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [render, setRender] = useState(open); 
  const [show, setShow] = useState(false);    
  const toast = useToast();
  const navigate = useNavigate()
  useEffect(() => {
    if (open) {
      setRender(true);
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
      const t = setTimeout(() => setRender(false), ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [open]);

  const approved = async () => {
    const ref = doc(db, collection, deleteData.id);
    setButtonLoading(true);
    return toast
      .promise(deleteDoc(ref), {
        loading: `Deleting ${type}...`,
        success: `${type} Deleted Successfully!`,
        error: (e) => `Error deleting ${type}: ${e.message || e}`,
      })
      .finally(() => {
        setButtonLoading(false);
        checkForGoBack()
        onClose?.();
      });

  };

  function checkForGoBack(){
    if(type.toLowerCase() == 'topic'){
      goBackOneLevel()
    }
  }

  const goBackOneLevel = () => {
    const currentPath = window.location.pathname; 
    const segments = currentPath.split("/").filter(Boolean); 
    segments.pop(); 
    const newPath = "/" + segments.join("/");
    navigate(newPath);
  };

  const declined = () => onClose?.();

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={[
          "absolute inset-0 bg-black/40 transition-opacity duration-200",
          show ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={declined}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className={[
          "absolute left-1/2 top-6 w-[92vw] max-w-lg -translate-x-1/2",
          "rounded-2xl border border-gray-200 bg-white shadow-xl",
          // animation
          "transform transition-all duration-200 ease-out",
          show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95",
        ].join(" ")}
      >
        <div className="p-4">
          <h2 id="confirm-title" className="text-base font-semibold text-gray-900">
            {title}
          </h2>
          {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
        </div>

        <div className="flex justify-end gap-2 p-3">
          <button
            autoFocus
            onClick={declined}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {noText}
          </button>
          <button
            onClick={approved}
            className="cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {buttonLoading ? (
              <>
                <ClipLoader size={16} /> {yesText}
              </>
            ) : (
              yesText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
