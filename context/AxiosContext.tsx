import axios from 'axios';
import { createContext, ReactNode, useContext } from 'react';
// import { useAuth } from './AuthContext';

interface IAxiosContext {

}

const AxiosContext = createContext<IAxiosContext>({
});

export const AxiosProvider = ({children}: {children: ReactNode}) => {

  // const { accessToken } = useAuth();

  axios.defaults.headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const contextValue = {}

  return (
    <AxiosContext.Provider value={contextValue}>
        {children}
    </AxiosContext.Provider>
  )
}

export const useAxios = () => useContext(AxiosContext);

