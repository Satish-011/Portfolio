import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const sections = [
  "Home",
  "Work",
  "Practice",
  "Skills",
  "Writings",
  "About",
  "Contact",
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef(null);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  useEffect(() => {
    const update = () => {
      const current = sections
        .filter(
          (s) =>
            document.getElementById(s.toLowerCase())?.getBoundingClientRect()
              .top <= 135,
        )
        .at(-1);
      setActive(
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 3
          ? "contact"
          : (current || "Home").toLowerCase(),
      );
    };
    const escape = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a
          className="monogram"
          aria-label="Satish Kumar, home"
          href="#home"
          onClick={() => setOpen(false)}
        >
          sk<span>.</span>
        </a>
        <nav
          aria-label="Main navigation"
          id="navigation"
          className={open ? "opened" : ""}
        >
          {sections.map((s) => (
            <a
              key={s}
              aria-current={active === s.toLowerCase() ? "location" : undefined}
              href={"#" + s.toLowerCase()}
              onClick={() => setOpen(false)}
            >
              {s}
            </a>
          ))}
        </nav>
        <div className="nav-tools">
          <button
            aria-label={dark ? "Use light theme" : "Use dark theme"}
            onClick={() => setDark(!dark)}
          >
            {dark ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          <button
            ref={toggle}
            className="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
