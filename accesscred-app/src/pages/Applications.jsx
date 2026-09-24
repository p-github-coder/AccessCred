import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Org, PageHead } from '../components/ui'
import { useApp } from '../context/AppContext'

const CLS = { Pending: 'warn', Shortlisted: 'ok', Rejected: 'bad' }
export default function Applications() {
  const { me, patch } = useApp()
  const [tab, setTab] = useState('All')
  const rows = me.apps.filter((a) => tab === 'All' || a.status === tab)
  const setStatus = (oid, status) => patch((u) => ({ ...u, apps: u.apps.map((a) => (a.oid === oid ? { ...a, status } : a)) }))
  return (
    <>
      <PageHead title="My Applications" />
      <div className="tabs">{['All', 'Pending', 'Shortlisted', 'Rejected'].map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      <div className="card">
        {rows.map((a) => <div className="li" key={a.oid}><Org o={a} /><div className="grow"><Link to={'/opportunity/' + encodeURIComponent(a.oid)}><b>{a.title}</b></Link><div className="mut sm">{a.org} • Applied {new Date(a.date).toLocaleDateString()}</div></div>
          <select style={{ width: 130 }} value={a.status} onChange={(e) => setStatus(a.oid, e.target.value)} aria-label="Status">{Object.keys(CLS).map((s) => <option key={s}>{s}</option>)}</select><span className={'pill ' + CLS[a.status]}>{a.status}</span></div>)}
        {!rows.length && <div className="col mut" style={{ alignItems: 'flex-start' }}>No applications here yet. Tap Apply Now on any opportunity and it will be tracked here.<Link to="/opportunities" className="btn sm">Browse opportunities</Link></div>}
      </div>
    </>
  )
}
