const inquirer = require("inquirer");
const axios = require("axios");
const Table = require('cli-table3');

async function initializeApp() {
  await managerMenu();
  console.log("Thank you for using CLI_Employee-Manager.")
}

const managerMenu = async () => {
  let appIsRunning = true;
  while (appIsRunning === true) {
    await inquirer
      .prompt([
        {
          name: "task",
          type: "list",
          message: "What would you like to do?",
          choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'View All Departments',
            'Add Department',
            'Quit'
        ],
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please select an option.");
            }
          }
        }
      ])
      .then(async (data) => {
        const { task } = data;
        if(task == 'View All Employees'){
          await viewAllEmployees();
        } else if(task == 'Add Employee'){
          await addEmployee();
        } else if(task == 'Update Employee Role'){
          await viewAllEmployees();
        } else if(task == 'View All Roles'){
          await viewAllEmployees();
        } else if(task == 'View All Departments'){
          await viewAllEmployees();
        } else if(task == 'Add Department'){
          await viewAllEmployees();
        } else if(task == 'Quit'){
          appIsRunning = false;
        }
        console.log('appIsRunning? ', appIsRunning)
      });
    }
}

const viewAllEmployees = async () => {
  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/viewAll'
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    // console.log('response: ', response)
    // console.log('response.data.data: ', response.data.data)
    const headers = Object.keys(response.data.data[0])
    const table = new Table({
      head: headers
    });
    response.data.data.forEach(row => {
      // console.log('row', row)
      const rowValues = Object.keys(row).map((key) => row[key])
      table.push(rowValues);
    });
    console.log(table.toString())
  } catch (err) {
    console.error(err);
  }

}

const addEmployee = async () => {
  let department = await chooseDepartment()
  let role = await chooseRoles(department);
  let managerList = [];
  // console.log('addEmployee department: ', department);
  console.log('addEmployee role: ', role);


  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/viewAll'
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    // console.log('response: ', response)
    // console.log('response.data.data: ', response.data.data)
    const headers = Object.keys(response.data.data[0])
    const table = new Table({
      head: headers
    });
    response.data.data.forEach(row => {
      // console.log('row', row)
      const rowValues = Object.keys(row).map((key) => row[key])
      table.push(rowValues);
    });
    console.log(table.toString())
  } catch (err) {
    console.error(err);
  }



  await inquirer
  .prompt([
    {
      name: "firstName",
      type: "input",
      message: "First Name:",
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Employee's First Name.");
        }
      }
    },
    {
      name: "lastName",
      type: "input",
      message: "Last Name:",
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Employee's Last Name.");
        }
      }
    },
    {
      name: "managerName",
      type: "input",
      message: "Manager Name:",
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Manager Name?");
        }
      }
    },
    {
      name: "role",
      type: "input",
      message: "Role:",
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Employee's Role?");
        }
      }
    },
  ])
  .then(async (data) => {
    const { firstName, lastName, managerName, role } = data;
    try {
      const body = {
        firstName, lastName, managerName, role
      }
      const url = process.env.DB_URL || 'http://localhost:3001';
      const route = '/api/employees/add'
      const response = await axios.get(`${url}${route}`, {
        method: 'POST'
      })
      // console.log('response: ', response)
      // console.log('response.data.data: ', response.data.data)
      const headers = Object.keys(response.data.data[0])
      const table = new Table({
        head: headers
      });
      response.data.data.forEach(row => {
        // console.log('row', row)
        const rowValues = Object.keys(row).map((key) => row[key])
        table.push(rowValues);
      });
      console.log(table.toString())
    } catch (err) {
      console.error(err);
    }
  
  });

}

const chooseDepartment = async () => {
  try {
    let selectedDept = {};
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/departments/all'
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    const deptList = response.data.data
    const deptNames = deptList.map(deptInfo => `${deptInfo['id']}: ${deptInfo['name']}`);
    
    await inquirer
      .prompt([
        {
          name: "deptName",
          type: "list",
          message: "What department for this role?",
          choices: deptNames,
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please select a department.");
            }
          }
        }
      ])
      .then(async (data) => {
        const { deptName } = data;
        selectedDept.id = deptName.split(": ")[0];
        selectedDept.name = deptName.split(": ")[1];
      });

    return selectedDept;
  } catch (err) {
    console.error(err);
  }
}

const chooseRoles = async (department) => {
  try {
    let selectedRole = {};
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/employees/roles/?departmentId=${department.id}`
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    const roleList = response.data.data
    const roleNames = roleList.map(roleInfo => `${roleInfo['id']}: ${roleInfo['name']}`);
    
    await inquirer
      .prompt([
        {
          name: "roleName",
          type: "list",
          message: `What role for ${department.name}?`,
          choices: roleNames,
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please select a role.");
            }
          }
        }
      ])
      .then(async (data) => {
        const { roleName } = data;
        selectedRole.id = roleName.split(": ")[0];
        selectedRole.name = roleName.split(": ")[1];
      });

    return selectedRole;
  } catch (err) {
    console.error(err);
  }
}

initializeApp();