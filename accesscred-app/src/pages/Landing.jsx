import { Link } from 'react-router-dom'
import { Icon, Logo } from '../components/ui'
import { useApp } from '../context/AppContext'

const FEAT = [['file', 'Prove Your Skills', 'Get verified through work or documents.'], ['compass', 'Discover Opportunities', 'Find jobs, internships and more.'], ['target', 'Close the Gap', 'Get personalised guidance and learning resources.'], ['trend', 'Build Your Future', 'One profile. All opportunities.']]

export default function Landing() {
  const { me } = useApp()
  return (
    <div>
      <header className="top">
        <Logo />
        <nav><Link to="/">Home</Link><Link to={me ? '/opportunities' : '/login'}>Opportunities</Link><a href="#paths">About</a><Link to={me ? '/messages' : '/login'}>Help</Link></nav>
        {me ? <Link to="/dashboard" className="btn sm">Dashboard</Link> : <><Link to="/login" className="btn ghost sm">Log in</Link><Link to="/signup" className="btn sm">Sign up</Link></>}
      </header>
      <section className="hero">
        <div className="col" style={{ gap: 18 }}>
          <h1>Your Skills.<br />Real Opportunities.</h1>
          <p className="mut" style={{ fontSize: 16, maxWidth: 460 }}>Get verified for what you can do. Discover scholarships, internships, jobs and gigs, whether your strength is a transcript or a trade.</p>
          <div className="row"><Link to={me ? '/dashboard' : '/signup'} className="btn">Get Started</Link><a href="#paths" className="btn ghost">Learn More</a></div>
        </div>
        <div className="art" aria-hidden="true">
          <div className="card row"><span className="ico" style={{ background: '#DDF3E8', color: '#1E9E6A' }}><Icon n="shield" /></span><div className="grow"><b>Verified Sewing Skill</b><div className="mut sm">Badge issued after review</div></div><span className="pill ok">Verified</span></div>
          <div className="card row" style={{ marginLeft: 36 }}><span className="ico"><Icon n="briefcase" /></span><div className="grow"><b>Software Internship</b><div className="mut sm">Remote • 3 of 5 checklist items</div></div><span className="pill">82% match</span></div>
          <div className="card row"><span className="ico" style={{ background: 'var(--peach)', color: '#D8552F' }}><Icon n="cap" /></span><div className="grow"><b>Scholarship deadline</b><div className="mut sm">Closes in 9 days</div></div></div>
        </div>
      </section>
      <section className="feat">{FEAT.map(([i, t, d]) => <div className="card" key={t}><span className="ico"><Icon n={i} size={22} /></span><b>{t}</b><span className="mut sm">{d}</span></div>)}</section>
      <section id="paths" className="col" style={{ padding: '36px 6vw 16px' }}><h2>For Every Dream, Every Path</h2></section>
      <section className="paths">
        <div className="card" style={{ background: 'var(--soft)' }}><span className="ico" style={{ background: 'var(--card)' }}><Icon n="cap" size={22} /></span><div className="col" style={{ gap: 6 }}><b>Formal Track</b><span className="mut sm">For students and early-career talent (education, internships, fellowships, jobs).</span><Link to="/signup" className="btn sm" style={{ alignSelf: 'flex-start' }}>Get Started</Link></div></div>
        <div className="card" style={{ background: 'var(--peach)' }}><span className="ico" style={{ background: 'var(--card)', color: '#D8552F' }}><Icon n="scissors" size={22} /></span><div className="col" style={{ gap: 6 }}><b>Informal Track</b><span className="mut sm">For skilled workers and tradespeople (tailoring, carpentry, fashion and more).</span><Link to="/signup" className="btn sm" style={{ alignSelf: 'flex-start' }}>Get Started</Link></div></div>
      </section>
      <footer className="foot"><Logo /><span>A verified platform for a more inclusive and skilled Africa.</span><span className="row" style={{ gap: 16 }}><a href="#paths">About</a><Link to="/login">Help</Link><a href="#paths">Privacy</a><a href="#paths">Terms</a></span></footer>
    </div>
  )
}
