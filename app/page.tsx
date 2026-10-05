import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return <main className="landing">
    <nav className="nav"><div className="brand">Task<span>Flow</span></div><div className="navlinks"><Link href="/login">Sign in</Link><Link className="button small" href="/register">Get started</Link></div></nav>
    <section className="hero"><div className="eyebrow">FULL-STACK TASK MANAGEMENT</div><h1>Turn busy work into <span>clear progress.</span></h1><p>Create, organize, prioritize and complete tasks from one fast, responsive workspace.</p><div className="actions"><Link className="button" href="/register">Create free account</Link><Link className="button ghost" href="/login">I already have an account</Link></div>
      <div className="featuregrid"><div><CheckCircle2/><b>Simple CRUD</b><small>Create, edit and track every task.</small></div><div><ShieldCheck/><b>Secure by design</b><small>Private tasks with protected sessions.</small></div><div><Zap/><b>Fast dashboard</b><small>Search, filter and prioritize instantly.</small></div></div>
    </section>
  </main>;
}