import { useState } from 'react'
import { Icon, PageHead } from '../components/ui'
import { COURSES } from '../data/content'

export default function Learn() {
  const [tab, setTab] = useState('Courses')
  return (
    <>
      <PageHead title="Learning Resources" sub="Build the skills you need to reach your goals." />
      <div className="tabs">{Object.keys(COURSES).map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      <div className="g2">{COURSES[tab].map((c) => <div key={c.t} className="card row" style={{ alignItems: 'flex-start' }}>
        <span className="mono" style={{ width: 48, height: 48, borderRadius: 12, background: c.c }}><Icon n="book" size={22} /></span>
        <div className="col grow" style={{ gap: 4 }}><b>{c.t}</b><span className="mut sm">{c.d}</span><span className="sm"><Icon n="star" size={12} fill /> {c.r}</span><button className="btn sm" style={{ alignSelf: 'flex-start', marginTop: 4 }}>Start {tab === 'Webinars' ? 'Webinar' : tab === 'Guides' ? 'Guide' : 'Course'}</button></div></div>)}</div>
    </>
  )
}
