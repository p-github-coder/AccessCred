import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Logo, Stepper } from '../components/ui'
import { useApp } from '../context/AppContext'
import { TASKS } from '../data/content'

export default function Verify() {
  const { me, patch } = useApp()
  const [tid, setTid] = useState(me.profile.track === 'Informal' ? 'seam' : 'card')
  const [step, setStep] = useState(1); const [imgs, setImgs] = useState([])
  const t = TASKS.find((x) => x.id === tid)
  const submit = () => {
    setStep(3)
    setTimeout(() => { patch((u) => ({ ...u, badges: [...u.badges.filter((b) => b.id !== t.id), { id: t.id, skill: t.skill, title: t.title, date: Date.now() }], profile: u.profile.skills.includes(t.skill) ? u.profile : { ...u.profile, skills: [...u.profile.skills, t.skill] } })); setStep(4) }, 2500)
  }
  return (
    <div className="col" style={{ maxWidth: 760, margin: '0 auto', width: '100%', gap: 20 }}>
      <Logo to="/dashboard" />
      <Stepper steps={['Task', 'Upload', 'Review', 'Complete']} cur={step} />
      <div><h2>Complete a Micro-Task</h2><p className="mut">Follow the steps below to complete this task. It will help verify your skill and add it to your profile.</p></div>
      {step === 1 && <div className="card col">
        <select value={tid} onChange={(e) => setTid(e.target.value)}>{TASKS.map((x) => <option key={x.id} value={x.id}>{x.skill}: {x.title}</option>)}</select>
        <div className="row" style={{ alignItems: 'stretch', gap: 16, flexWrap: 'wrap' }}><div className="taskimg" style={{ width: 200 }}><Icon n={t.icon} size={44} /></div>
          <div className="col grow" style={{ gap: 6 }}><h3>Task: {t.title}</h3><span className="mut sm">Skill: {t.skill}</span><p className="mut">{t.desc}</p>
            <div className="note"><b>What to submit</b><p className="sm">{t.submit}</p></div></div></div>
        <button className="btn coral block" onClick={() => setStep(2)}>Start Task</button><span className="mut sm" style={{ textAlign: 'center' }}>View task guidelines</span>
        {me.badges.length > 0 && <div className="row wrap"><span className="mut sm">Your badges:</span>{me.badges.map((b) => <span key={b.id} className="pill ok">✓ {b.skill}</span>)}</div>}</div>}
      {step === 2 && <div className="card col"><h3>Upload your work</h3>
        <label className="drop"><Icon n="upload" size={28} /><br />Tap to choose 3–6 photos<input type="file" accept="image/*" multiple hidden onChange={(e) => setImgs([...e.target.files].slice(0, 6).map((f) => URL.createObjectURL(f)))} /></label>
        <div className="thumbs">{imgs.map((u) => <img key={u} src={u} alt="" />)}</div>
        <div className="row between"><button className="btn ghost" onClick={() => setStep(1)}>Back</button><button className="btn coral" disabled={imgs.length < 3} onClick={submit}>Submit ({imgs.length}/3 minimum)</button></div></div>}
      {step === 3 && <div className="card col" style={{ textAlign: 'center', alignItems: 'center' }}><span className="ico"><Icon n="clock" size={24} /></span><h3>Reviewing your submission…</h3><p className="mut">An automatic check runs first, then a reviewer approves. This demo approves after a few seconds.</p></div>}
      {step === 4 && <div className="card col" style={{ textAlign: 'center', alignItems: 'center' }}><span className="ico" style={{ background: '#DDF3E8', color: '#1E9E6A' }}><Icon n="award" size={26} /></span><h3>Verified {t.skill} skill</h3><p className="mut">The badge is on your profile and now counts toward your matches.</p><Link to="/opportunities" className="btn coral">See my matches</Link></div>}
    </div>
  )
}
