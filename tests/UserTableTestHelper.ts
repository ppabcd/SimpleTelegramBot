import {pool} from '../src/Infrastructures/database/mariadb/pool'

const UserTableTestHelper = {
    async cleanTable() {
        const connection = await pool.getConnection()
        await connection.query('DELETE FROM users WHERE 1=1')
    },
    async addUser({
        _id = 'user-123',
        id = BigInt(111111),
        firstName = 'test',
        lastName = 'test',
        username = 'test',
        createdAt = new Date(),
        updatedAt = new Date()
    }) {
        const connection = await pool.getConnection()
        await connection.query('INSERT INTO users (_id, id, firstName, lastName, username, createdAt, updatedAt) VALUES (?, ?, ?, ?,?,?, ?)', [_id, id, firstName, lastName, username, createdAt, updatedAt])
    }
}
export default UserTableTestHelper
