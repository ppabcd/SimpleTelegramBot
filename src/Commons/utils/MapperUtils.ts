import {UserInterface} from '../../Domains/users/entities/User'
import {User} from 'grammy/out/types'

export const mapTelegramToUserModel = (telegramUser: User, additionalPayload?: object): UserInterface => {
    const telegramPayload = {
        id: BigInt(telegramUser.id),
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        username: telegramUser.username,
    }
    return {
        ...telegramPayload,
        ...additionalPayload
    }
}
