'use client';


import { persistor, store } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

interface ReduxPersistgateProps {
  children: React.ReactNode;
}

const ReduxPersistgate: React.FC<ReduxPersistgateProps> = ({ children }) => {
  return (
    
      <PersistGate loading={null} persistor={persistor} >
        {children}
      </PersistGate>
    
  );
};

export default ReduxPersistgate;