const logo = require('asciiart-logo')
const colors = require('colors')
const { prompt } = require('inquirer')
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

async function loadMainPrompts() {
    console.log('Welcome to the Employee Tracker\n'.green)

    await prompt(
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
            ],

        },

    ).then(res => {
        let userChoice = res.choice

        switch (userChoice) {
            case 'VIEW_ALL_EMPLOYEES':
                viewAllEmployees()
                break;
            case 'VIEW_ALL_DEPARTMENTS':
                viewAllDepartments()
                break;
            case 'VIEW_ALL_ROLES':
                viewAllRoles()
                break;
            case 'ADD_EMPLOYEE':
                addEmployee()
                break;
            case 'ADD_DEPARTMENT':
                addDepartment()
                break;
            case 'ADD_ROLE':
                addRole()
                break;
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
    db.findAllRoles()
        .then(([rows]) => {
            let employees = rows
            console.log('\n');
            console.table(employees)
        })
        .then(() => loadMainPrompts())
}

async function addEmployee() {
    const employee = await prompt([
        
        {
            name: "firstName",
            message: "Please enter a first name."
        },
        {
            name: "lastName",
            message: "Please enter a last name."
        }

    ]);
    let roleChoices = null;
    await db.findAllRoles()
    .then(([rows]) => {
        roleChoices = rows.map(({ id, title }) => ({
            name: title,
            value: id
        }));
    });
    const { roleId } = await prompt(
        {
            type: "list",
            name: "roleId",
            message: "What is the employees role?",
            choices: roleChoices
        }
    )
    employee.role_id = roleId;
    let managerChoices = null;
    await db.findAllEmployees()
    .then(([rows]) => {
        managerChoices = rows.map(({ first_name, last_name, id}) => ({
            name: first_name + " "+ last_name,
            value: id
        }));
    });
    const { managerId } = await prompt(
        {
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices
        }
    );
    employee.manager_id = managerId;
    await db.addEmployee(employee);
    loadMainPrompts();
}

function addDepartment() {
    prompt([
        {
            name: "name",
            message: "What is the name of the department?"
        }

    ])
        .then(res => {
            let name = res;
            db.addDepartment(name)
                .then(() => console.log(`Added ${name.name} to database`))
                .then(() => loadMainPrompts())
        })
}

function addRole() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "Please enter the name of the new role."
                },
                {
                    name: "salary",
                    message: "Please enter a salary for the role."
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                },
            ])
                .then(role => {
                    let singleRole = role;
                    console.log(singleRole);
                    db.addRole(singleRole)
                        .then(() => console.log(`Added ${role.title} to database`))
                        .then(() => loadMainPrompts())
                })
        })

}

const quit = () => {
    console.log('Goodbye!'.green)
    process.exit()
}

init()