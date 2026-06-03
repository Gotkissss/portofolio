import { useState, useEffect, useRef } from 'react'

const PROJECTS = [
  {
    id: 'calculator',
    slug: '01',
    title: 'Calculadora Tron',
    stack: ['React', 'TypeScript', 'Vite', 'Vitest', 'Storybook'],
    description:
      'Calculadora con estética inspirada en Tron, construida en React y TypeScript. Desarrollada siguiendo TDD: todas las pruebas se escribieron primero, luego la implementación. Incluye documentación en Storybook para cada componente y un hook personalizado que encapsula toda la lógica de la calculadora.',
    highlights: ['Flujo TDD (rojo → verde → refactor)', 'Aislamiento de componentes con Storybook', 'Hook useCalculator con cobertura total de pruebas'],
    url: 'https://gotkissss.github.io/Proyecto-2---Calculadora-/',
    repo: 'https://github.com/Gotkissss/Proyecto-2---Calculadora-',
  },
  {
    id: 'snake',
    slug: '02',
    title: 'Snake — React',
    stack: ['React', 'JavaScript', 'CSS'],
    description:
      'Juego clásico de Snake implementado en un solo archivo HTML usando React vía CDN y Babel. Arquitectura orientada a componentes con separación clara entre lógica de juego (Game), renderizado (Board, Snake, Food) e interfaz (Score). La velocidad aumenta cada 50 puntos en 4 niveles.',
    highlights: ['Sin proceso de build — React vía CDN', 'Árbol de componentes con flujo de datos unidireccional', 'Game loop con useEffect e intervalo de velocidad dinámica'],
    url: 'https://gotkissss.github.io/laboratorio-7---React-/',
    repo: 'https://github.com/Gotkissss/laboratorio-7---React-',
  },
  {
    id: 'password',
    slug: '03',
    title: 'Medidor de Fortaleza de Contraseña',
    stack: ['React', 'Vite', 'Vitest', 'React Testing Library'],
    description:
      'Evaluador de fortaleza de contraseñas construido con un enfoque estricto de TDD. Lógica pura aislada en una función utilitaria probada independientemente del componente. Cobertura del 100% con casos borde, condiciones límite y pruebas de accesibilidad.',
    highlights: ['Lógica pura separada del componente React', 'Cobertura de casos borde: límites, entrada vacía, símbolos', 'Accesible por etiqueta con React Testing Library'],
    url: 'https://gotkissss.github.io/password-strength-meter/',
    repo: 'https://github.com/Gotkissss/password-strength-meter',
  },
  {
    id: 'tracker',
    slug: '04',
    title: 'Series Tracker — Frontend',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vanilla ES Modules'],
    description:
      'Cliente completo para rastrear series, construido sin frameworks. Módulos ES nativos divididos en api.js, ui.js y app.js. Se comunica con una API REST, maneja subida de imágenes, búsqueda en tiempo real, ordenamiento por múltiples campos, paginación y exportación CSV generada en el cliente con Blob.',
    highlights: ['Arquitectura modular sin bundler', 'Exportación CSV vía Blob API — sin librerías', 'Búsqueda + orden + paginación en tiempo real contra una API activa'],
    url: 'https://bespoke-sherbet-009345.netlify.app',
    repo: 'https://github.com/Gotkissss',
  },
]

const SKILLS = {
  Frontend: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Vite'],
  Testing: ['Vitest', 'React Testing Library', 'TDD', 'Storybook'],
  Backend: ['Go', 'REST APIs', 'SQLite', 'TCP server (net package)'],
  Seguridad: ['Ethical Hacking', 'Penetration Testing', 'CTF', 'OSINT'],
  Herramientas: ['Git', 'GitHub Actions', 'Netlify', 'GitHub Pages'],
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
        {[['trabajo', 'work'], ['habilidades', 'skills'], ['sobre mí', 'about']].map(([label, id]) => (
          <a key={id} href={`#${id}`} style={{
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
          >{label}</a>
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
          {'>'} init portafolio.js{tick % 2 === 0 ? '▋' : ' '}
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
          Estudiante de Ciencias de la Computación en la Universidad del Valle de Guatemala.
          Desarrollador frontend con trasfondo en ethical hacking —
          construyo interfaces limpias por fuera y sólidas por dentro.
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
          >VER TRABAJO</a>
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
        DESLIZAR PARA EXPLORAR
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
          }}>EN VIVO ↗</a>
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
        }}>// destacados</p>
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
        }}>Proyectos Seleccionados</h2>
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          color: 'var(--muted)',
          letterSpacing: '0.1em',
        }}>({PROJECTS.length} proyectos)</span>
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
        }}>Tecnologías</h2>

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
          }}>Sobre mí</h2>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: '1.25rem',
          }}>
            Soy estudiante de Ciencias de la Computación en la Universidad del Valle de Guatemala,
            con doble enfoque en desarrollo frontend y ethical hacking.
            Esa combinación hace que piense en las interfaces de forma diferente —
            no solo cómo se ven, sino cómo se comportan bajo presión.
          </p>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: '1.25rem',
          }}>
            Me siento más cómodo en React, pero me importa entender lo que hay debajo.
            Dos de mis proyectos — el frontend del series tracker y el juego snake — fueron construidos
            sin frameworks a propósito, para mantenerme cerca de la plataforma.
          </p>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            fontWeight: 300,
          }}>
            Actualmente desarrollando habilidades en Go para sistemas backend, y expandiéndome hacia
            trabajo fullstack donde las consideraciones de seguridad son parte del diseño desde el primer día.
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
          }}>// actualmente</p>
          {[
            ['Estado', 'Abierto a prácticas y puestos junior'],
            ['Ubicación', 'Ciudad de Guatemala, GT'],
            ['Enfoque', 'Frontend + Seguridad'],
            ['Aprendiendo', 'Go, arquitectura fullstack'],
            ['GitHub', '@Gotkissss'],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: 'grid',
              gridTemplateColumns: '110px 1fr',
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
      }}>Construido con React + Vite</span>
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