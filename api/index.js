import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const GITHUB_USERNAME = 'ArshVermaGit';

const GITHUB_GRAPHQL_QUERY = `
  query($userName:String!) {
    user(login: $userName){
      avatarUrl
      name
      login
      bio
      location
      createdAt
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
        totalCount
        nodes {
          name
          stargazerCount
          forkCount
          description
          url
          primaryLanguage {
            name
            color
          }
        }
      }
      pinnedItems(first: 2, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            stargazerCount
            forkCount
            description
            url
            primaryLanguage {
              name
              color
            }
          }
        }
      }
      pullRequests(first: 5, states: MERGED, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          title
          url
          createdAt
          state
        }
      }
      issues(first: 5, states: CLOSED, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          title
          url
          createdAt
          state
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
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

function calculateStreaks(weeks) {
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  
  const days = weeks.flatMap(week => week.contributionDays);
  
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (day.contributionCount > 0) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (day.date > today) continue; 
    
    if (day.contributionCount > 0) {
      currentStreak++;
    } else if (day.date < today) {
      break;
    }
  }

  return { currentStreak, maxStreak };
}

app.get('/api/github', async (req, res) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GitHub token is missing in .env' });
    }

    const response = await axios.post(
      'https://api.github.com/graphql',
      {
        query: GITHUB_GRAPHQL_QUERY,
        variables: { userName: GITHUB_USERNAME }
      },
      {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.data.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      return res.status(500).json({ error: 'GitHub API error', details: response.data.errors });
    }

    const user = response.data.data.user;
    const { currentStreak, maxStreak } = calculateStreaks(user.contributionsCollection.contributionCalendar.weeks);

    // Calculate aggregated stats from first 100 repositories
    let totalStars = 0;
    let totalForks = 0;
    const languageCounts = {};

    user.repositories.nodes.forEach(repo => {
      totalStars += repo.stargazerCount;
      totalForks += repo.forkCount;
      
      if (repo.primaryLanguage) {
        const langName = repo.primaryLanguage.name;
        if (!languageCounts[langName]) {
          languageCounts[langName] = { 
            name: langName, 
            color: repo.primaryLanguage.color, 
            count: 0 
          };
        }
        languageCounts[langName].count += 1;
      }
    });

    // Sort languages by count
    const topLanguages = Object.values(languageCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5 languages

    let displayRepos = user.pinnedItems.nodes;
    if (displayRepos.length === 0) {
      displayRepos = user.repositories.nodes.slice(0, 2);
    }

    res.json({
      profile: {
        avatarUrl: user.avatarUrl,
        name: user.name,
        login: user.login,
        bio: user.bio,
        location: user.location,
        createdAt: user.createdAt,
        followers: user.followers.totalCount,
        following: user.following.totalCount
      },
      stats: {
        totalRepos: user.repositories.totalCount,
        totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
        currentStreak,
        maxStreak,
        totalStars,
        totalForks
      },
      topLanguages,
      calendar: user.contributionsCollection.contributionCalendar.weeks,
      repos: displayRepos,
      recentPRs: user.pullRequests.nodes,
      recentIssues: user.issues.nodes
    });
    
  } catch (error) {
    console.error('Error fetching GitHub data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
});

const LEETCODE_USERNAME = 'arsh-leetcode';

const LEETCODE_GRAPHQL_QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      profile {
        reputation
        ranking
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      submissionCalendar
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
    recentSubmissionList(username: $username, limit: 10) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
  }
`;

app.get('/api/leetcode', async (req, res) => {
  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      {
        query: LEETCODE_GRAPHQL_QUERY,
        variables: { username: LEETCODE_USERNAME }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    );

    if (response.data.errors) {
      console.error('LeetCode GraphQL Errors:', response.data.errors);
      return res.status(500).json({ error: 'LeetCode API error', details: response.data.errors });
    }

    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching LeetCode data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch LeetCode data' });
  }
});

const YOUTUBE_CHANNEL_ID = 'UCfoFOfJ6RuGqfnjCZANwJGQ';

app.get('/api/youtube', async (req, res) => {
  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
    const response = await axios.get(rssUrl);

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    
    const parsed = parser.parse(response.data);
    const feed = parsed.feed;

    if (!feed || !feed.entry) {
      return res.status(500).json({ error: 'YouTube API error', details: 'No entries found' });
    }

    // Ensure entry is an array
    const entries = Array.isArray(feed.entry) ? feed.entry : [feed.entry];

    const items = entries.map(entry => {
      const mediaGroup = entry['media:group'] || {};
      const thumbnail = mediaGroup['media:thumbnail'] ? mediaGroup['media:thumbnail']['@_url'] : '';
      const description = mediaGroup['media:description'] || '';

      return {
        title: entry.title,
        pubDate: entry.published,
        link: entry.link ? entry.link['@_href'] : '',
        guid: entry.id,
        author: entry.author ? entry.author.name : '',
        thumbnail: thumbnail,
        description: description
      };
    });

    res.json({
      status: 'ok',
      feed: {
        title: feed.title,
        author: feed.author ? feed.author.name : ''
      },
      items: items
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
