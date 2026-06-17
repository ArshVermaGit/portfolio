const submissionCalendar = '{"1768608000": 7, "1768694400": 6, "1781568000": 4}';
const parsed = JSON.parse(submissionCalendar);
const daysMap = new Map();
for (const [timestamp, count] of Object.entries(parsed)) {
  const date = new Date(parseInt(timestamp) * 1000);
  const dateString = date.toISOString().split('T')[0];
  daysMap.set(dateString, count);
}
console.log(daysMap);

const today = new Date('2026-06-17T04:44:49+05:30');
for (let i = 2; i >= 0; i--) {
  const d = new Date(today);
  d.setDate(today.getDate() - i);
  const dateString = d.toISOString().split('T')[0];
  console.log('generated', dateString, daysMap.get(dateString));
}
