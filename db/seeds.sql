INSERT INTO department(name)
VALUES
('Customer Service'),
('Tech'),
('Accounting'),
('Management'),
('Purchasing');

INSERT INTO role(title, salary, department_id)
VALUES
('Employee', 75000, 1),
('Supervisor', 75000, 1),
('Representative', 85000, 1), 
('Accountant', 100000, 3),
('Supervisory', 85000, 3),
('Engineer', 120000, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('Richard', 'Black', 1, 1),
('Carl', 'Smith', 2, 1),
('Tony', 'Sanchez', 3, 1),
('Sean', 'Garcia', 3, 1),
('Tanya', 'Jones', 4, NULL);
