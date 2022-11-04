import SideNav from 'components/SideNav';
import { Dispatch, SetStateAction } from 'react';
import { createContext, useState } from 'react'
import { useContext } from 'react';
import { ReactNode } from 'react';

interface ISideNavContext {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

const SideNavContext = createContext<ISideNavContext>({
    show: false,
    setShow: undefined as unknown as Dispatch<SetStateAction<boolean>>,
});

export const SideNavProvider = ({children}: {children: ReactNode}) => {
  
    const [show, setShow] = useState(false);

    const contextValue = {
        show: show,
        setShow: setShow,
    }

    return (
      <SideNavContext.Provider value={contextValue}>
          <main className="flex items-center h-screen overflow-y-hidden">
              <SideNav />
              {children}
          </main>
      </SideNavContext.Provider>
    );
}

export const useSideNav = () => useContext(SideNavContext);
