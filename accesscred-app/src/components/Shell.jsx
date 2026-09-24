import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Icon, Logo } from './ui'
import { useApp } from '../context/AppContext'

const NAV = [['/dashboard', 'Home', 'home'], ['/opportunities', 'Opportunities', 'briefcase'], ['/profile', 'My Profile', 'user'], ['/verify', 'Skill Verification', 'shield'], ['/applications', 'My Applications', 'file'], ['/learn', 'Learning Resources', 'book'], ['/messages', 'Messages', 'msg'], ['/settings', 'Settings', 'sliders']]

export default function Shell() {
  const { me, logout } = useApp()
  const { pathname } = useLocation()
  if (!me) return <Navigate to="/login" replace />
  const on = (p) => (pathname.startsWith(p) || (p === '/opportunities' && pathname.startsWith('/opportunity/')) ? ' on' : '')
  return (
    <div className="shell">
      <aside className="side">
        <Logo to="/dashboard" />
        <nav>{NAV.map(([p, l, i]) => <Link key={p} to={p} className={'navlink' + on(p)}><Icon n={i} />{l}</Link>)}</nav>
        <div className="help">
          <b><Icon n="help" size={16} /> Need Help?</b>
          <p className="mut sm">Chat with our support team.</p>
          <Link to="/messages" className="btn sm block">Contact Support</Link>
          <button className="linkbtn" onClick={logout}>Log out</button>
        </div>
      </aside>
      <main className="main"><Outlet /></main>
      <nav className="bottom">{[NAV[0], NAV[1], NAV[4], NAV[6], NAV[2]].map(([p, l, i]) => <Link key={p} to={p} className={on(p)}><Icon n={i} /><span>{l.split(' ').slice(-1)[0]}</span></Link>)}</nav>
    </div>
  )
}
