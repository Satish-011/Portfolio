"""Refresh the public LeetCode snapshot used by the static portfolio."""
import json
from datetime import datetime, timezone
from pathlib import Path
from subprocess import check_output

username = "gangmonk"
today = datetime.now(timezone.utc).date()
query = "query($username:String!,$year:Int!){matchedUser(username:$username){username userCalendar(year:$year){submissionCalendar} submitStatsGlobal{acSubmissionNum{difficulty count}}}userContestRanking(username:$username){attendedContestsCount rating}}"
variables = json.dumps({"username": username, "year": today.year}, separators=(",", ":"))
response = check_output(["curl", "-fsSG", "--max-time", "25", "https://leetcode.com/graphql/",
                         "--data-urlencode", "query=" + query, "--data-urlencode", "variables=" + variables])
result = json.loads(response)
user = result["data"]["matchedUser"]
if user["username"].lower() != username.lower():
    raise ValueError("Unexpected LeetCode username")
calendar = json.loads(user["userCalendar"]["submissionCalendar"])
days = {}
for timestamp, count in calendar.items():
    day = datetime.fromtimestamp(int(timestamp), timezone.utc).date()
    if day.year == today.year and day <= today:
        days[day.isoformat()] = int(count)
stats = {s["difficulty"]: s["count"] for s in user["submitStatsGlobal"]["acSubmissionNum"]}
data = {"username": username, "asOf": today.isoformat(), "days": days,
        "solved": stats, "contests": result["data"]["userContestRanking"]}
path = Path(__file__).resolve().parents[1] / "src/data/leetcode.json"
tmp = path.with_suffix(".tmp")
tmp.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
tmp.replace(path)
