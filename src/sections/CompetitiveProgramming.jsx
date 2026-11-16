import { contestResults, platformRatings, practiceRecord } from "../data/achievements";
import { ArrowUpRight } from "lucide-react";
import CalendarGrid from "../components/CalendarGrid";
import snapshot from "../data/leetcode.json";

const colors = ["#e8e6dd", "#e8d69b", "#d8b661", "#b48c39", "#826023"];
const end = new Date(snapshot.asOf + "T00:00:00Z");
const year = end.getUTCFullYear();
const days = [];
for (let day = Date.UTC(year, 0, 1); day <= end.getTime(); day += 86400000) {
  const date = new Date(day).toISOString().slice(0, 10);
  const count = snapshot.days[date] || 0;
  days.push({
    date,
    count,
    level: [1, 3, 6, 10].filter((min) => count >= min).length,
  });
}
const total = days.reduce((sum, day) => sum + day.count, 0);
export default function CompetitiveProgramming() {
  return (
    <section id="practice" aria-labelledby="journey-title">
      <h2 id="journey-title">My competitive programming journey</h2>
      <p className="contact-copy">
        I practice in C++, from binary search on arrays to dynamic programming
        on grids. After a contest, I like to trace a tricky input by hand and
        figure out where my reasoning broke down.
      </p>
      <p className="contact-copy">
        Across Codeforces, CodeChef, and LeetCode, I’ve solved <strong>{practiceRecord.problems} DSA and algorithmic problems</strong> and competed in <strong>{practiceRecord.ratedContests} rated contests</strong>.
      </p>
      <h3 className="practice-heading">Contest highlights</h3>
      <dl className="contest-list">
        {contestResults.map(([event, result]) => <div key={event}><dt>{event}</dt><dd>{result}</dd></div>)}
      </dl>
      <h3 className="practice-heading">Peak ratings</h3>
      <div className="rating-list">
        {platformRatings.map(({name, url, handle, peak}) => (
          <a key={name} href={url} aria-label={name + " profile @" + handle + ", peak rating " + peak}>
            <span>{name} <ArrowUpRight size={13} /></span><strong>{peak}</strong><small>@{handle}</small>
          </a>
        ))}
      </div>
      <div className="calendar practice-calendar">
        <h3>LeetCode submissions · {year}</h3>
        <CalendarGrid
          year={year}
          days={days}
          colors={colors}
          unit="submissions"
          label={
            total +
            " LeetCode submissions over " +
            days.filter((d) => d.count > 0).length +
            " active days in " +
            year
          }
        />
        <div className="calendar-foot">
          <span>
            <b>{total}</b> submissions ·{" "}
            <b>{days.filter((d) => d.count > 0).length}</b> active days
          </span>
          <span className="legend">
            Less{" "}
            {colors.map((c) => (
              <i key={c} style={{ background: c }} />
            ))}{" "}
            More
          </span>
        </div>
        <p className="practice-summary">
          All-time LeetCode record · {snapshot.solved.All} problems solved
          {snapshot.contests &&
            " · " + snapshot.contests.attendedContestsCount + " contests"}
        </p>
        <small>
          Updated{" "}
          <time dateTime={snapshot.asOf}>
            {end.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </small>
      </div>
    </section>
  );
}
