export default function CalendarGrid({ year, days, colors, label, unit }) {
  const offset = new Date(Date.UTC(year, 0, 1)).getUTCDay();
  const weekCount = Math.ceil(
    (offset + (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 86400000) / 7,
  );
  const months = Array.from(
    { length: 12 },
    (_, m) => new Date(Date.UTC(year, m, 1)),
  );
  return (
    <>
      <div className="months">
        {months.map((d) => (
          <span
            key={d.toISOString()}
            style={{
              left:
                (Math.floor(
                  (offset + (d - Date.UTC(year, 0, 1)) / 86400000) / 7,
                ) /
                  weekCount) *
                  100 +
                "%",
            }}
          >
            {d.toLocaleString("en", { month: "short", timeZone: "UTC" })}
          </span>
        ))}
      </div>
      <div
        className="heatmap"
        role="img"
        aria-label={label}
        style={{ gridTemplateColumns: "repeat(" + weekCount + ",1fr)" }}
      >
        {Array.from({ length: offset }, (_, i) => (
          <i key={"pad" + i} />
        ))}
        {days.map((d) => (
          <i
            key={d.date}
            style={{ background: colors[d.level] }}
            title={d.date + " · " + d.count + " " + unit}
          />
        ))}
      </div>
    </>
  );
}
