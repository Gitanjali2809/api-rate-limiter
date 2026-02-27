const { Redis } = require('@upstash/redis');
const User = require('../models/User');

// Initialize Redis using the .env variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimiter = async (req, res, next) => {
  try {
    //Get API key from headers
    const apiKey = req.header('x-api-key');
    if (!apiKey) return res.status(401).json({ msg: "API Key is required" });


    // temporary
    console.log("Received API key:", apiKey);
    //temporary
    const allUsers = await User.find({});
    console.log("All users in DB:", allUsers);

    //Validate the key against MongoDB
    const user = await User.findOne({ apiKey });
    // temporary
    console.log("User found:", user);
    if (!user) return res.status(403).json({ msg: "Invalid API Key" });


    //Rate Limiting Logic (10 requests per minute)
    const key = `rate_limit:${apiKey}`;
    const requests = await redis.incr(key); // Increment the count for this key

    if (requests === 1) {
      await redis.expire(key, 60); // Set time-to-live to 60 seconds on first request
    }

    if (requests > 10) {
      return res.status(429).json({
        error: "Rate limit exceeded. Try again in a minute.",
        limit: 10,
        remaining: 0
      });
    }

    //success: Pass request to the final endpoint
    req.user = user; // Attach user info for tracking
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Rate Limiter Error");
  }
};

module.exports = rateLimiter;