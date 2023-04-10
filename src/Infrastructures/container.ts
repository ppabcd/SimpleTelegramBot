import {createContainer} from 'instances-container'
import UserRepository from '../Domains/users/UserRepository'
import UserRepositoryMaria from './repository/UserRepositoryMaria'
import {pool} from './database/mariadb/pool'
import GetUserUseCase from '../Applications/use_case/GetUserUseCase'
import CacheService from './database/redis/CacheService'
import {nanoid} from 'nanoid'
import ValidateUserUseCase from '../Applications/use_case/ValidateUserUseCase'
import ConversationUtils from '../Commons/utils/ConversationUtils'

const container = createContainer()


// registering services and repository
container.register([
    {
        key: UserRepository.name,
        Class: UserRepositoryMaria,
        parameter: {
            dependencies: [
                {
                    concrete: pool
                }, {
                    name: 'cacheService',
                    internal: CacheService.name
                }, {
                    concrete: nanoid
                }
            ]
        }
    },
    {
        key: CacheService.name,
        Class: CacheService
    }
])

// registering use cases
container.register([
    {
        key: GetUserUseCase.name,
        Class: GetUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'userRepository',
                    internal: UserRepository.name
                }
            ]
        }
    },
    {
        key: ValidateUserUseCase.name,
        Class: ValidateUserUseCase,
    },
    {
        key: ConversationUtils.name,
        Class: ConversationUtils,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                {
                    name: 'getUserUseCase',
                    internal: GetUserUseCase.name
                }, {
                    name: 'validateUserUseCase',
                    internal: ValidateUserUseCase.name
                }
            ]
        }
    }
])

export default container
