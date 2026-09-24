import { createContext, useContext, useEffect, useState } from 'react'

// Local "database" in localStorage. Every user's data lives under db.users[email].
// Swap these functions for real API calls when you add a backend.
const KEY = 'accesscred_db_v1'
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { users: {}, session: null } } catch { return { users: {}, session: null } } }
const blank = (u) => ({
  ...u,
  profile: { track: '', institution: '', field: '', level: '', cgpa: '', trade: '', location: '', about: '', experience: '', skills: [], docs: [] },
  saved: [], apps: [], badges: [],
  threads: [{ id: 'support', name: 'AccessCred Support', msgs: [{ from: 'them', text: 'Welcome to AccessCred! Ask us anything about your profile or applications.', t: Date.now() }] }],
  settings: { whatsapp: true, email: false, digest: true, offline: true, publicProfile: true, theme: 'light' },
})
const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

export function AppProvider({ children }) {
  const [db, setDb] = useState(read)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch {} }, [db])
  const me = db.session ? db.users[db.session] : null
  useEffect(() => { document.documentElement.dataset.theme = me?.settings.theme || 'light' }, [me?.settings.theme])

  const api = {
    me,
    register({ name, email, phone, password, track }) {
      const id = email.trim().toLowerCase()
      if (db.users[id]) throw new Error('An account with this email already exists.')
      const u = blank({ id, name, email: id, phone, password: btoa(password) })
      u.profile.track = track
      setDb({ users: { ...db.users, [id]: u }, session: id })
    },
    login(idf, password) {
      const k = idf.trim().toLowerCase()
      const u = Object.values(db.users).find((x) => x.email === k || x.phone === idf.trim())
      if (!u || u.password !== btoa(password)) throw new Error('Incorrect email/phone or password.')
      setDb({ ...db, session: u.id })
    },
    logout: () => setDb({ ...db, session: null }),
    remove() { const users = { ...db.users }; delete users[db.session]; setDb({ users, session: null }) },
    patch: (fn) => setDb((d) => (d.session ? { ...d, users: { ...d.users, [d.session]: fn(d.users[d.session]) } } : d)),
  }
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function completion(me) {
  const p = me.profile
  const checks = [p.track, p.institution || p.trade, p.about, p.skills.length >= 3, p.location || p.level || p.cgpa, me.badges.length || p.docs.length]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}
