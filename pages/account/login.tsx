import { useAuth } from 'context/AuthContext';
import { withPublic } from 'hoc/withPublic';
import Image from 'next/image';
import Link from 'next/link';
import type { FormEvent} from 'react';
import  { useState, useEffect } from 'react';

const LoginPage = () => {

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("https://betis23-oprec.herokuapp.com/auth/login").then(res => console.log(res.json())).catch(err => console.error(err))
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    login({email: email, password: password})
  }

  return (
    <main className='relative flex items-center h-screen w-full bg-yellow-900 bg-opacity-80 text-white overflow-y-auto'>
        <section className='flex flex-col gap-7 justify-center p-10 w-full sm:w-1/2'>
          <aside>
            <h1 className='text-7xl font-semibold'>Login</h1>
            <p className='mt-3 opacity-80 max-w-prose'>Silahkan login terlebih dahulu untuk mengakses laman berikut</p>
          </aside>
          <form 
            onSubmit={handleSubmit}
            className='flex flex-col gap-3'
          >
            <p className='flex flex-col gap-1'>
              <label htmlFor='email'>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className='input' id='email' placeholder='Email' type="email" />
            </p>
            <p className='flex flex-col gap-1'>
              <label htmlFor="password">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} className='input' id='password' placeholder='Password' type="password" />
            </p>
            <button disabled={!password || !email} className="button primary text-lg mt-5">Login</button>
          </form>
          <p>
            Belum punya akun? Daftar 
            <Link href='/account/register' className='ml-1 pb-1 underline'>
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

export default withPublic(LoginPage);