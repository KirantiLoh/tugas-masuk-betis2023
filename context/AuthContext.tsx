import axios from 'axios';
import type { Dispatch, ReactNode, SetStateAction} from 'react';
import { createContext, useContext, useState, useEffect } from 'react'

interface IAuthContextValue {
    user: IUser
    accessToken: string
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    login: (payload: ILoginPayload) => void
}

const AuthContext = createContext<IAuthContextValue>({
    user: {
        pk: -1,
        username: "",
        email: "",
        first_name: "Maurice",
        last_name: "Yang",
    },
    accessToken: "",
    isLoading: true,
    setIsLoading: undefined as unknown as Dispatch<SetStateAction<boolean>>,
    login: undefined as unknown as () => void
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  
    const [user, setUser] = useState<IUser>({
        pk: -1,
        username: "",
        email: "",
        first_name: "Maurice",
        last_name: "Yang",
    });
    const [accessToken, setAccessToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const login = async ({email, password}: ILoginPayload) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {email: email, password: password});
            if (res.status === 200) {
                const data: IAuthResponse = await res.data;
                setAccessToken(data.access_token)
                setUser(data.user);
            }
            else {
                throw new Error("Authentication failed!")
            }
        } 
        catch (err) {
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    // TODO: Remove this function after login endpoint is available
    const getUserDetail = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/`,{
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                }
            });
            const data: IUser = await res.data;
            setUser(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUserDetail();
    }, []);
  
    const contextValue = {
        user: user,
        accessToken: accessToken,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        login: login,
    }

    return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);