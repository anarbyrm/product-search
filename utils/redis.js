const redis = require('redis');
const dotenv = require('dotenv')

dotenv.config()

const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.connect();

module.exports = {
    redisClient
};
