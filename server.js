const logo = require('asciiart-logo')
const colors = require('colors')
const inquirer = require('inquirer')
require('console.table')
//const db = require('./db')
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

const init = () => {
    //renders logo
    const logoText = logo({ name: 'Employee Tracker' }).render()

    console.log(logoText.green)

    loadMainPrompts()
}

async function loadMainPrompts () {
    console.log('Welcome to the Employee Tracker\n'.green)

    await inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_ALL_EMPLOYEES'
                },
                {
                    name: 'View All Employees By Department',
                    value: 'VIEW_ALL_EMPLOYEES_DEPARTMENT'
                },
                {
                    name: 'View All Employees By Manager',
                    value: 'VIEW_ALL_EMPLOYEES_MANAGER'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]

        }
    ).then(res => {
        let userChoice = res.choice

        switch (userChoice) {
            case 'VIEW_ALL_EMPLOYEES':
                console.log("test")
                viewAllEmployees()
                break
            default:
                quit()
        }
    })
}
const viewAllEmployees = () => {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows
        console.log('\n');
        console.table(employees)
    })
    .then(() => loadMainPrompts())
}
const quit = () => {
    console.log('Goodbye!'.green)
    process.exit()
}

init()