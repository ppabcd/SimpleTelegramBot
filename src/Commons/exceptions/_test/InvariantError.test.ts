import InvariantError from '../InvariantError'

describe('InvariantError', () => {
    it('should have the correct name and message', () => {
        const message = 'test'
        const error = new InvariantError(message)
        expect(error.name).toEqual('InvariantError')
        expect(error.message).toEqual(message)
        expect(error.statusCode).toEqual(400)
    })
})
