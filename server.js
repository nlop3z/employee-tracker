const logo = require('asciiart-logo')
const colors = require('colors')
const inquirer = require('inquirer')
require('console.table')
const db = require('./db')
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
                    name: 'View All Departments',
                    value: 'VIEW_ALL_DEPARTMENTS'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ALL_ROLES'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a Role',
                    value: 'ADD_ROLE'
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
                //console.log("test")
                viewAllEmployees()
                break
            case 'VIEW_ALL_DEPARTMENTS':
                viewAllDepartments()
                break
            case 'VIEW_ALL_ROLES':
                viewAllRoles()
                break
            case 'ADD_EMPLOYEE':
                addEmployee()
                break
            case 'ADD_DEPARTMENT':
                addDepartment()
                break
            case 'ADD_ROLE':
                addRole()
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

const viewAllDepartments = () => {
    db.findAllDepartments()
    .then(([rows]) => {
        let employees = rows
        console.log('\n');
        console.table(employees)
    })
    .then(() => loadMainPrompts())
}

const viewAllRoles = () => {
    console.log("viewAllRoles");
    db.findAllRoles()
    .then(([rows]) => {
        let employees = rows
        console.log('\n');
        console.table(employees)
    })
    .then(() => loadMainPrompts())
}

const addEmployee = () => {
    db.addEmployee()
    //.then
    .then(() => loadMainPrompts())
}

const addDepartment = () => {
    db.addDepartment()
    //.then
    .then(() => loadMainPrompts())
}

const addRole = () => {
    db.addRole()
    //.then
    .then(() => loadMainPrompts())
}

const quit = () => {
    console.log('Goodbye!'.green)
    process.exit()
}

init()