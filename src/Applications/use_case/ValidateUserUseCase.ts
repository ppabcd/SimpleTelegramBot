import {User} from '../../Domains/users/entities/User'

class ValidateUserUseCase {
    async execute(payload: User) {
        if (!payload.gender) {
            throw new Error('VALIDATE_USER.GENDER_NOT_AVAILABLE')
        }
        if (!payload.age) {
            throw new Error('VALIDATE_USER.AGE_NOT_AVAILABLE')
        }
    }
}

export default ValidateUserUseCase
