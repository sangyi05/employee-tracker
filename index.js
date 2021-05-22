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