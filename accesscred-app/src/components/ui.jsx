import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const P = {
  home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
  briefcase: 'M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  sliders: 'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
  search: 'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z M21 21l-4.3-4.3',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z',
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13',
  file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6',
  compass: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M16 8l-2 6-6 2 2-6z',
  target: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  trend: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
  cap: 'M22 10L12 5 2 10l10 5z M6 12v5c3 3 9 3 12 0v-5',
  scissors: 'M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M20 4L8.1 15.9 M14.5 14.5L20 20 M8.1 8.1L12 12',
  tool: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z',
  code: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
  check: 'M20 6L9 17l-5-5',
  star: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2',
  send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4z',
  award: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M8.2 13.9L7 23l5-3 5 3-1.2-9.1',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M23 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8',
  dollar: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  pin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
  help: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3 M12 17h.01',
  edit: 'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  plus: 'M12 5v14 M5 12h14',
}
export const Icon = ({ n, size = 18, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {(P[n] || '').split(' M').map((d, i) => <path key={i} d={(i ? 'M' : '') + d} />)}
  </svg>
)

export const Logo = ({ to = '/' }) => (
  <Link to={to} className="logo"><img src="/logo-mark.png" alt="" /><span>Access<b>Cred</b></span></Link>
)

const COL = ['#2B7BE4', '#F97B5A', '#1E9E6A', '#7C4DDB', '#0D3560', '#D98A00']
export function Org({ o, size = 42 }) {
  const [bad, setBad] = useState(false)
  const c = COL[[...(o.org || 'x')].reduce((a, ch) => a + ch.charCodeAt(0), 0) % COL.length]
  const st = { width: size, height: size, borderRadius: 12 }
  return o.logo && !bad
    ? <img src={o.logo} alt="" onError={() => setBad(true)} style={{ ...st, objectFit: 'contain', background: '#fff', border: '1px solid var(--ln)', padding: 4, flex: 'none' }} />
    : <span className="mono" style={{ ...st, background: c }}>{(o.org || '?')[0]}</span>
}

export const Stepper = ({ steps, cur }) => (
  <div className="stepper">{steps.map((s, i) => (
    <div key={s} className={'st' + (i + 1 <= cur ? ' on' : '')}><b>{i + 1 < cur ? <Icon n="check" size={14} /> : i + 1}</b><span>{s}</span></div>
  ))}</div>
)

export const initials = (n = '') => n.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase()

export function PageHead({ title, sub }) {
  const { me } = useApp()
  return (
    <div className="phead">
      <div><h1>{title}</h1>{sub && <p className="mut">{sub}</p>}</div>
      <div className="row">
        <Link to="/opportunities" className="iconbtn" aria-label="Search"><Icon n="search" /></Link>
        <Link to="/messages" className="iconbtn" aria-label="Messages"><Icon n="bell" /></Link>
        <Link to="/profile" className="avatar">{initials(me.name)}</Link>
      </div>
    </div>
  )
}

export function OppRow({ o, saved, onSave, match }) {
  return (
    <div className="oprow">
      <Org o={o} />
      <div className="grow">
        <Link to={'/opportunity/' + encodeURIComponent(o.id)}><b>{o.title}</b></Link>
        <div className="mut sm">{o.org}{o.location ? ' • ' + o.location : ''}</div>
        <div className="row wrap" style={{ gap: 6, marginTop: 6 }}><span className="pill">{o.type.replace(/s$/, '')}</span>{o.tags.slice(0, 2).map((t) => <span className="pill" key={t}>{t}</span>)}{match && <span className="pill ok">{match.pct}% match</span>}</div>
      </div>
      <div className="col end">
        {onSave && <button className={'heart' + (saved ? ' on' : '')} onClick={onSave} aria-label="Save"><Icon n="heart" fill={saved} /></button>}
        <Link to={'/opportunity/' + encodeURIComponent(o.id)} className="btn sm">Apply</Link>
      </div>
    </div>
  )
}
