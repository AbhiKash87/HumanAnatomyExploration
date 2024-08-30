/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Create the context
export const SelectedBodyPartContext = createContext();

// Create the provider component
export const SelectedBodyPartProvider = ({ children }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [removable,setRemovable] = useState(false)

  return (
    <SelectedBodyPartContext.Provider value={{ selectedBodyPart, setSelectedBodyPart,removable,setRemovable }}>
      {children}
    </SelectedBodyPartContext.Provider>
  );
};
