import { useState, useEffect, useRef } from 'react'

const PROJECTS = [
  {
    id: 'calculator',
    slug: '01',
    title: 'Tron Calculator',
    stack: ['React', 'TypeScript', 'Vite', 'Vitest', 'Storybook'],
    description:
      'Calculator with a Tron-inspired aesthetic built in React and TypeScript. Developed following TDD: all tests were written first, then the implementation. Includes Storybook documentation for every component and a custom hook that encapsulates all calculator logic.',
    highlights: ['TDD workflow (red → green → refactor)', 'Component isolation via Storybook', 'useCalculator hook with full unit coverage'],
    url: 'https://gotkissss.github.io/Proyecto-2---Calculadora-/',
    repo: 'https://github.com/Gotkissss/Proyecto-2---Calculadora-',
  },
  {
    id: 'snake',
    slug: '02',
    title: 'Snake — React',
    stack: ['React', 'JavaScript', 'CSS'],
    description:
      'Classic Snake game implemented entirely in a single HTML file using React via CDN and Babel. Component-driven architecture with clear separation between game logic (Game), rendering (Board, Snake, Food), and UI (Score). Speed increases every 50 points across 4 levels.',
    highlights: ['Zero build step — React via CDN', 'Component tree with unidirectional data flow', 'Game loop with useEffect and dynamic interval speed'],
    url: 'https://gotkissss.github.io/laboratorio-7---React-/',
    repo: 'https://github.com/Gotkissss/laboratorio-7---React-',
  },
  {
    id: 'password',
    slug: '03',
    title: 'Password Strength Meter',
    stack: ['React', 'Vite', 'Vitest', 'React Testing Library'],
    description:
      'Password strength evaluator built with a strict TDD approach. Pure logic isolated in a utility function tested independently from the component. 100% coverage with edge cases, boundary conditions, and accessibility tests.',
    highlights: ['Pure logic separated from React component', 'Edge case coverage: boundaries, empty input, symbols', 'Accessible by label via React Testing Library'],
    url: 'https://gotkissss.github.io/password-strength-meter/',
    repo: 'https://github.com/Gotkissss/password-strength-meter',
  },
  {
    id: 'tracker',
    slug: '04',
    title: 'Series Tracker — Frontend',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vanilla ES Modules'],
    description:
      'Full-featured series tracking client built with zero frameworks. Native ES modules split across api.js, ui.js, and app.js. Communicates with a REST API backend, handles image uploads, real-time search, multi-field sorting, pagination, and CSV export generated client-side with Blob.',
    highlights: ['Module architecture without a bundler', 'CSV export via Blob API — no libraries', 'Real-time search + sort + pagination against a live API'],
    url: 'https://bespoke-sherbet-009345.netlify.app',
    repo: 'https://github.com/Gotkissss',
  },
]

const SKILLS = {
  Frontend: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Vite'],
  Testing: ['Vitest', 'React Testing Library', 'TDD', 'Storybook'],
  Backend: ['Go', 'REST APIs', 'SQLite', 'TCP server (net package)'],
  Security: ['Ethical Hacking', 'Penetration Testing', 'CTF', 'OSINT'],
  Tools: ['Git', 'GitHub Actions', 'Netlify', 'GitHub Pages'],
}

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return inView
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setActive(true)
    const up = () => setActive(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: active ? 8 : 12,
        height: active ? 8 : 12,
        background: 'var(--accent)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.1s, height 0.1s',
        mixBlendMode: 'difference',
      }}
    />
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 2.5rem',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
        DAQ
      </span>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {['work', 'skills', 'about'].map(s => (
          <a key={s} href={`#${s}`} style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--fg)'}
          onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >{s}</a>
        ))}
        
        <a 
          href="https://github.com/Gotkissss"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
          }}
        >github ↗</a>
      </div>
    </nav>
  )
}

