const inquirer = require("inquirer");
const axios = require("axios");
const Table = require('cli-table3');

async function initializeApp() {
  console.log(`
  ----------------------------
  
      CLI_Employee-Manager
  
  ----------------------------`)
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
          await viewAllRoles();
        } else if(task == 'View All Departments'){
          await viewAllDepartments();
        } else if(task == 'Add Department'){
          await addDepartment();
        } else if(task == 'Quit'){
          appIsRunning = false;
        }
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
    const headers = Object.keys(response.data.data[0])
    const table = new Table({
      head: headers
    });
    response.data.data.forEach(row => {
      const rowValues = Object.keys(row).map((key) => row[key])
      table.push(rowValues);
    });
    console.log(table.toString())
  } catch (err) {
    console.error(err);
  }
}

const viewAllRoles = async () => {
  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/roles/viewAll'
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    const headers = Object.keys(response.data.data[0])
    const table = new Table({
      head: headers
    });
    response.data.data.forEach(row => {
      const rowValues = Object.keys(row).map((key) => row[key])
      table.push(rowValues);
    });
    console.log(table.toString())
  } catch (err) {
    console.error(err);
  }
}

const viewAllDepartments = async () => {
  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/departments/all'
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    const headers = Object.keys(response.data.data[0])
    const table = new Table({
      head: headers
    });
    response.data.data.forEach(row => {
      const rowValues = Object.keys(row).map((key) => row[key])
      table.push(rowValues);
    });
    console.log(table.toString())
  } catch (err) {
    console.error(err);
  }
}

const addEmployee = async () => {
  const employeeName = await promptEmployeeInfo();
  const department = await chooseDepartment()
  const role = await chooseRoles(department);
  const manager = await chooseManager(department);

  try {
    const bodyInfo = {
      first_name: employeeName.first_name,
      last_name: employeeName.last_name,
      manager_id: manager.id,
      manager_name: manager.first_name + " " + manager.last_name,
      role_id: role.id,
      role_title: role.title
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/add'
    const response = await axios.post(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const addDepartment = async () => {
  const department = await promptDepartmentInfo()

  try {
    const bodyInfo = {
      department_name: department.department_name
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/department/add'
    const response = await axios.post(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const promptEmployeeInfo = async () => {
  let employeeInfo = {}
  await inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "Employee's First Name:",
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please add Employee's First Name.");
            }
          }
        },
        {
          name: "lastName",
          type: "input",
          message: "Employee's Last Name:",
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please add Employee's Last Name.");
            }
          }
        }
      ])
      .then(async (data) => {
        const { firstName, lastName } = data;
        employeeInfo.first_name = firstName;
        employeeInfo.last_name = lastName;
      });

    return employeeInfo;
}

const promptDepartmentInfo = async () => {
  let departmentInfo = {}
  await inquirer
    .prompt([
      {
        name: "departmentName",
        type: "input",
        message: "Department Name:",
        validate: (answer) => {
          if (answer) {
            return true;
          } else {
            console.log("Please add Department Name.");
          }
        }
      },
    ])
    .then(async (data) => {
      const { departmentName } = data;
      departmentInfo.department_name = departmentName;
    });
    return departmentInfo;
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
          message: "Employee's department for this role?",
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
        const deptInfoArr = deptName.split(": ")
        selectedDept.id = deptInfoArr[0];
        selectedDept.name = deptInfoArr[1];
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
    const route = `/api/employees/roles/byDepartment?id=${department.id}`
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    const roleList = response.data.data
    const roleNames = roleList.map(roleInfo => `${roleInfo['id']}: ${roleInfo['title']}`);
    
    await inquirer
      .prompt([
        {
          name: "roleName",
          type: "list",
          message: `Employee's role for ${department.name}?`,
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
        const roleInfoArr = roleName.split(": ")
        selectedRole.id = roleInfoArr[0];
        selectedRole.title = roleInfoArr[1];
      });

    return selectedRole;
  } catch (err) {
    console.error(err);
  }
}

const chooseManager = async (department) => {
  try {
    let selectedManager = {};
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/employees/byDepartment?id=${department.id}`
    const response = await axios.get(`${url}${route}`, {
      method: 'GET'
    })
    const managerList = response.data.data
    const managerNames = managerList.map(managerInfo => 
      `${managerInfo['employee_id']}: ${managerInfo['last_name']}, ${managerInfo['first_name']}`
    );
    managerNames.push('N/A');

    await inquirer
      .prompt([
        {
          name: "managerName",
          type: "list",
          message: `Employee's manager for ${department.name}?`,
          choices: managerNames,
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please select a manager.");
            }
          }
        }
      ])
      .then(async (data) => {
        const { managerName } = data;

        if(managerName !== "N/A") {
          const managerInfoArr = managerName.split(": ");
          const managerNameArr = managerInfoArr[1].split(", ");
          selectedManager.id = managerInfoArr[0];
          selectedManager.first_name = managerNameArr[1];
          selectedManager.last_name = managerNameArr[0];
        } else {
          selectedManager.id = null;
          selectedManager.first_name = null;
          selectedManager.last_name = null;
        }
      });

    return selectedManager;
  } catch (err) {
    console.error(err);
  }
}

initializeApp();