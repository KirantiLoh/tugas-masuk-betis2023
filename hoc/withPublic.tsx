import { useAuth } from 'context/AuthContext';
import type { ComponentType, ReactNode } from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface IWithPublicProps {
    children?: ReactNode
}

export function withPublic<T extends IWithPublicProps = IWithPublicProps>(Component: ComponentType<T>) {
  return function WithPublic(props: Omit<T,keyof IWithPublicProps>) {

    const { accessToken, isLoading, setIsLoading } = useAuth();

    const router = useRouter();

    useEffect(() => {     
      console.log("Checking"); 
        if (!isLoading && accessToken) {
          setIsLoading(false);
          router.push("/dashboard");
        }
    }, [accessToken])

    return <Component {...(props as T)} />
  }
}
