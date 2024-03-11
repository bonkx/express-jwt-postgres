/* eslint-disable import/no-extraneous-dependencies */
const redis = require('redis');

// const redisClient = redis.createClient({
//     host: 'redis',
//     // host: '127.0.0.1',
//     port: 6379,
// });

const setBlackListToken = async (key, data, dataExp) => {
    try {
        const redisClient = redis.createClient();
        console.log('key: ', key);
        console.log('data: ', data);
        await redisClient.connect();
        await redisClient.set(key, data);
        redisClient.expireAt(key, dataExp);
    } catch (err) {
        throw new Error(`Failed to write Redis: ${err.message}`);
    }
};

const getDataRedis = async (key) => {
    try {
        const redisClient = redis.createClient();
        console.log('key: ', key);
        await redisClient.connect();
        const data = await redisClient.get(key);
        console.log('data: ', data);
        return data;
    } catch (err) {
        throw new Error(`Failed to read Redis: ${err.message}`);
    }
};

module.exports = { setBlackListToken, getDataRedis };
