import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface IOverlayContext {
    showOverlay: boolean
    setShowOverlay: Dispatch<SetStateAction<boolean>>
}

const OverlayContext = createContext<IOverlayContext>({
    showOverlay: false,
    setShowOverlay: undefined as unknown as Dispatch<SetStateAction<boolean>>,
});

export const OverlayProvider = ({children}: {children: ReactNode}) => {

    const [showOverlay, setShowOverlay] = useState(false);

    const contextValue = {
        showOverlay: showOverlay,
        setShowOverlay: setShowOverlay,
    }

  return (
    <OverlayContext.Provider value={contextValue}>
        {children}
        <div onClick={e => e.preventDefault()} className={`z-[5] pointer-events-none fixed top-0 left-0 w-full h-screen bg-black ${showOverlay ? "bg-opacity-50 pointer-events-auto" : "bg-opacity-0"} transition-all duration-500`}></div>
    </OverlayContext.Provider>
  )
}

export const useOverlay = () => useContext(OverlayContext);

