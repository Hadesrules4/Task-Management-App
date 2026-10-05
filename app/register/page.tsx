'use client';
import { FormEvent,useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router=useRouter(); const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError('');const r=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})});const d=await r.json();if(!r.ok){setError(d.error||'Registration failed');setLoading(false);return}router.push('/dashboard');router.refresh();}
  return <main className="auth"><div className="authcard"><Link className="brand" href="/">Task<span>Flow</span></Link><h1>Create your account</h1><p>Start organizing your work today.</p><form onSubmit={submit}><label>Name<input value={name} onChange={e=>setName(e.target.value)} required minLength={2}/></label><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/></label>{error&&<div className="error">{error}</div>}<button className="button full" disabled={loading}>{loading?'Creating…':'Create account'}</button></form><div className="authfoot">Already have an account? <Link href="/login">Sign in</Link></div></div></main>;
}