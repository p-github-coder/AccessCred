import { useState } from 'react'
import { Icon, PageHead, initials } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { me, patch } = useApp()
  const p = me.profile
  const [tab, setTab] = useState('Overview'); const [edit, setEdit] = useState(false); const [d, setD] = useState(p); const [sk, setSk] = useState('')
  const formal = p.track !== 'Informal'
  const save = () => { patch((u) => ({ ...u, profile: d })); setEdit(false) }
  const set = (k) => (e) => setD({ ...d, [k]: e.target.value })
  const sub = formal ? [p.field && p.field + ' Undergraduate', p.cgpa && 'CGPA ' + p.cgpa, p.level, p.institution].filter(Boolean).join(' • ') : [p.trade, p.location].filter(Boolean).join(' • ')
  const addSkill = () => { const s = sk.trim(); if (s && !p.skills.includes(s)) patch((u) => ({ ...u, profile: { ...u.profile, skills: [...u.profile.skills, s] } })); setSk('') }
  const addDoc = (e) => { const f = [...e.target.files].map((x) => ({ name: x.name, size: x.size })); patch((u) => ({ ...u, profile: { ...u.profile, docs: [...u.profile.docs, ...f] } })) }
  return (
    <>
      <PageHead title="My Profile" />
      <div className="card row wrap"><span className="avatar" style={{ width: 64, height: 64, fontSize: 20 }}>{initials(me.name)}</span>
        <div className="grow"><h2>{me.name}</h2><span className="mut">{sub || 'Add your details to complete your profile'}</span></div>
        <button className="btn ghost sm" onClick={() => { setD(p); setEdit(!edit) }}><Icon n="edit" size={14} /> {edit ? 'Cancel' : 'Edit Profile'}</button></div>
      {edit && <div className="card col"><div className="g2">
        {formal ? [['institution', 'Institution'], ['field', 'Field of study'], ['level', 'Level'], ['cgpa', 'CGPA']].map(([k, l]) => <div key={k}><label>{l}</label><input value={d[k]} onChange={set(k)} /></div>)
          : [['trade', 'Trade'], ['location', 'Location']].map(([k, l]) => <div key={k}><label>{l}</label><input value={d[k]} onChange={set(k)} /></div>)}
      </div><div><label>About me</label><textarea rows="3" value={d.about} onChange={set('about')} /></div><button className="btn" style={{ alignSelf: 'flex-start' }} onClick={save}>Save changes</button></div>}
      <div className="tabs">{['Overview', 'Education', 'Skills', 'Work Experience', 'Documents'].map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      {tab === 'Overview' && <div className="card col"><h3>About Me</h3><p className="mut">{p.about || 'Tell us about yourself using Edit Profile.'}</p><h3>Skills</h3>
        <div className="row wrap">{p.skills.map((s) => <span key={s} className="pill">{s}</span>)}{!p.skills.length && <span className="mut">No skills yet.</span>}</div>
        {me.badges.length > 0 && <><h3>Verified badges</h3><div className="row wrap">{me.badges.map((b) => <span key={b.id} className="pill ok">✓ {b.skill}</span>)}</div></>}
        <div className="row between"><h3>Education</h3></div>{p.institution ? <div className="li"><span className="ico"><Icon n="cap" /></span><div><b>{p.institution}</b><div className="mut sm">{[p.field, p.level, p.cgpa && 'CGPA ' + p.cgpa].filter(Boolean).join(' • ')}</div></div></div> : <span className="mut">No education added.</span>}</div>}
      {tab === 'Education' && <div className="card">{p.institution ? <div className="li"><span className="ico"><Icon n="cap" /></span><div><b>{p.institution}</b><div className="mut sm">{[p.field, p.level, p.cgpa && 'CGPA ' + p.cgpa].filter(Boolean).join(' • ')}</div></div></div> : <span className="mut">Add education with Edit Profile.</span>}</div>}
      {tab === 'Skills' && <div className="card col"><div className="row"><input value={sk} onChange={(e) => setSk(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill()} placeholder="Add a skill" /><button className="btn" onClick={addSkill}>Add</button></div>
        <div className="row wrap">{p.skills.map((s) => <button key={s} className="chip on" onClick={() => patch((u) => ({ ...u, profile: { ...u.profile, skills: u.profile.skills.filter((x) => x !== s) } }))}>{s} ×</button>)}</div></div>}
      {tab === 'Work Experience' && <div className="card col"><textarea rows="5" value={p.experience} placeholder="Describe your work experience, internships or projects" onChange={(e) => patch((u) => ({ ...u, profile: { ...u.profile, experience: e.target.value } }))} /><span className="mut sm">Saved automatically.</span></div>}
      {tab === 'Documents' && <div className="card col"><label className="drop"><Icon n="upload" /> Add CV or transcript<input type="file" hidden multiple onChange={addDoc} /></label>{p.docs.map((x, i) => <div className="li" key={i}><Icon n="file" /><b className="grow">{x.name}</b><span className="mut sm">{Math.round(x.size / 1024)} KB</span></div>)}<span className="mut sm">Only file names are stored in this demo.</span></div>}
    </>
  )
}
