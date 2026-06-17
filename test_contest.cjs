const axios = require('axios');
const LEETCODE_USERNAME = 'arsh-leetcode';
const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
  }
`;
axios.post('https://leetcode.com/graphql', {
  query: LEETCODE_GRAPHQL_QUERY,
  variables: { username: LEETCODE_USERNAME }
}, {
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0'
  }
}).then(res => console.log(JSON.stringify(res.data, null, 2))).catch(e => console.error(e.message));
