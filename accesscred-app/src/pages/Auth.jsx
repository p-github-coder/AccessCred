import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Icon, Logo } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Auth({ mode }) {
  const su = mode === 'signup'
  const { me, register, login } = useApp()
  const nav = useNavigate()
  const [track, setTrack] = useState('Formal')
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '' })
  const [err, setErr] = useState('')
  if (me) return <Navigate to="/dashboard" replace />
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault(); setErr('')
    try {
      if (su) { if (f.password.length < 6) throw new Error('Password must be at least 6 characters.'); register({ ...f, track }); nav('/onboarding') }
      else { login(f.email, f.password); nav('/dashboard') }
    } catch (x) { setErr(x.message) }
  }
  return (
    <div className="auth">
      <form className="form" onSubmit={submit}>
        <Logo />
        <div><h2 style={{ fontSize: 26 }}>{su ? 'Join AccessCred' : 'Welcome Back'}</h2><p className="mut">{su ? 'Create your account and take the first step towards new opportunities.' : 'Log in to continue your journey.'}</p></div>
        {su && <div className="seg">{[['Formal', 'Student / Formal'], ['Informal', 'Skilled Worker / Informal']].map(([k, l]) => <button type="button" key={k} className={track === k ? 'on' : ''} onClick={() => setTrack(k)}>{l}</button>)}</div>}
        {su && <div><label>Full name</label><input placeholder="Enter your full name" value={f.name} onChange={set('name')} required /></div>}
        <div><label>{su ? 'Email address' : 'Email or phone number'}</label><input type={su ? 'email' : 'text'} placeholder="you@example.com" value={f.email} onChange={set('email')} required /></div>
        {su && <div><label>Phone number</label><input placeholder="+234 801 234 5678" value={f.phone} onChange={set('phone')} /></div>}
        <div><div className="row between"><label>Password</label>{!su && <span className="mut sm">Forgot password?</span>}</div><input type="password" placeholder={su ? 'Create a strong password' : 'Enter your password'} value={f.password} onChange={set('password')} required /></div>
        {err && <div className="err">{err}</div>}
        <button className="btn block">{su ? 'Create Account' : 'Log In'}</button>
        {!su && <><div className="or">or continue with</div>
          <div className="g2"><button type="button" className="btn ghost" onClick={() => setErr('Google sign-in needs a backend. Not connected yet.')}>Google</button><button type="button" className="btn ghost" onClick={() => setErr('Apple sign-in needs a backend. Not connected yet.')}>Apple</button></div></>}
        <p className="mut" style={{ textAlign: 'center' }}>{su ? 'Already have an account?' : "Don't have an account?"} <Link to={su ? '/login' : '/signup'} style={{ color: 'var(--navy)', fontWeight: 700 }}>{su ? 'Log in' : 'Sign up'}</Link></p>
      </form>
      <div className="art">
        <div className="script">{su ? <>Skills<br />Create<br />Opportunities.</> : <>Same<br />Platform.<br />Bigger<br />Opportunities.</>}</div>
        <div className="card row" style={{ maxWidth: 280, textAlign: 'left' }}><span className="ico" style={{ background: '#DDF3E8', color: '#1E9E6A' }}><Icon n="shield" /></span><div><b>Proof of skill</b><div className="mut sm">A transcript or a finished piece of work.</div></div></div>
      </div>
    </div>
  )
}
