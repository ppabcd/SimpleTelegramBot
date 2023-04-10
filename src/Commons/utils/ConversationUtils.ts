import {BotContext, MyConversation} from './BotUtils'
import GetUserUseCase from '../../Applications/use_case/GetUserUseCase'
import ValidateUserUseCase from '../../Applications/use_case/ValidateUserUseCase'
import {mapTelegramToUserModel} from './MapperUtils'

class ConversationUtils {
    private readonly _getUserUseCase: GetUserUseCase;
    private _validateUserUseCase: ValidateUserUseCase;

    constructor({getUserUseCase, validateUserUseCase}) {
        this._getUserUseCase = getUserUseCase
        this._validateUserUseCase = validateUserUseCase
    }

    async ageConversation(conversation: MyConversation, ctx: BotContext) {
        await ctx.reply('Please enter your age')

        const age: number = await conversation.form.number()
        const payload = mapTelegramToUserModel(ctx.from, {age})
        const res = await this._getUserUseCase.execute(payload)
        await this._validateUserUseCase.execute(res)
        await ctx.reply('You can continue now')
        return
    }
}

export default ConversationUtils
