import UserTableTestHelper from '../../../../tests/UserTableTestHelper'
import userTableTestHelper from '../../../../tests/UserTableTestHelper'
import {pool} from '../../database/mariadb/pool'
import UserRepositoryMaria from '../UserRepositoryMaria'
import CacheService from '../../database/redis/CacheService'
import {UserInterface} from '../../../Domains/users/entities/User'
import {nanoid} from 'nanoid'

const cacheService = new CacheService()

describe('UserRepositoryMaria', () => {
    afterEach(async () => {
        await UserTableTestHelper.cleanTable()
    })
    afterAll(() => {
        pool.end()
    })

    describe('getUserById function', () => {
        it('should return user object when user is exist', async () => {
            const userId = BigInt(11111)
            const fakeIdGenerator = () => '123' // stub!
            await UserTableTestHelper.addUser({id: userId})
            const userRepositoryMaria = new UserRepositoryMaria(pool, cacheService, fakeIdGenerator)

            const user = await userRepositoryMaria.getUserById(userId)
            expect(user.id).toEqual(userId)
        })
        it('should throw error when user is not exist', async () => {
            const userId = BigInt(11112)
            const userRepositoryMaria = new UserRepositoryMaria(pool, cacheService, nanoid)

            await expect(userRepositoryMaria.getUserById(userId)).rejects.toThrowError('User not available')
        })
    })
    describe('getUserByUsername function', () => {
        it('should return user object when user is exist', async () => {
            const username = 'test'
            const fakeIdGenerator = () => '123' // stub!
            await UserTableTestHelper.addUser({username})
            const userRepositoryMaria = new UserRepositoryMaria(pool, cacheService, fakeIdGenerator)

            const user = await userRepositoryMaria.getUserByUsername(username)
            expect(user.username).toEqual(username)
        })
        it('should throw error when user is not exist', async () => {
            const username = 'test'
            const fakeIdGenerator = () => '123' // stub!
            const userRepositoryMaria = new UserRepositoryMaria(pool, cacheService, fakeIdGenerator)

            await expect(userRepositoryMaria.getUserByUsername(username)).rejects.toThrowError('User not available')
        })
    })
    describe('updateUser function', () => {
        it('should update user', async () => {
            const userId = BigInt(11111)
            const fakeIdGenerator = () => '123' // stub!
            await userTableTestHelper.addUser({id: userId})
            const userRepositoryMaria = new UserRepositoryMaria(pool, cacheService, fakeIdGenerator)

            const user = await userRepositoryMaria.getUserById(userId)
            user.firstName = 'hello'
            user.lastName = 'world'

            await userRepositoryMaria.updateUser(user)

            const newUser = await userRepositoryMaria.getUserById(userId)
            expect(newUser.firstName).toEqual('hello')
            expect(newUser.lastName).toEqual('world')
        })
    })
    describe('createUser function', () => {
        it('should create user', async () => {
            const payload: UserInterface = {
                id: BigInt(11111),
                firstName: 'test',
                lastName: 'test',
                username: 'test',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const fakeIdGenerator = () => '123' // stub!
            const userRepositoryMaria = new UserRepositoryMaria(pool, cacheService, fakeIdGenerator)
            await userRepositoryMaria.createUser(payload)

            const user = await userRepositoryMaria.getUserById(payload.id)
            expect(user.id).toEqual(payload.id)
        })
    })
})
