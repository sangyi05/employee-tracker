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
}