function Hero() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 2.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.4,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.78rem',
          color: 'var(--accent)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          {'>'} init portfolio.js{tick % 2 === 0 ? '▋' : ' '}
        </p>

        <h1 style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: 'var(--fg)',
          marginBottom: '0.25rem',
        }}>
          Diego
        </h1>
        <h1 style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          fontWeight: 300,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: 'var(--muted)',
          marginBottom: '2.5rem',
        }}>
          Quixchan
        </h1>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '1.1rem',
          fontWeight: 300,
          color: 'var(--muted)',
          maxWidth: '520px',
          lineHeight: 1.7,
          marginBottom: '3rem',
        }}>
          CS student at Universidad del Valle de Guatemala.
          Frontend developer with a background in ethical hacking —
          I build interfaces that are clean on the surface and solid underneath.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#work" style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            color: 'var(--bg)',
            background: 'var(--fg)',
            textDecoration: 'none',
            padding: '0.7rem 1.6rem',
            letterSpacing: '0.08em',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'var(--accent)'}
          onMouseLeave={e => e.target.style.background = 'var(--fg)'}
          >VIEW WORK</a>
          <a href="https://github.com/Gotkissss" target="_blank" rel="noreferrer" style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.8rem',
            color: 'var(--fg)',
            background: 'transparent',
            textDecoration: 'none',
            padding: '0.7rem 1.6rem',
            letterSpacing: '0.08em',
            border: '1px solid var(--line)',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--line)'; e.target.style.color = 'var(--fg)' }}
          >GITHUB ↗</a>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2.5rem',
        fontFamily: 'var(--mono)',
        fontSize: '0.7rem',
        color: 'var(--muted)',
        letterSpacing: '0.1em',
        writingMode: 'vertical-rl',
        opacity: 0.5,
      }}>
        SCROLL TO EXPLORE
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '1px solid var(--line)',
        padding: '3rem 0',
        display: 'grid',
        gridTemplateColumns: '80px 1fr 1fr',
        gap: '2rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.7rem',
        color: 'var(--muted)',
        letterSpacing: '0.1em',
        paddingTop: '0.25rem',
      }}>
        {project.slug}
      </div>

      <div>
        <h3 style={{
          fontFamily: 'var(--mono)',
          fontSize: '1.2rem',
          fontWeight: 500,
          color: hovered ? 'var(--accent)' : 'var(--fg)',
          marginBottom: '1rem',
          transition: 'color 0.2s',
        }}>
          {project.title}
        </h3>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.9rem',
          color: 'var(--muted)',
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: '1.5rem',
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {project.stack.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.68rem',
              color: 'var(--muted)',
              border: '1px solid var(--line)',
              padding: '0.2rem 0.6rem',
              letterSpacing: '0.06em',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href={project.url} target="_blank" rel="noreferrer" style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            borderBottom: '1px solid var(--accent)',
            paddingBottom: '1px',
          }}>LIVE ↗</a>
          <a href={project.repo} target="_blank" rel="noreferrer" style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.75rem',
            color: 'var(--muted)',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            borderBottom: '1px solid var(--line)',
            paddingBottom: '1px',
          }}>REPO ↗</a>
        </div>
      </div>

      <div>
        <p style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.68rem',
          color: 'var(--muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          opacity: 0.6,
        }}>// highlights</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {project.highlights.map((h, i) => (
            <li key={i} style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.78rem',
              color: 'var(--muted)',
              lineHeight: 1.6,
              paddingLeft: '1.2rem',
              position: 'relative',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: 'var(--accent)',
              }}>→</span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Work() {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <section id="work" style={{ padding: '8rem 2.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div ref={ref} style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '1.5rem',
        marginBottom: '4rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: 'all 0.5s ease',
      }}>
        <h2 style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
        }}>Selected Work</h2>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
        }}>({PROJECTS.length} projects)</span>
      </div>
      {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      <div style={{ borderTop: '1px solid var(--line)' }} />
    </section>
  )
}

function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <section id="skills" style={{
      padding: '8rem 2.5rem',
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--surface)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 ref={ref} style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
          marginBottom: '4rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>Stack</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '3rem',
        }}>
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <p style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.68rem',
                color: 'var(--accent)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>{category}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {items.map(item => (
                  <li key={item} style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.85rem',
                    color: 'var(--muted)',
                    lineHeight: 1.9,
                    borderBottom: '1px solid var(--line)',
                    paddingBottom: '0.1rem',
                  }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <section id="about" style={{ padding: '8rem 2.5rem' }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(24px)',
        transition: 'all 0.6s ease',
      }} ref={ref}>
        <div>
          <h2 style={{
            fontFamily: 'var(--mono)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}>About</h2>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: '1.25rem',
          }}>
            I'm a Computer Science student at Universidad del Valle de Guatemala,
            with a double focus in frontend development and ethical hacking.
            That combination means I think about interfaces differently —
            not just how they look, but how they behave under pressure.
          </p>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: '1.25rem',
          }}>
            I'm most comfortable in React, but I care about understanding what's underneath.
            Two of my projects — the series tracker frontend and the snake game — were built
            without frameworks on purpose, to stay close to the platform.
          </p>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            Currently building skills in Go for backend systems, and expanding into
            full-stack work where security considerations are part of the design from day one.
          </p>
        </div>
        <div>
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.68rem',
            color: 'var(--accent)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>// currently</p>
          {[
            ['Status', 'Open to internships & junior roles'],
            ['Location', 'Guatemala City, GT'],
            ['Focus', 'Frontend + Security'],
            ['Learning', 'Go, full-stack architecture'],
            ['GitHub', '@Gotkissss'],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr',
              gap: '1rem',
              borderBottom: '1px solid var(--line)',
              padding: '0.75rem 0',
            }}>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                color: 'var(--muted)',
                opacity: 0.5,
                letterSpacing: '0.05em',
              }}>{label}</span>
              <span style={{
                fontFamily: 'var(--mono)',
                fontSize: '0.8rem',
                color: 'var(--fg)',
              }}>{value}</span>
            </div>
          ))}
          <div style={{ marginTop: '2.5rem' }}>
            <a href="https://github.com/Gotkissss" target="_blank" rel="noreferrer" style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.78rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: '2px',
            }}>
              GITHUB.COM/GOTKISSSS ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--line)',
      padding: '2rem 2.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.72rem',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
        opacity: 0.5,
      }}>© 2025 Diego Andrés Quixchan Amezquita</span>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '0.72rem',
        color: 'var(--muted)',
        letterSpacing: '0.08em',
        opacity: 0.5,
      }}>Built with React + Vite</span>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <style>{`
        :root {
          --bg: #080808;
          --surface: #0f0f0f;
          --fg: #f0ede8;
          --muted: #6b6560;
          --accent: #e8c547;
          --line: #1e1e1e;
          --mono: 'IBM Plex Mono', monospace;
          --sans: 'IBM Plex Sans', sans-serif;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--fg);
          cursor: none;
        }
        a { cursor: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--line); }
        @media (max-width: 768px) {
          body { cursor: auto; }
        }
      `}</style>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <About />
      </main>
      <Footer />
    </>
  )
}