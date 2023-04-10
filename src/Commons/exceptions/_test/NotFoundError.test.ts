import NotFoundError from '../NotFoundError'

describe('NotFound', () => {
    it('should have the correct name and message', () => {
        const message = 'test'
        const error = new NotFoundError(message)
        expect(error.name).toEqual('NotFoundError')
        expect(error.message).toEqual(message)
        expect(error.statusCode).toEqual(404)
    })
})

