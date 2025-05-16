import React, { createContext, useContext } from "react";
import PortfolioData from "../data/Portfolio.json";

interface User {
  userId: string;
  username: string;
  passcode: string;
}

const defaultUser: User = {
  userId: PortfolioData.Login.userId,
  username: PortfolioData.Login.username,
  passcode: PortfolioData.Login.passcode,
};

const UserContext = createContext<User>(defaultUser);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContext.Provider value={defaultUser}>
      {children}
    </UserContext.Provider>
  );
};
