const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT * from employee`
        )
    }
}
module.exports = new DB(connection)