import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import  {useUser}  from '../components/Universal Files/UserContext';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const db = getFirestore();
  const auth = getAuth();
  const { setUserRole } = useUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const docSnap = await getDoc(doc(db, 'users', u.uid));
        if (docSnap.exists()) {
          setRole(docSnap.data().userRole);
          setUserRole(docSnap.data().userRole)
        }
        setUser(u);
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export default RoleProtectedRoute;
