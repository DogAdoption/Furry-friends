import React, { createContext, useContext, useState } from 'react';

const PreviousUrlContext = createContext();

export const usePreviousUrl = () => useContext(PreviousUrlContext);

export const PreviousUrlProvider = ({ children }) => {
  const [previousUrl, setPreviousUrl] = useState('');
  return (
    <PreviousUrlContext.Provider value={{ previousUrl, setPreviousUrl }}>
      {children}
    </PreviousUrlContext.Provider>
  );
};