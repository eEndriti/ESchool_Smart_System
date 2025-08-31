import { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); 
  const [currentUser ,setCurrentUser] = useState(null)
  return (
    <UserContext.Provider value={{ userRole, setUserRole,currentUser ,setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
