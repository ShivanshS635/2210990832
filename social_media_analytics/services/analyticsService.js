const { getUsers, getUserPosts, getPostComments } = require('./apiClient');

exports.getTopUsers = async (req, res) => {
  try {
    const users = await getUsers();
    const commentCounts = [];

    await Promise.all(Object.entries(users)?.map(async ([id, name]) => {
      const posts = await getUserPosts(id);
      let totalComments = 0;

      await Promise.all(posts.map(async (post) => {
        const comments = await getPostComments(post.id);
        totalComments += comments.length;
      }));

      commentCounts.push({ userId: id, name, totalComments });
    }));

    const topUsers = commentCounts
      .sort((a, b) => b.totalComments - a.totalComments)
      .slice(0, 5);

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopOrLatestPosts = async (req, res) => {
  const type = req.query.type;

  try {
    const users = await getUsers();
    let allPosts = [];

    await Promise.all(Object.keys(users).map(async (id) => {
      const posts = await getUserPosts(id);
      allPosts.push(...posts);
    }));

    if (type === 'latest') {
      allPosts.sort((a, b) => b.id - a.id);
      return res.json(allPosts.slice(0, 5));
    }

    if (type === 'popular') {
      const postsWithCommentCount = await Promise.all(allPosts.map(async (post) => {
        const comments = await getPostComments(post.id);
        return { ...post, commentCount: comments.length };
      }));

      const maxCount = Math.max(...postsWithCommentCount.map(p => p.commentCount));
      const popularPosts = postsWithCommentCount.filter(p => p.commentCount === maxCount);

      return res.json(popularPosts);
    }

    res.status(400).json({ error: "Invalid query param `type` (expected: 'latest' or 'popular')" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};