import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Icon, Logo, Stepper } from '../components/ui'
import { useApp } from '../context/AppContext'
import { SKILL_HINTS } from '../data/content'

export default function Onboarding() {
  const { me, patch } = useApp()
  const nav = useNavigate()
  const [step, setStep] = useState(1)
  const [p, setP] = useState(me?.profile || {})
  const [sk, setSk] = useState('')
  if (!me) return <Navigate to="/login" replace />
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value })
  const formal = p.track !== 'Informal'
  const addSkill = (s) => { s = s.trim(); if (s && !p.skills.some((x) => x.toLowerCase() === s.toLowerCase())) setP({ ...p, skills: [...p.skills, s] }); setSk('') }
  const finish = () => { patch((u) => ({ ...u, profile: p })); nav('/dashboard') }
  const pick = (t) => { setP({ ...p, track: t }); setStep(2) }
  return (
    <div className="onb">
      <Logo />
      <Stepper steps={['Track', 'Profile', 'Skills', 'Complete']} cur={step} />
      {step === 1 && <>
        <div style={{ textAlign: 'center' }}><h2>What track are you joining?</h2><p className="mut">You can choose one or both. This helps us show you the right opportunities and resources.</p></div>
        <div className="paths2">
          {[['Formal', 'Formal Track', 'cap', 'For students and early-career talent (education, internships, fellowships, jobs).'], ['Informal', 'Informal Track', 'scissors', 'For skilled workers and tradespeople (tailoring, carpentry, fashion, etc.).']].map(([k, t, i, d]) =>
            <div key={k} className={'card tcard' + (p.track === k ? ' sel' : '')}><span className="ico" style={k === 'Informal' ? { background: 'var(--peach)', color: '#D8552F' } : {}}><Icon n={i} size={24} /></span><b>{t}</b><span className="mut sm">{d}</span><button className="btn block" onClick={() => pick(k)}>Select</button></div>)}
        </div>
        <Link to="/dashboard" className="mut" style={{ textAlign: 'center' }}>Skip for now</Link>
      </>}
      {step === 2 && <div className="card col" style={{ maxWidth: 560, margin: '0 auto', width: '100%' }}>
        <h2>Tell us about yourself</h2>
        {formal ? <>
          <div><label>Institution</label><input value={p.institution} onChange={set('institution')} placeholder="University of Lagos" /></div>
          <div><label>Field of study</label><input value={p.field} onChange={set('field')} placeholder="Computer Science" /></div>
          <div className="g2"><div><label>Level</label><input value={p.level} onChange={set('level')} placeholder="200 Level" /></div><div><label>CGPA</label><input value={p.cgpa} onChange={set('cgpa')} placeholder="4.2" /></div></div>
        </> : <>
          <div><label>Your trade</label><input value={p.trade} onChange={set('trade')} placeholder="Tailoring" /></div>
          <div><label>Location</label><input value={p.location} onChange={set('location')} placeholder="Nairobi, Kenya" /></div>
        </>}
        <div><label>About you</label><textarea rows="3" value={p.about} onChange={set('about')} placeholder="A short introduction" /></div>
        <div className="row between"><button className="btn ghost" onClick={() => setStep(1)}>Back</button><button className="btn" onClick={() => setStep(3)}>Continue</button></div>
      </div>}
      {step === 3 && <div className="card col" style={{ maxWidth: 560, margin: '0 auto', width: '100%' }}>
        <h2>Add your skills</h2><p className="mut">These power your opportunity matches. Add at least 3.</p>
        <div className="row"><input value={sk} onChange={(e) => setSk(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill(sk)} placeholder="Type a skill and press Enter" /><button className="btn" onClick={() => addSkill(sk)}>Add</button></div>
        <div className="row wrap">{p.skills.map((s) => <button key={s} className="chip on" onClick={() => setP({ ...p, skills: p.skills.filter((x) => x !== s) })}>{s} ×</button>)}</div>
        <div className="mut sm">Suggestions</div>
        <div className="row wrap">{SKILL_HINTS[formal ? 'Formal' : 'Informal'].filter((s) => !p.skills.includes(s)).map((s) => <button key={s} className="chip" onClick={() => addSkill(s)}>+ {s}</button>)}</div>
        <div className="row between"><button className="btn ghost" onClick={() => setStep(2)}>Back</button><button className="btn" onClick={() => setStep(4)}>Continue</button></div>
      </div>}
      {step === 4 && <div className="card col" style={{ maxWidth: 560, margin: '0 auto', width: '100%', textAlign: 'center', alignItems: 'center' }}>
        <span className="ico" style={{ background: '#DDF3E8', color: '#1E9E6A' }}><Icon n="check" size={24} /></span><h2>You're all set, {me.name.split(' ')[0]}!</h2><p className="mut">Your profile is saved. We'll match you to live opportunities next.</p><button className="btn coral" onClick={finish}>Go to Dashboard</button>
      </div>}
    </div>
  )
}
