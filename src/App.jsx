import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowUp,
  Code2,
  Server,
  Database,
  Braces,
  NotebookPen,
  Terminal,
} from "lucide-react";
import Navigation from "./components/Navigation";
import Links from "./components/Links";
import CompetitiveProgramming from "./sections/CompetitiveProgramming";
import Activity from "./sections/Activity";
import { profile, projects, skills, writings } from "./data/portfolio";
const icons = [Code2, Server, Database, Braces];
function Reveal({ children }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.36 }}
    >
      {children}
    </motion.div>
  );
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Navigation />
      <main id="content" className="shell">
        <section id="home" className="hero">
          <Reveal>
            <div className="identity">
              <div className="avatar">
                <img
                  src={profile.avatar}
                  width="78"
                  height="78"
                  alt={profile.name + "’s GitHub avatar"}
                />
              </div>
              <div>
                <div className="status">
                  <i /> Open to Opportunities
                </div>
                <h1>{profile.name}</h1>
              </div>
            </div>
            <p className="role">{profile.role}</p>
            <p className="intro">{profile.intro}</p>
            <Links />
          </Reveal>
        </section>
        <section id="work">
          <div className="section-head">
            <h2>Featured work</h2>
            <a
              className="text-link"
              href={profile.github + "?tab=repositories"}
            >
              Repositories <ArrowUpRight size={14} />
            </a>
          </div>
          {projects.map((p) => (
            <Reveal key={p.name}>
              <article className="project">
                <a
                  className="project-image"
                  href={p.github}
                  aria-label={"View " + p.name + " source"}
                >
                  {p.preview && (
                    <img
                      loading="lazy"
                      decoding="async"
                      src={p.preview}
                      srcSet={
                        p.previewSmall
                          ? p.previewSmall + " 600w, " + p.preview + " 1200w"
                          : undefined
                      }
                      sizes="(max-width: 740px) 94vw, 704px"
                      alt={p.previewAlt}
                      width="1200"
                      height="610"
                    />
                  )}
                </a>
                <div className="project-body">
                  <div className="project-title">
                    <h3>
                      <a href={p.github}>{p.name}</a>
                    </h3>
                    <a
                      className="round-link"
                      href={p.github}
                      aria-label={"Open " + p.name + " on GitHub"}
                    >
                      <ArrowUpRight size={17} />
                    </a>
                  </div>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {p.demo && (
                    <a className="text-link" href={p.demo}>
                      Live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </section>
        <Reveal>
          <Activity />
        </Reveal>
        <CompetitiveProgramming />
        <section id="skills">
          <h2>Skills</h2>
          <div className="skills">
            {skills.map(([name, items], i) => {
              const Icon = icons[i] || Code2;
              return (
                <div key={name}>
                  <h3>
                    <Icon size={17} />
                    {name}
                  </h3>
                  <p>{items.join(" · ")}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section id="writings">
          <h2>Writings</h2>
          {writings.length ? (
            writings.map((a) => (
              <article key={a.url} className="entry">
                <h3>
                  <a href={a.url}>{a.title}</a>
                </h3>
                <p>{a.description}</p>
                <small>
                  <time dateTime={a.date}>{a.date}</time> · {a.readingTime}
                </small>
              </article>
            ))
          ) : (
            <div className="empty">
              <NotebookPen size={22} />
              <div>
                <h3>No published notes yet</h3>
                <p>This space is for things I learn while building.</p>
              </div>
            </div>
          )}
        </section>
        <section id="about">
          <h2>A little about me</h2>
          <div className="about">
            <p>
              I like taking a feature apart to see how it works. Sometimes that
              means following a request from an API to its database entry. Other
              times it means working through a data structures problem in C++ or
              trying a new tool in a small project.
            </p>
            <Terminal size={46} strokeWidth={1.2} />
          </div>
          {profile.education && <p>{profile.education}</p>}
        </section>
        <section id="contact">
          <h2>Get in touch</h2>
          <p className="contact-copy">
            I’m open to full-stack and backend opportunities. You can find me
            here.
          </p>
          <Links />
        </section>
        <footer className="portfolio-footer">
          <div className="footer-signature">
            <span className="ledger-mark" aria-hidden="true">
              <span>DR <b>−1</b></span>
              <span>CR <b>+1</b></span>
            </span>
            <span>
            Built by Satish Kumar{" "}
            <span className="year">© {new Date().getFullYear()}</span>
          </span>
          </div>
          <a href="#home">
            Back to top <ArrowUp size={13} />
          </a>
        </footer>
      </main>
    </MotionConfig>
  );
}
