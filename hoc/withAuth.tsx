import { useAuth } from 'context/AuthContext';
import type { ComponentType, ReactNode } from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function withAuth<T extends object>(Component: ComponentType<T>) {
  return function WithAuth(props: T) {

    const { accessToken, isLoading, setIsLoading } = useAuth();

    const router = useRouter();

    useEffect(() => {     
        if (!accessToken) {
          setIsLoading(false);
          router.replace("/account/login");
        }
    }, [accessToken])

    return <Component {...(props as T)} />
  }
}
