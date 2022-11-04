import { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react'
import { useContext } from 'react';
import { ReactNode } from 'react';

interface IRefetchContext {
    refetch: boolean
    setRefetch: Dispatch<SetStateAction<boolean>>
}

const RefetchContext = createContext<IRefetchContext>({
    refetch: false,
    setRefetch: undefined as unknown as Dispatch<SetStateAction<boolean>>,
});

export const RefetchProvider = ({children}: {children: ReactNode}) => {
  
    const [refetch, setRefetch] = useState(true);

    const contextValue = {
        refetch: refetch,
        setRefetch: setRefetch,
    }

    return (
      <RefetchContext.Provider value={contextValue}>
        {children}
      </RefetchContext.Provider>
    );
}

export const useRefetch = () => useContext(RefetchContext);
