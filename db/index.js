const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`
        )
    }

    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT * FROM department;`
        )
    }
    findAllRoles() {
        return this.connection.promise().query(
            `SELECT * FROM role;`
        )
    }
    addEmployee() {
        return this.connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`
        )
    }
    addDepartment() {
        return this.connection.promise().query(
            `INSERT INTO department (name) VALUES (?);`
        )
    }
    addRole() {
        return this.connection.promise().query(
            `INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?);`
        )
    }
}
module.exports = new DB(connection)