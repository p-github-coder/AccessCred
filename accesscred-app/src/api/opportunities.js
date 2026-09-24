import { useCallback, useEffect, useState } from 'react'

// Live opportunity data. Nothing is hard-coded:
//  - Remotive  (https://remotive.com/api)            jobs, internships, freelance/contract gigs
//  - Arbeitnow (https://www.arbeitnow.com/api)      jobs incl. entry-level roles
//  - Your own backend (VITE_API_URL/opportunities)  scholarships, fellowships, local gigs, apprenticeships
// Results are cached in localStorage for 6 hours (Remotive asks clients not to over-poll).
const DEV = import.meta.env.DEV
const RM = DEV ? '/proxy/remotive' : 'https://remotive.com/api'
const AN = DEV ? '/proxy/arbeitnow' : 'https://www.arbeitnow.com/api'
const EXTRA = import.meta.env.VITE_API_URL
const CK = 'accesscred_opps_v1'
const TTL = 6 * 3600e3
let mem = null

const plain = (h = '') => new DOMParser().parseFromString(h, 'text/html').body.textContent.replace(/\s+/g, ' ').trim().slice(0, 1800)
const kind = (t = '', title = '') => (/intern|trainee/i.test(title + ' ' + t) ? 'Internships' : /freelance|contract/i.test(t) ? 'Gigs' : 'Jobs')
async function getJson(url) {
  const c = new AbortController(); const id = setTimeout(() => c.abort(), 12000)
  try { const r = await fetch(url, { signal: c.signal }); if (!r.ok) throw new Error(url + ' → ' + r.status); return await r.json() } finally { clearTimeout(id) }
}
const fromRemotive = (d) => (d.jobs || []).map((j) => ({
  id: 'rm-' + j.id, title: j.title, org: j.company_name, logo: j.company_logo, location: j.candidate_required_location || 'Remote',
  type: kind(j.job_type, j.title), tags: [j.category, ...(j.tags || [])].filter(Boolean).slice(0, 4), posted: j.publication_date, url: j.url, desc: plain(j.description), salary: j.salary || '',
}))
const fromArbeitnow = (d) => (d.data || []).map((j) => ({
  id: 'an-' + j.slug, title: j.title, org: j.company_name, logo: '', location: j.location || (j.remote ? 'Remote' : ''),
  type: kind((j.job_types || []).join(), j.title), tags: (j.tags || []).slice(0, 4), posted: new Date(j.created_at * 1000).toISOString(), url: j.url, desc: plain(j.description), salary: '',
}))
const readCache = () => { try { return JSON.parse(localStorage.getItem(CK)) } catch { return null } }

export async function fetchOpportunities(force = false) {
  const c = readCache()
  if (!force && c && Date.now() - c.ts < TTL) return c.list
  const res = await Promise.allSettled([
    getJson(`${RM}/remote-jobs?limit=80`).then(fromRemotive),
    getJson(`${RM}/remote-jobs?search=intern&limit=30`).then(fromRemotive),
    getJson(`${AN}/job-board-api`).then(fromArbeitnow),
    EXTRA ? getJson(`${EXTRA}/opportunities`) : Promise.resolve([]),
  ])
  const seen = new Set()
  const list = res.flatMap((r) => (r.status === 'fulfilled' ? r.value : [])).filter((o) => o.id && !seen.has(o.id) && seen.add(o.id)).sort((a, b) => new Date(b.posted) - new Date(a.posted))
  if (!list.length) { if (c) return c.list; throw new Error('Could not reach the opportunity APIs. Check your connection and try again.') }
  try { localStorage.setItem(CK, JSON.stringify({ ts: Date.now(), list })) } catch {}
  return list
}
export const clearOpportunityCache = () => { mem = null; localStorage.removeItem(CK) }

export function useOpportunities() {
  const [s, set] = useState({ list: mem || [], loading: !mem, error: '' })
  const load = useCallback(async (force) => {
    set((x) => ({ ...x, loading: true, error: '' }))
    try { const list = await fetchOpportunities(force); mem = list; set({ list, loading: false, error: '' }) }
    catch (e) { set({ list: [], loading: false, error: e.message }) }
  }, [])
  useEffect(() => { if (!mem) load() }, [load])
  return { ...s, reload: () => load(true) }
}

// Simple client-side matching: overlap between profile skills and the listing.
export function match(o, p) {
  const sk = (p?.skills || []).map((s) => s.toLowerCase())
  if (!sk.length) return null
  const hay = (o.title + ' ' + o.tags.join(' ') + ' ' + o.desc).toLowerCase()
  const hits = sk.filter((s) => hay.includes(s))
  return { pct: Math.min(97, 35 + hits.length * 20), hits }
}
export function ago(iso) {
  const d = Math.max(0, Math.floor((Date.now() - new Date(iso)) / 864e5))
  return d === 0 ? 'Today' : d === 1 ? '1 day ago' : d < 7 ? d + ' days ago' : d < 14 ? '1 week ago' : Math.floor(d / 7) + ' weeks ago'
}
