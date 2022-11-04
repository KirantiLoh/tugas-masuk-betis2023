import Image from 'next/image';
import Link from 'next/link';
import  { useState } from 'react';

const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className='relative flex items-center h-screen w-full bg-yellow-900 bg-opacity-80 text-white overflow-y-auto'>
        <section className='flex flex-col gap-7 justify-center p-10 w-full sm:w-1/2'>
          <aside>
            <h1 className='text-7xl font-semibold'>Register</h1>
            <p className='mt-3 opacity-80 max-w-prose'>Daftarlah agar dapat mendapatkan semua fitur!</p>
          </aside>
          <form 
            className='flex flex-col gap-3'
          >
            <p className='flex flex-col gap-1'>
              <label htmlFor='email'>Email</label>
              <input className='input' id='email' placeholder='Email' type="email" />
            </p>
            <p className='flex flex-col gap-1'>
              <label htmlFor="username">Username</label>
              <input className='input' id='username' placeholder='Username' type="text" />
            </p>
            <p className='flex flex-col gap-1'>
              <label htmlFor="password">Password</label>
              <input className='input' id='password' placeholder='Password' type="password" />
            </p>
            <button className="button primary text-lg mt-5">Daftar</button>
          </form>
          <p>
            Sudah punya akun? Login 
            <Link href='/account/login' className='ml-1 pb-1 underline'>
              disini
            </Link>
          </p>
        </section>
        <section className='relative flex-1 h-screen'>
          <Image src="/background.jpg" alt="" fill className='object-cover brightness-75' />
        </section>
    </main>
  )
}

export default RegisterPage;