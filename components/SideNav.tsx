import { ReactNode } from 'react';
import { GiSlicedBread } from "react-icons/gi";
import { FaClipboardList, FaSignInAlt } from "react-icons/fa";
import { useSideNav } from 'context/SideNavContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navlink = ({children, href, className}: {children: ReactNode, href: string, className?: string}) => {
    return (
        <Link href={href} className={`flex items-center gap-1 transition-all duration-300 hover:opacity-80 ${className}`}>
            {children}
        </Link>
    );
}

const SideNav = () => {

    const { show, setShow } = useSideNav();

    const router = useRouter();

  return (
    <nav onClick={() => setShow(false)} className={`${router.pathname.startsWith("/account") ? "hidden" : "flex"} z-[5] p-5 h-screen overflow-hidden fixed top-0 ${show ? "left-0" : "left-[-150%]"} transition-all duration-500 bg-yellow-700 text-white w-full sm:static flex items-center sm:items-start text sm:min-w-[200px] sm:w-[200px] flex-col justify-between gap-5 shadow-2xl`}>
        <div>
            <h1 className='text-3xl'>
                <Link href="/" className='flex flex-col items-center gap-1'>
                    <GiSlicedBread className='text-6xl' />
                    Roti BETIS
                </Link>
            </h1>
            <ul className='mt-10 flex flex-col gap-2 text-lg'>
                <Navlink href="#">
                    <FaClipboardList />
                    Daftar Roti
                </Navlink>
                {/* <Navlink href="#">
                    <FaClipboardList />
                    Daftar Roti
                </Navlink>
                <Navlink href="#">
                    <FaClipboardList />
                    Daftar Roti
                </Navlink> */}
            </ul>
        </div>
        <Navlink href="#" className='text-xl'>
            <FaSignInAlt />
            Keluar
        </Navlink>
    </nav>
  );
}

export default SideNav;