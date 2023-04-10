import {User, UserInterface} from './entities/User'

interface UserRepositoryInterface {
    createUser(createUser: User): Promise<void>;

    updateUser(updateUser: User): Promise<void>;

    getUserById(userId: bigint): Promise<UserInterface>;

    getUserByUsername(username: string): Promise<UserInterface>;
}

class UserRepository implements UserRepositoryInterface {
    async createUser(createUser: User): Promise<void> {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async updateUser(updateUser: User): Promise<void> {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async getUserById(userId: bigint): Promise<UserInterface> {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async getUserByUsername(username: string): Promise<UserInterface> {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }
}

export default UserRepository
