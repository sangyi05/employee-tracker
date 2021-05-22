const inquirer = require("inquirer");
const connection = require("./config/connection.js");
require("console.table");

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected");
});

const openingPrompts = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "task",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee's role",
                    "Finished",
                ],
            },
        ])
        .then((openingAnswer) => {
            if (openingAnswer.task === "View all departments") {
                viewDepartments();
            } else if (openingAnswer.task === "View all roles") {
                viewRoles();
            } else if (openingAnswer.task === "View all employees") {
                viewEmployees();
            } else if (openingAnswer.task === "Add a department") {
                addDepartment();
            } else if (openingAnswer.task === "Add a role") {
                addRole();
            } else if (openingAnswer.task === "Add an employee") {
                addEmployee();
            } else if (openingAnswer.task === "Update an employee's role") {
                updateEmployee();
            } else if (openingAnswer.task === "Finished!") {
                connection.end();
            }
        });
};

const viewDepartments = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        console.log("\n");
        console.table(res);
    });
    openingPrompts();
};

const viewRoles = () => {
    connection.query(
        "SELECT role.title, role.id AS role_id,role.salary, department.name AS department FROM role JOIN department ON (role.department_id = department.id)",
        (err, res) => {
            console.log("\n");
            console.table(res);
        }
    );
    openingPrompts();
};

const viewEmployees = () => {
    connection.query(
        "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e.last_name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS e ON employee.manager_id = e.id",
        (err, res) => {
            console.log("\n");
            console.table(res);
        }
    );
    openingPrompts();
};

const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?",
            },
        ])
        .then((anser) => {
            connection.query(
                "INSERT INTO department set ?",
                { name: answer.name },
                (err, res) => {
                    console.log("Done!");
                    openingPrompts()
                }
            )
        })
};

const addRole = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the name of the role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "How much is the salary for this role?"
                },
                {
                    type: "list",
                    choices: res, 
                    name: "department",
                    message: "What department does this role belong in?"
                }
            ])
            .then((answers) => {
                const match = res.find((department) => {
                    return department.name ===answer.department;
                });
                connection.query(
                    "INSERT INTO role set ?",
                    {
                        title: answer.name,
                        salary: answer.salary,
                        department_id: match.id
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log(res)
                        console.log("Done!");
                        openingPrompts()
                    }
                )
            })
    })
}