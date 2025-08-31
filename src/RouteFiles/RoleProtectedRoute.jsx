import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import  {useUser}  from '../components/Universal Files/UserContext';
import PropagateLoader from 'react-spinners/PropagateLoader.js'
const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const db = getFirestore();
  const auth = getAuth();
  const { setUserRole,setCurrentUser } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const docSnap = await getDoc(doc(db, 'users', u.uid));
        if (docSnap.exists()) {
          setRole(docSnap.data().userRole);
          setUserRole(docSnap.data().userRole)
          setCurrentUser({
            ...docSnap.data(),
            uid:u.uid
          })
        }
        setUser(u);
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) return <div className='d-flex  justify-self-center mt-50'><PropagateLoader size = {25} color='#38bdf8'/></div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export default RoleProtectedRoute;
