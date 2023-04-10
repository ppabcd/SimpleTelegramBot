import {createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts} from 'redis'

class CacheService {
    private _client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>;

    constructor() {
        this._client = createClient({
            socket: {
                host: process.env.REDIS_SERVER,
            },
        })
        this._client.on('error', error => {
            console.error(error)
        })
        this._client.connect()
    }

    async set(key: string, value: string, expirationInSecond = 1800): Promise<void> {
        await this._client.set(key, value, {
            EX: expirationInSecond,
        })
    }

    async get(key: string): Promise<string | null> {
        const result = await this._client.get(key)
        if (result === null) throw new Error('Cache not found')

        return result
    }

    async countByKeyPattern(keyPattern: string): Promise<number> {
        const keys = await this._client.keys(keyPattern)
        return keys.length
    }

    async delete(key: string): Promise<number> {
        return this._client.del(key)
    }
}

export default CacheService
