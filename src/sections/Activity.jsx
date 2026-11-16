import CalendarGrid from "../components/CalendarGrid";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import snapshot from "../data/activity.json";
import { profile } from "../data/portfolio";
const saved = { username: "Satish-011", date: "2026-11-16", data: snapshot };
const colors = ["#e4e5dd", "#cad2b0", "#9da982", "#73815f", "#47573f"];
export default function Activity() {
  const year = new Date().getFullYear();
  const fallback =
    profile.username === saved.username &&
    year === Number(saved.date.slice(0, 4));
  const [data, setData] = useState(fallback ? saved.data : null);
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let current = true;
    const timer = setTimeout(() => controller.abort(), 9000);
    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(
          "https://github-contributions-api.jogruber.de/v4/" +
            encodeURIComponent(profile.username) +
            "?y=" +
            year,
          { signal: controller.signal },
        );
        if (!res.ok) throw Error();
        const json = await res.json();
        if (
          !Array.isArray(json.contributions) ||
          !json.contributions.length ||
          !json.contributions.every(
            (d) =>
              /^\d{4}-\d{2}-\d{2}$/.test(d.date) &&
              Number.isInteger(d.count) &&
              d.count >= 0 &&
              Number.isInteger(d.level) &&
              d.level >= 0 &&
              d.level <= 4,
          )
        )
          throw Error();
        if (current) {
          setData(json);
          setStatus("ready");
        }
      } catch {
        if (current) setStatus("error");
      } finally {
        clearTimeout(timer);
      }
    }
    load();
    return () => {
      current = false;
      clearTimeout(timer);
      controller.abort();
    };
  }, [year, attempt]);
  const end =
    status === "ready" ? new Date().toISOString().slice(0, 10) : saved.date;
  const days = (data?.contributions || []).filter((d) => d.date <= end);
  const total = days.reduce((n, d) => n + d.count, 0);
  return (
    <section aria-labelledby="contributions">
      <div className="section-head">
        <h2 id="contributions">Contributions</h2>
        <a className="text-link" href={profile.github}>
          GitHub <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="calendar">
        <CalendarGrid
          year={year}
          days={days}
          colors={colors}
          unit="contributions"
          label={
            data
              ? total + " GitHub contributions in " + year
              : "GitHub activity unavailable"
          }
        />
        <div className="calendar-foot">
          <span>
            {data ? (
              <>
                <b>{total}</b> contributions in {year}
              </>
            ) : status === "loading" ? (
              "Loading activity…"
            ) : (
              "Activity unavailable"
            )}
          </span>
          <span className="legend">
            Less{" "}
            {colors.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}{" "}
            More
          </span>
        </div>
        <small role="status">
          {status === "loading" ? (
            "Updating activity…"
          ) : status === "error" ? (
            <>
              {data
                ? "Saved activity · " + saved.date
                : "Couldn’t load GitHub activity."}{" "}
              <button onClick={() => setAttempt((n) => n + 1)}>Retry</button>
            </>
          ) : null}
        </small>
      </div>
    </section>
  );
}
