import Toast from 'components/Toast';
import { createContext, Dispatch, SetStateAction, useContext, useState, ReactNode } from 'react';

interface IToastContext {
    showToast: boolean
    setShowToast: Dispatch<SetStateAction<boolean>>
    message: string
    setMessage: Dispatch<SetStateAction<string>>
    type: "success" | "warning" | "error"
    setType: Dispatch<SetStateAction<"success" | "warning" | "error">>
}

const ToastContext = createContext<IToastContext>({
    showToast: false,
    setShowToast: undefined as unknown as Dispatch<SetStateAction<boolean>>,
    message: "",
    setMessage: undefined as unknown as Dispatch<SetStateAction<string>>,
    type: "success",
    setType: undefined as unknown as Dispatch<SetStateAction<"success" | "warning" | "error">>,
});

export const ToastProvider = ({children}: {children: ReactNode}) => {

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"success" | "warning" | "error">("success");

    const contextValue = {
        showToast: showToast,
        setShowToast: setShowToast,
        message: message,
        setMessage: setMessage,
        type: type,
        setType: setType,
    }

  return (
    <ToastContext.Provider value={contextValue}>
        <Toast />
        {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
