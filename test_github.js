import axios from 'axios';
const GITHUB_USERNAME = 'ArshVermaGit';
const GITHUB_GRAPHQL_QUERY = `
  query($userName:String!) {
    user(login: $userName){
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;
async function test() {
  try {
    const res = await axios.post('https://api.github.com/graphql', {
      query: GITHUB_GRAPHQL_QUERY,
      variables: { userName: GITHUB_USERNAME }
    }, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.GITHUB_TOKEN}`
      }
    });
    
    const weeks = res.data.data.user.contributionsCollection.contributionCalendar.weeks;
    let output = Array(7).fill('');
    weeks.forEach(week => {
      week.contributionDays.forEach((day, i) => {
        output[i] += (day.contributionCount > 0 ? '#' : '.');
      });
    });
    console.log(output.join('\n'));
  } catch (e) { console.error(e.response?.data || e.message); }
}
test();
