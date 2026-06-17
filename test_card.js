const calendar = '{"1768608000": 7, "1768694400": 6, "1781568000": 4}';
const parsed = JSON.parse(calendar);
const daysMap = new Map();
for (const [timestamp, count] of Object.entries(parsed)) {
  const date = new Date(parseInt(timestamp) * 1000);
  const dateString = date.toISOString().split('T')[0];
  daysMap.set(dateString, count);
}

const today = new Date('2026-06-17T04:44:49+05:30');
const last15Days = [];
let totalSubmissions = 0;
for (const count of daysMap.values()) totalSubmissions += count;

for (let i = 14; i >= 0; i--) {
  const d = new Date(today);
  d.setDate(today.getDate() - i);
  const dateString = d.toISOString().split('T')[0];
  last15Days.push(daysMap.get(dateString) || 0);
}
console.log(last15Days, totalSubmissions);
