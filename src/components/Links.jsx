import { Github, Linkedin, Mail, FileText, ArrowUpRight } from "lucide-react";
import { profile } from "../data/portfolio";
export default function Links() {
  const links = [
    ["GitHub", profile.github, Github],
    ["LinkedIn", profile.linkedin, Linkedin],
    ["Email", profile.email && "mailto:" + profile.email, Mail],
    ["Résumé", profile.resume, FileText],
  ];
  return (
    <div className="socials">
      {links.map(([label, href, Icon]) =>
        href ? (
          <a key={label} href={href}>
            <Icon size={15} />
            {label}
            <ArrowUpRight size={12} />
          </a>
        ) : (
          <span
            key={label}
            title={label + " has not been added yet"}
            aria-label={label + " unavailable"}
          >
            <Icon size={15} />
            {label}
          </span>
        ),
      )}
    </div>
  );
}
