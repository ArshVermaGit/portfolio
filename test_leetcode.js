import axios from 'axios';
const LEETCODE_USERNAME = 'arsh-leetcode';
const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submissionCalendar
    }
  }
`;
async function test() {
  try {
    const res = await axios.post('https://leetcode.com/graphql', {
      query: LEETCODE_GRAPHQL_QUERY,
      variables: { username: LEETCODE_USERNAME }
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(res.data.data.matchedUser.submissionCalendar);
  } catch (e) { console.error(e.message); }
}
test();
