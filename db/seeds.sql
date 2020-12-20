INSERT INTO departments
(name)
VALUES
('Human Resources'),
('Management'),
('Sales'),
('Accounting');

INSERT INTO role
(title, salary, department_id)
VALUES
('HR Associate', 50000, 1),
('HR Manager', 60000, 2),
('Sales Associate', 50000, 3),
('Sales Manager', 60000, 2),
('Accounting Associate', 50000, 4),
('Accounting Manager', 60000, 2);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Larry', 'Smith', 4, NULL),
('James', 'Thompson', 2, 2),
('Amber', 'Parks', 1, 2);

