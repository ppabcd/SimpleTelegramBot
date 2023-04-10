import {InlineKeyboard} from 'grammy'

class KeyboardUtils {
    static genderKeyboard() {
        return new InlineKeyboard()
            .text('👦', 'gender-male')
            .text('👧', 'gender-female')
    }

    static ageKeyboard() {
        return new InlineKeyboard()
            .text('Atur Usia', 'age-selector')
    }
}

export default KeyboardUtils
