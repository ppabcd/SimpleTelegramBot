import UserRepository from '../UserRepository'

describe('UserRepositoryTest', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const userRepository = new UserRepository()

        // Action and Assert
        await expect(userRepository.createUser({
            id: BigInt(1111),
            firstName: 'test',
            createdAt: new Date(),
            updatedAt: new Date()
        })).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(userRepository.updateUser({
            _id: 'user-123',
            id: BigInt(1111),
            firstName: 'test',
            createdAt: new Date(),
            updatedAt: new Date(),
        })).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(userRepository.getUserById(BigInt(1111))).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(userRepository.getUserByUsername('test')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })
})
