const mysql = require('mysql2')
const config = require('config')
const mysqlPassword = config.get('mysqlPassword')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: mysqlPassword,
    database: 'employees'

})

connection.connect((err) => {
    if (err) throw err
    console.log('database connected')
})

module.exports = connection