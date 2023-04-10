import {Context} from 'grammy'
import {Conversation, ConversationFlavor} from '@grammyjs/conversations'

export type BotContext = Context & ConversationFlavor;
export type MyConversation = Conversation<BotContext>;

