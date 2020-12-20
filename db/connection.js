const mysql = require('mysql2')
const config = require('config')
const mysqlPassword = config.get('mysqlPassword')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 

})