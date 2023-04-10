import {PoolConfig} from 'mariadb'

const mariadb = require('mariadb')

const testConfig: PoolConfig = {
    host: process.env.DB_HOST_TEST,
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TEST,
}

const dbConfig: PoolConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
}

export const pool = process.env.NODE_ENV === 'test' ? mariadb.createPool(testConfig) : mariadb.createPool(dbConfig)
