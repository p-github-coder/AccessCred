import { Link, useParams } from 'react-router-dom'
import { Icon, Org } from '../components/ui'
import { useApp } from '../context/AppContext'
import { ago, match, useOpportunities } from '../api/opportunities'

export default function OpportunityDetail() {
  const { id } = useParams()
  const { me, patch } = useApp()
  const { list, loading } = useOpportunities()
  const o = list.find((x) => x.id === id)
  if (loading) return <div className="skel" style={{ height: 300 }} />
  if (!o) return <div className="card col"><b>Opportunity not found</b><span className="mut">It may have expired. Browse the latest listings.</span><Link to="/opportunities" className="btn sm" style={{ alignSelf: 'flex-start' }}>Back to Opportunities</Link></div>
  const m = match(o, me.profile)
  const saved = me.saved.includes(o.id); const applied = me.apps.some((a) => a.oid === o.id)
  const apply = () => {
    window.open(o.url, '_blank', 'noopener')
    if (!applied) patch((u) => ({ ...u, apps: [{ oid: o.id, title: o.title, org: o.org, logo: o.logo, url: o.url, status: 'Pending', date: Date.now() }, ...u.apps] }))
  }
  const share = () => { const d = { title: o.title, url: o.url }; navigator.share ? navigator.share(d).catch(() => {}) : navigator.clipboard?.writeText(o.url) }
  const BEN = [['dollar', 'Salary', o.salary || 'Not listed'], ['pin', 'Location', o.location || 'Not listed'], ['briefcase', 'Type', o.type.replace(/s$/, '')], ['clock', 'Posted', ago(o.posted)]]
  return (
    <>
      <div className="row between"><Link to="/opportunities" className="mut">‹ Back</Link><div className="row"><button className="iconbtn" onClick={share} aria-label="Share"><Icon n="share" /></button><button className={'iconbtn heart' + (saved ? ' on' : '')} onClick={() => patch((u) => ({ ...u, saved: saved ? u.saved.filter((x) => x !== o.id) : [...u.saved, o.id] }))} aria-label="Save"><Icon n="heart" fill={saved} /></button></div></div>
      <div className="hero2"><Org o={o} size={64} /><div><h1 style={{ color: '#fff' }}>{o.title}</h1><div style={{ opacity: .85 }}>{o.org}{o.location ? ' • ' + o.location : ''}</div></div></div>
      <div className="row wrap"><span className="pill">{o.type.replace(/s$/, '')}</span>{o.tags.map((t) => <span className="pill" key={t}>{t}</span>)}{m && <span className="pill ok">{m.pct}% match</span>}</div>
      <div className="g2">
        <div className="card col"><h3>About the opportunity</h3><p className="mut" style={{ whiteSpace: 'pre-line' }}>{o.desc.slice(0, 900) || 'See the full listing for details.'}{o.desc.length > 900 ? '…' : ''}</p>
          <h3>Requirements</h3><ul className="col" style={{ paddingLeft: 18, gap: 4 }}>{o.tags.map((t) => <li key={t}>Experience with {t}{m?.hits.some((h) => t.toLowerCase().includes(h)) ? ' ✓ (on your profile)' : ''}</li>)}{o.location && <li>Location: {o.location}</li>}</ul></div>
        <div className="col"><div className="card col"><h3>Benefits & details</h3><div className="ben">{BEN.map(([i, l, v]) => <div key={l}><span className="ico"><Icon n={i} /></span><b>{l}</b><span className="mut">{v}</span></div>)}</div></div>
          <button className="btn coral block" onClick={apply}>{applied ? 'Applied ✓ Open listing again' : 'Apply Now'}</button>
          <button className="btn ghost block" onClick={() => patch((u) => ({ ...u, saved: saved ? u.saved.filter((x) => x !== o.id) : [...u.saved, o.id] }))}>{saved ? 'Saved' : 'Save'}</button></div>
      </div>
    </>
  )
}
