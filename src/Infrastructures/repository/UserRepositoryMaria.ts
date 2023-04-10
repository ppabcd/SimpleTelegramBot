import UserRepository from '../../Domains/users/UserRepository'
import {Pool, PoolConnection} from 'mariadb'
import {UserInterface} from '../../Domains/users/entities/User'
import InvariantError from '../../Commons/exceptions/InvariantError'
import CacheService from '../database/redis/CacheService'
import superjson from 'superjson'


class UserRepositoryMaria extends UserRepository {
    private readonly _pool: Pool;
    private readonly _cacheService: CacheService;
    private readonly _idGenerator: (number?: number) => string;

    constructor(pool: Pool, cacheService: CacheService, idGenerator: () => string) {
        super()
        this._pool = pool
        this._cacheService = cacheService
        this._idGenerator = idGenerator
    }

    async createUser(createUser: UserInterface): Promise<void> {
        const connection = await this._pool.getConnection()
        const _id = `user-${this._idGenerator(16)}`
        const filteredFields = Object.keys(createUser).filter((key) => createUser[key] !== undefined)
        const values = filteredFields.map((key) => createUser[key])

        await connection.query(
            `INSERT INTO users (${filteredFields.join(', ')}, _id)
             VALUES (${Array(filteredFields.length).fill('?').join(', ')}, ?)`,
            [...values, _id]
        )
        await this._cacheService.delete(`user:${_id}`)
        await connection.release()
    }

    async getUserById(userId: bigint): Promise<UserInterface> {
        try {
            const user = await this._cacheService.get(`user:${userId}`)
            return superjson.parse(user)
        } catch (error) {
            const connection = await this._pool.getConnection()
            const result = await connection.query('SELECT * FROM users WHERE id = ?', [userId])
            if (result.length === 0) {
                throw new InvariantError('User not available')
            }
            await this._cacheService.set(`user:${userId}`, superjson.stringify(result[0]))
            await connection?.release()
            return result[0]
        }
    }

    async getUserByUsername(username: string): Promise<UserInterface> {
        let connection: PoolConnection | null
        try {
            connection = await this._pool.getConnection()
            const result = await connection.query('SELECT * FROM users WHERE username = ?', [username])
            if (result.length === 0) {
                throw new InvariantError('User not available')
            }
            return result[0]
        } finally {
            await connection?.release()
        }
    }

    async updateUser(updateUser: UserInterface): Promise<void> {
        let connection: PoolConnection | null
        try {
            connection = await this._pool.getConnection()
            const {id, ...fields} = updateUser
            const filteredFields = Object.keys(fields).filter((key) => fields[key] !== undefined)
            const query = `UPDATE users
                           SET ${filteredFields.map((key) => `${key} = ?`).join(', ')}
                           WHERE id = ?`
            const values = filteredFields.map((key) => fields[key])
            values.push(id.toString())
            await connection.query(query, values)
            await this._cacheService.delete(`user:${id}`)
        } finally {
            await connection?.release()
        }
    }
}

export default UserRepositoryMaria
