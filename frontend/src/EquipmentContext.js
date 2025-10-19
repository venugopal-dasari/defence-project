import React, { createContext, useContext, useState } from 'react';
import { equipmentList as initialEquipmentList } from './equipmentData';

const EquipmentContext = createContext();

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState(initialEquipmentList);

  const addEquipment = (item) => {
    setEquipment(prev => [...prev, { ...item, id: prev.length + 1 }]);
  };

  return (
    <EquipmentContext.Provider value={{ equipment, addEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => useContext(EquipmentContext); 