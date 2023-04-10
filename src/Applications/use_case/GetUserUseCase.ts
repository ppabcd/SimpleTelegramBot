import UserRepository from '../../Domains/users/UserRepository'
import InvariantError from '../../Commons/exceptions/InvariantError'
import DiffUtils from '../../Commons/utils/DiffUtils'
import {User, UserInterface} from '../../Domains/users/entities/User'

class GetUserUseCase {
    private _userRepository: UserRepository;

    constructor({userRepository}) {
        this._userRepository = userRepository
    }

    /**
     * Todo: Validate after getting user from database
     * The things that need to be validated:
     * 1. Language
     * 2. Gender
     * 3. Interest
     * @param payload
     */
    async execute(payload: User): Promise<UserInterface> {
        try {
            const user = await this._userRepository.getUserById(payload.id)
            if (!DiffUtils.areEqual(user, payload)) {
                await this._userRepository.updateUser(payload)
                return await this._userRepository.getUserById(payload.id)
            }
            return user
        } catch (error) {
            if (error instanceof InvariantError && error.message === 'User not available') {
                const newUser: UserInterface = {
                    id: payload.id,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    username: payload.username,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                await this._userRepository.createUser(newUser)
                return await this._userRepository.getUserById(payload.id)
            }
            throw error
        }
    }
}

export default GetUserUseCase
