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
        connection.query(
               `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`, [ loadMainPrompts.first_name, loadMainPrompts.last_name, integer.role_id, integer.manager_id ]
           )
    }
    addDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET (?)", department);
    }
    addRole() {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }
}
module.exports = new DB(connection)