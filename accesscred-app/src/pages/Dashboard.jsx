import { Link } from 'react-router-dom'
import { Icon, OppRow, PageHead } from '../components/ui'
import { completion, useApp } from '../context/AppContext'
import { match, useOpportunities } from '../api/opportunities'

export default function Dashboard() {
  const { me } = useApp()
  const { list, loading, error, reload } = useOpportunities()
  const h = new Date().getHours()
  const rec = [...list].map((o) => ({ o, m: match(o, me.profile) })).sort((a, b) => (b.m?.pct || 0) - (a.m?.pct || 0)).slice(0, 3)
  const pct = completion(me)
  const QA = [['shield', 'Verify a Skill', '/verify', '#FDEBE4', '#D8552F'], ['compass', 'Explore Opportunities', '/opportunities', '#EAF1F8', '#164B7E'], ['scissors', 'Take a Micro-Task', '/verify', '#DDF3E8', '#1E9E6A'], ['book', 'View Learning Resources', '/learn', '#EFE6FB', '#7C4DDB']]
  return (
    <>
      <PageHead title={`Good ${h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening'}, ${me.name.split(' ')[0]}`} sub="Your skills matter. Keep going!" />
      <div className="progress"><div className="ring" style={{ '--p': pct }}><span>{pct}%</span></div>
        <div className="grow"><small style={{ opacity: .8 }}>Your Progress</small><h2>Profile completed</h2><p style={{ opacity: .85 }}>Add more skills and experiences to unlock more opportunities.</p></div>
        <Link to="/profile" className="btn coral">Complete Profile</Link></div>
      <div className="row between"><h3>Recommended for you</h3><Link to="/opportunities" className="mut sm">View all</Link></div>
      {loading && <div className="g3">{[1, 2, 3].map((i) => <div key={i} className="skel" />)}</div>}
      {error && <div className="card row between"><span className="mut">{error}</span><button className="btn sm" onClick={reload}>Retry</button></div>}
      <div className="col">{rec.map(({ o, m }) => <OppRow key={o.id} o={o} match={m} />)}</div>
      <h3>Quick Actions</h3>
      <div className="g4">{QA.map(([i, t, to, bg, c]) => <Link key={t} to={to} className="card qa"><span className="ico" style={{ background: bg, color: c }}><Icon n={i} /></span>{t}</Link>)}</div>
    </>
  )
}
