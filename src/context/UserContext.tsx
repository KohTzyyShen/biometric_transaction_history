import React, { createContext, useContext, useState } from 'react';
import PortfolioData from '../data/Portfolio.json';

interface UserContextType {
  userId: string;
  username: string;
  passcode: string;
  setPasscode: (newPasscode: string) => void;
}

const defaultUser = {
  userId: PortfolioData.Login.userId,
  username: PortfolioData.Login.username,
  passcode: PortfolioData.Login.passcode,
  setPasscode: () => {},
};

const UserContext = createContext<UserContextType>(defaultUser);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [passcode, setPasscode] = useState(PortfolioData.Login.passcode);

  return (
    <UserContext.Provider
      value={{
        userId: PortfolioData.Login.userId,
        username: PortfolioData.Login.username,
        passcode,
        setPasscode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
