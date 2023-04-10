import InvariantKeyboardError from './InvariantKeyboardError'
import KeyboardUtils from '../utils/KeyboardUtils'

const DomainErrorTranslator = {
    _directories: {},
    translate(error) {
        return DomainErrorTranslator._directories[error.message] || error
    }
}
DomainErrorTranslator._directories = {
    'VALIDATE_USER.GENDER_NOT_AVAILABLE': new InvariantKeyboardError('Mohon pilih jenis kelamin anda terlebih dahulu', KeyboardUtils.genderKeyboard()),
    'VALIDATE_USER.AGE_NOT_AVAILABLE': new InvariantKeyboardError('Mohon pilih usia terlebih dahulu', KeyboardUtils.ageKeyboard()),
}

export default DomainErrorTranslator
