'use strict'

let dbm
let type
let seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate
    type = dbm.dataType
    seed = seedLink
}

exports.up = function (db) {
    return db.createTable('users', {
        _id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        id: {
            type: 'bigint',
            notNull: true,
            unique: true,
        },
        firstName: {
            type: 'string',
            notNull: true,
        },
        lastName: {
            type: 'string',
            notNull: false,
        },
        username: {
            type: 'string',
            notNull: true,
        },
        gender: {
            type: 'string',
            notNull: false,
        },
        age: {
            type: 'int',
            notNull: false,
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            defaultValue: 'CURRENT_TIMESTAMP'
        },
        updatedAt: {
            type: 'timestamp',
            notNull: true,
            defaultValue: 'CURRENT_TIMESTAMP'
        }
    })
}

exports.down = function (db) {
    return db.dropTable('users')
}

exports._meta = {
    'version': 1
}
