'use client';
import { FormEvent,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router=useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError('');const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok){setError(d.error||'Login failed');setLoading(false);return}router.push('/dashboard');router.refresh();}
  return <main className="auth"><div className="authcard"><Link className="brand" href="/">Task<span>Flow</span></Link><h1>Welcome back</h1><p>Sign in to manage your tasks.</p><form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>{error&&<div className="error">{error}</div>}<button className="button full" disabled={loading}>{loading?'Signing in…':'Sign in'}</button></form><div className="authfoot">New here? <Link href="/register">Create an account</Link></div></div></main>;
}