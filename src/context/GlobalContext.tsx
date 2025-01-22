"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface GlobalContextData {
  currentProfileSection: string;
  setCurrentProfileSection: (section: string) => void;
}

const GlobalContext = createContext<GlobalContextData>({
  currentProfileSection: "",
  setCurrentProfileSection: () => {},
});

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentProfileSection, setCurrentProfileSection] = useState<string>(
    "NFTs"
  );

  return (
    <GlobalContext.Provider
      value={{
        currentProfileSection,
        setCurrentProfileSection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};