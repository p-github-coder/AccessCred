import { useMemo, useState } from 'react'
import { Icon, OppRow, PageHead } from '../components/ui'
import { useApp } from '../context/AppContext'
import { match, useOpportunities } from '../api/opportunities'

const TABS = ['All', 'Jobs', 'Internships', 'Scholarships', 'Fellowships', 'Gigs']
export default function Opportunities() {
  const { me, patch } = useApp()
  const { list, loading, error, reload } = useOpportunities()
  const [q, setQ] = useState(''); const [tab, setTab] = useState('All'); const [n, setN] = useState(15)
  const rows = useMemo(() => list.filter((o) => (tab === 'All' || o.type === tab) && (o.title + o.org + o.tags.join(' ') + o.location).toLowerCase().includes(q.toLowerCase())), [list, q, tab])
  const toggle = (id) => patch((u) => ({ ...u, saved: u.saved.includes(id) ? u.saved.filter((x) => x !== id) : [...u.saved, id] }))
  return (
    <>
      <PageHead title="Opportunities" sub="Live listings from public job APIs" />
      <div className="row"><div style={{ position: 'relative', flex: 1 }}><input style={{ paddingLeft: 38 }} placeholder="Search opportunities" value={q} onChange={(e) => { setQ(e.target.value); setN(15) }} /><span style={{ position: 'absolute', left: 12, top: 10, color: 'var(--mut)' }}><Icon n="search" /></span></div><button className="btn ghost" onClick={reload}>Refresh</button></div>
      <div className="tabs pills">{TABS.map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => { setTab(t); setN(15) }}>{t}</button>)}</div>
      {loading && [1, 2, 3, 4].map((i) => <div key={i} className="skel" />)}
      {error && <div className="card row between"><span className="mut">{error}</span><button className="btn sm" onClick={reload}>Retry</button></div>}
      {!loading && !error && !rows.length && <div className="card mut">{['Scholarships', 'Fellowships'].includes(tab) ? 'No listings yet. Scholarships and fellowships come from your own backend: set VITE_API_URL (see README).' : 'No matching opportunities.'}</div>}
      <div className="col">{rows.slice(0, n).map((o) => <OppRow key={o.id} o={o} match={match(o, me.profile)} saved={me.saved.includes(o.id)} onSave={() => toggle(o.id)} />)}</div>
      {rows.length > n && <button className="btn ghost" style={{ alignSelf: 'center' }} onClick={() => setN(n + 15)}>Load more</button>}
    </>
  )
}
