import { useState } from 'react'
import { Icon, PageHead, initials } from '../components/ui'
import { useApp } from '../context/AppContext'

export default function Messages() {
  const { me, patch } = useApp()
  const [q, setQ] = useState(''); const [sel, setSel] = useState('support'); const [txt, setTxt] = useState('')
  const th = me.threads.find((x) => x.id === sel) || me.threads[0]
  const time = (t) => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const add = (id, m) => patch((u) => ({ ...u, threads: u.threads.map((x) => (x.id === id ? { ...x, msgs: [...x.msgs, m] } : x)) }))
  const send = () => {
    if (!txt.trim()) return
    add(th.id, { from: 'me', text: txt.trim(), t: Date.now() }); setTxt('')
    if (th.id === 'support') setTimeout(() => add('support', { from: 'them', text: 'Thanks for reaching out. A team member will reply here soon.', t: Date.now() }), 1200)
  }
  return (
    <>
      <PageHead title="Messages" />
      <div className="msgs">
        <div className="card col" style={{ gap: 4, alignContent: 'start' }}>
          <input placeholder="Search conversations" value={q} onChange={(e) => setQ(e.target.value)} />
          {me.threads.filter((x) => x.name.toLowerCase().includes(q.toLowerCase())).map((x) => { const l = x.msgs[x.msgs.length - 1]; return (
            <div key={x.id} className={'conv' + (x.id === th.id ? ' on' : '')} onClick={() => setSel(x.id)}><span className="avatar">{initials(x.name)}</span><div className="grow"><b>{x.name}</b><div className="mut sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.text}</div></div><span className="mut sm">{time(l.t)}</span></div>) })}
        </div>
        <div className="card col" style={{ justifyContent: 'space-between' }}>
          <b>{th.name}</b>
          <div className="col grow" style={{ padding: '10px 0' }}>{th.msgs.map((m, i) => <div key={i} className={'bub' + (m.from === 'me' ? ' me' : '')}>{m.text}<div className="sm" style={{ opacity: .6 }}>{time(m.t)}</div></div>)}</div>
          <div className="row"><input placeholder="Type a message" value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} /><button className="btn" onClick={send} aria-label="Send"><Icon n="send" /></button></div>
        </div>
      </div>
    </>
  )
}
