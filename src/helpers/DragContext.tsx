import React, { createContext, ReactNode, useContext, useState } from 'react';

interface DragContextType {
  isDragging: boolean;
  draggingTaskId: string | null;
  setIsDragging: (value: boolean) => void;
  setDraggingTaskId: (value: string | null) => void;
}

interface DragProviderProps {
  children: ReactNode;
}

const DragContext = createContext<DragContextType>({
  isDragging: false,
  setIsDragging: () => {},
  draggingTaskId: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDraggingTaskId: (value: string | null) => {},
});

export const useDrag = () => useContext(DragContext);

export const DragProvider: React.FC<DragProviderProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  return (
    <DragContext.Provider
      value={{ isDragging, setIsDragging, draggingTaskId, setDraggingTaskId }}
    >
      {children}
    </DragContext.Provider>
  );
};
