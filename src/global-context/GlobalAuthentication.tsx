import {createContext, useContext, useState, ReactNode} from 'react';

interface GlobalAuthenticationProviderProp {
  children: ReactNode;
}

export interface GlobalAuthenticationContextType {
    userToken: string | null; 
    login: () => void;
    Logout: () => void;
  }

export const GlobalAthentication = createContext<GlobalAuthenticationContextType>();

const GlobalAuthenticationProvider = ({
  children,
}: GlobalAuthenticationProviderProp) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const login = async () => {
    setUserToken('Prabin')
  }

  const Logout = async() => {
    setUserToken(null)
  }

  return (
    <GlobalAthentication.Provider value={{userToken, login, Logout}}>
      {children}
    </GlobalAthentication.Provider>
  );
};

export default GlobalAuthenticationProvider;
