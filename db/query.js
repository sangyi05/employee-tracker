const connection = require('./database')

function getDepartments() {
    return connection.promise().query("SELECT * FROM departments")
  };
  
  function getRoles() {
    return connection.promise().query("SELECT * FROM roles")
  };
  
  function getEmployees () {
    return connection.promise().query("SELECT * FROM employees")
  };

module.exports = { 
    getDepartments,
    getRoles,
    getEmployees
  }