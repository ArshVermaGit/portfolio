const axios = require('axios');
const LEETCODE_USERNAME = 'arsh-leetcode';
const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      badges {
        id
        name
        shortName
        displayName
        icon
        hoverText
        medal {
          slug
          config {
            iconGif
            iconGifBackground
          }
        }
        creationDate
        category
      }
      upcomingBadges {
        name
        icon
      }
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
