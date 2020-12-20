const logo = require('asciiart-logo')
const colors = require('colors')
const { prompt } = require('inquirer')
require('console.table')
const db = require('./db')

const init = () => {
    //renders logo
    const logoText = logo({ name: 'Employee Tracker' }).render()

    console.log(logoText.green)

    loadMainPrompts()
}

const loadMainPrompts = () => {
    console.log('Welcome to the Employee Tracker\n'.purple)

    prompt([
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
    ]).then(res => {
        let userChoice = res.choice

        switch (userChoice) {
            case 'VIEW_ALL_EMPLOYEES':
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
    console.log('Goodbye!'.purple)
    process.exit()
}

init()