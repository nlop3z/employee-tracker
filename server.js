const logo = require('asciiart-logo')
const colors = require('colors')
const { prompt } = require('inquirer')
require('console.table')

const init = () => {
    //renders logo
    const logoText = logo({ name: 'Employee Tracker' }).render()

    console.log(logoText.green)

    loadMainPrompts()
}

const loadMainPrompts = () => {
    console.log('Welcome to the Employee Tracker'.purple)

    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View ALL Employees',
                    value: 'VIEW_ALL_EMPLOYEES'
                }
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
                default;
                quit()
        }
    })
}
const viewAllEmployees = () => {
    console.log('Goodbye!'.purple)
    process.exit()
}

init()