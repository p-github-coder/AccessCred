import { useState } from 'react'
import { PageHead } from '../components/ui'
import { useApp } from '../context/AppContext'
import { clearOpportunityCache } from '../api/opportunities'

export default function Settings() {
  const { me, patch, remove } = useApp()
  const [tab, setTab] = useState('Account'); const [f, setF] = useState({ name: me.name, email: me.email, phone: me.phone || '' })
  const [pw, setPw] = useState({ cur: '', next: '' }); const [msg, setMsg] = useState('')
  const s = me.settings
  const flip = (k) => patch((u) => ({ ...u, settings: { ...u.settings, [k]: !u.settings[k] } }))
  const Row = ({ k, l }) => <div className="li"><span className="grow">{l}</span><button className={'tog' + (s[k] ? ' on' : '')} onClick={() => flip(k)} aria-label={l} /></div>
  const save = () => { patch((u) => ({ ...u, name: f.name, phone: f.phone })); setMsg('Saved.') }
  const changePw = () => {
    if (btoa(pw.cur) !== me.password) return setMsg('Current password is incorrect.')
    if (pw.next.length < 6) return setMsg('New password must be at least 6 characters.')
    patch((u) => ({ ...u, password: btoa(pw.next) })); setPw({ cur: '', next: '' }); setMsg('Password updated.')
  }
  return (
    <>
      <PageHead title="Settings" />
      <div className="tabs">{['Account', 'Notifications', 'Privacy', 'Appearance'].map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => { setTab(t); setMsg('') }}>{t}</button>)}</div>
      <div className="card col" style={{ maxWidth: 640 }}>
        {tab === 'Account' && <>
          <div><label>Full name</label><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
          <div><label>Email</label><input value={f.email} disabled /></div>
          <div><label>Phone number</label><input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
          <button className="btn" style={{ alignSelf: 'flex-start' }} onClick={save}>Save changes</button>
          <hr style={{ border: 0, borderTop: '1px solid var(--ln)', width: '100%' }} />
          <div className="g2"><div><label>Current password</label><input type="password" value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} /></div><div><label>New password</label><input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></div></div>
          <button className="btn ghost" style={{ alignSelf: 'flex-start' }} onClick={changePw}>Change password</button>
          <button className="linkbtn" style={{ alignSelf: 'flex-start', color: 'var(--bad)', fontWeight: 600 }} onClick={() => confirm('Delete your account and all saved data?') && remove()}>Delete account</button></>}
        {tab === 'Notifications' && <><Row k="whatsapp" l="Deadline reminders on WhatsApp" /><Row k="email" l="Email notifications" /><Row k="digest" l="Weekly opportunity digest" /></>}
        {tab === 'Privacy' && <><Row k="publicProfile" l="Public shareable profile" /><Row k="offline" l="Cache opportunities for offline use" /><button className="btn ghost" style={{ alignSelf: 'flex-start' }} onClick={() => { clearOpportunityCache(); setMsg('Opportunity cache cleared.') }}>Clear cached opportunities</button></>}
        {tab === 'Appearance' && <div><label>Theme</label><div className="seg">{['light', 'dark'].map((t) => <button key={t} className={s.theme === t ? 'on' : ''} onClick={() => patch((u) => ({ ...u, settings: { ...u.settings, theme: t } }))}>{t[0].toUpperCase() + t.slice(1)}</button>)}</div></div>}
        {msg && <div className="mut sm">{msg}</div>}
      </div>
    </>
  )
}
