require('dotenv').config({path: __dirname + '/../.env'})

import {mapTelegramToUserModel} from './Commons/utils/MapperUtils'
import ConversationUtils from './Commons/utils/ConversationUtils'
import {BotContext} from './Commons/utils/BotUtils'
import {conversations, createConversation} from '@grammyjs/conversations'
import {UserGender} from './Domains/users/enums/UserGender'
import ClientError from './Commons/exceptions/ClientError'
import DomainErrorTranslator from './Commons/exceptions/DomainErrorTranslator'
import ValidateUserUseCase from './Applications/use_case/ValidateUserUseCase'
import {Bot, session} from 'grammy'
import GetUserUseCase from './Applications/use_case/GetUserUseCase'
import container from './Infrastructures/container'
import {UserInterface} from './Domains/users/entities/User'
import InvariantKeyboardError from './Commons/exceptions/InvariantKeyboardError'

// Create instances of use cases outside of the bot functions to avoid repetition
const getUserUseCase = container.getInstance(GetUserUseCase.name)
const validateUserUseCase = container.getInstance(ValidateUserUseCase.name)
const conversationUtils = container.getInstance(ConversationUtils.name)

const bot = new Bot<BotContext>(process.env.BOT_API)

bot.use(session({initial: () => ({})}))
bot.use(conversations())
bot.use(createConversation(conversationUtils.ageConversation.bind(conversationUtils), 'ageConversation'))

// Command and message middleware
bot.use(async (ctx, next) => {
    const payload = mapTelegramToUserModel(ctx.from)
    const res: UserInterface = await getUserUseCase.execute(payload)
    await validateUserUseCase.execute(res)
    return next()
})

bot.callbackQuery('age-selector', async (ctx) => {
    await ctx.conversation.enter('ageConversation')
})

bot.on('message', async (ctx) => {
    const payload = mapTelegramToUserModel(ctx.from)
    const res: UserInterface = await getUserUseCase.execute(payload)
    await validateUserUseCase.execute(res)
})

bot.callbackQuery(/^gender-(male|female)$/, async (ctx) => {
    const gender = ctx.match[1].toUpperCase() as UserGender
    const payload = mapTelegramToUserModel(ctx.from, {gender})
    const res: UserInterface = await getUserUseCase.execute(payload)
    const check = await validateUserUseCase.execute(res)
})


bot.catch(async (err) => {
    err.message = err.message.replace(/^Error in middleware:\s*/, '')
    const translatedError = DomainErrorTranslator.translate(err)
    if (translatedError instanceof InvariantKeyboardError) {
        await err.ctx.reply(translatedError.message, {
            reply_markup: translatedError.keyboard
        })
        return
    }
    if (translatedError instanceof ClientError) {
        await err.ctx.reply(translatedError.message)
        return
    }
    console.error(err)
    await err.ctx.reply('Maaf, terjadi kesalahan pada server kami.')
})


bot.start()
