import ClientError from './ClientError'
import {InlineKeyboard} from 'grammy'

class InvariantKeyboardError extends ClientError {
    keyboard: InlineKeyboard;

    constructor(message: string, keyboard: InlineKeyboard) {
        super(message)
        this.name = 'InvariantError'
        this.keyboard = keyboard
    }
}

export default InvariantKeyboardError
