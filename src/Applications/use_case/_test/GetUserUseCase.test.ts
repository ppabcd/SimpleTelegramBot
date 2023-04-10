import UserRepository from '../../../Domains/users/UserRepository'
import GetUserUseCase from '../GetUserUseCase'
import InvariantError from '../../../Commons/exceptions/InvariantError'
import {UserInterface} from '../../../Domains/users/entities/User'

describe('GetUserUseCase', () => {
    let useCasePayload: UserInterface
    let mockUserRepository: UserRepository

    beforeEach(() => {
        useCasePayload = {
            _id: 'user-123',
            id: BigInt(11111),
            firstName: 'Dicoding',
            lastName: 'Indonesia',
            username: 'dicoding_indonesia',
            createdAt: new Date(),
        }
        mockUserRepository = new UserRepository()
    })

    it('should orchestrating the get user action and return data from db directly', async () => {
        mockUserRepository.getUserById = jest.fn().mockImplementation(() => Promise.resolve(useCasePayload))

        const getUserUseCase = new GetUserUseCase({
            userRepository: mockUserRepository,
        })

        const getUser = await getUserUseCase.execute(useCasePayload)

        expect(getUser).toStrictEqual(useCasePayload)

        expect(mockUserRepository.getUserById).toBeCalledWith(useCasePayload.id)
    })

    it('should orchestrating the get user action and update user data', async () => {
        const currentData: UserInterface = {
            _id: 'user-123',
            id: BigInt(11111),
            firstName: 'Test',
            lastName: 'Indonesia',
            username: 'dicoding_indonesia',
            createdAt: new Date(),
        }

        mockUserRepository.getUserById = jest
            .fn()
            .mockImplementationOnce(() => Promise.resolve(currentData))
            .mockImplementationOnce(() => Promise.resolve(useCasePayload))
        mockUserRepository.updateUser = jest.fn().mockImplementation(() => Promise.resolve())

        const getUserUseCase = new GetUserUseCase({
            userRepository: mockUserRepository,
        })

        const getUser = await getUserUseCase.execute(useCasePayload)

        expect(getUser).toStrictEqual(useCasePayload)

        expect(mockUserRepository.getUserById).toBeCalledWith(useCasePayload.id)
        expect(mockUserRepository.updateUser).toBeCalledWith(useCasePayload)
    })

    it('should orchestrating the get user action and create new user data', async () => {
        mockUserRepository.getUserById = jest
            .fn()
            .mockImplementationOnce(() => {
                throw new InvariantError('User not available')
            })
            .mockImplementationOnce(() => Promise.resolve(useCasePayload))
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve())
        mockUserRepository.updateUser = jest.fn().mockImplementation(() => Promise.resolve())

        const getUserUseCase = new GetUserUseCase({
            userRepository: mockUserRepository,
        })

        const getUser = await getUserUseCase.execute(useCasePayload)

        expect(getUser).toStrictEqual(useCasePayload)

        expect(mockUserRepository.getUserById).toBeCalledWith(useCasePayload.id)
    })
})
