const todayStr = '2026-06-17';
const today = new Date(`${todayStr}T00:00:00Z`);

const startDate = new Date(today);
startDate.setUTCDate(today.getUTCDate() - (52 * 7 + today.getUTCDay()));

const calendar = [];
let currentWeek = { contributionDays: [] };

for (let d = new Date(startDate); d <= today; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateString = d.toISOString().split('T')[0];
    
    currentWeek.contributionDays.push({ date: dateString });
    
    if (currentWeek.contributionDays.length === 7) {
      calendar.push(currentWeek);
      currentWeek = { contributionDays: [] };
    }
}
if (currentWeek.contributionDays.length > 0) {
    calendar.push(currentWeek);
}

console.log('Total weeks:', calendar.length);
console.log('First week:', calendar[0].contributionDays.map(d => d.date));
console.log('Last week:', calendar[calendar.length-1].contributionDays.map(d => d.date));
