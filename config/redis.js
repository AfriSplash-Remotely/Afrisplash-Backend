const dotenv = require('dotenv');
const redis = require('redis');

dotenv.config({ path: './env/config.env' });

const redisClient = redis.createClient({
  password: `${process.env.REDIS_PASS}`,
  socket: {
    host: `${process.env.REDIS_HOST}`,
    port: process.env.REDIS_PORT
  }
});

async function connectToRedis() {
  try {
    redisClient.on('error', (error) => {
      console.log('Redis client error', error);
    });

    redisClient.on('ready', () => console.log('Redis is ready...'));
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Redis connection error:', error);
    throw error;
  }
}
module.exports = connectToRedis;
