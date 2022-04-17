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
  const employeeName = await promptEmployeeInfo();
  const department = await chooseDepartment()
  const role = await chooseRoles(department);
  const manager = await chooseManager(department);

  console.log('addEmployee employeeName: ', employeeName)
  console.log('addEmployee department: ', department)
  console.log('addEmployee role: ', role)
  console.log('addEmployee manager: ', manager)

  // try {
  //   const url = process.env.DB_URL || 'http://localhost:3001';
  //   const route = '/api/employees/viewAll'
  //   const response = await axios.get(`${url}${route}`, {
  //     method: 'GET'
  //   })
  //   // console.log('response: ', response)
  //   // console.log('response.data.data: ', response.data.data)
  //   const headers = Object.keys(response.data.data[0])
  //   const table = new Table({
  //     head: headers
  //   });
  //   response.data.data.forEach(row => {
  //     // console.log('row', row)
  //     const rowValues = Object.keys(row).map((key) => row[key])
  //     table.push(rowValues);
  //   });
  //   console.log(table.toString())
  // } catch (err) {
  //   console.error(err);
  // }



  // await inquirer
  // .prompt([
  //   {
  //     name: "firstName",
  //     type: "input",
  //     message: "First Name:",
  //     validate: (answer) => {
  //       if (answer) {
  //         return true;
  //       } else {
  //         console.log("Employee's First Name.");
  //       }
  //     }
  //   },
  //   {
  //     name: "lastName",
  //     type: "input",
  //     message: "Last Name:",
  //     validate: (answer) => {
  //       if (answer) {
  //         return true;
  //       } else {
  //         console.log("Employee's Last Name.");
  //       }
  //     }
  //   },
  //   {
  //     name: "managerName",
  //     type: "input",
  //     message: "Manager Name:",
  //     validate: (answer) => {
  //       if (answer) {
  //         return true;
  //       } else {
  //         console.log("Manager Name?");
  //       }
  //     }
  //   },
  //   {
  //     name: "role",
  //     type: "input",
  //     message: "Role:",
  //     validate: (answer) => {
  //       if (answer) {
  //         return true;
  //       } else {
  //         console.log("Employee's Role?");
  //       }
  //     }
  //   },
  // ])
  // .then(async (data) => {
  //   const { firstName, lastName, managerName, role } = data;
  //   try {
  //     const body = {
  //       firstName, lastName, managerName, role
  //     }
  //     const url = process.env.DB_URL || 'http://localhost:3001';
  //     const route = '/api/employees/add'
  //     const response = await axios.get(`${url}${route}`, {
  //       method: 'POST'
  //     })
  //     // console.log('response: ', response)
  //     // console.log('response.data.data: ', response.data.data)
  //     const headers = Object.keys(response.data.data[0])
  //     const table = new Table({
  //       head: headers
  //     });
  //     response.data.data.forEach(row => {
  //       // console.log('row', row)
  //       const rowValues = Object.keys(row).map((key) => row[key])
  //       table.push(rowValues);
  //     });
  //     console.log(table.toString())
  //   } catch (err) {
  //     console.error(err);
  //   }
  
  // });

}

const promptEmployeeInfo = async () => {
  let employeeInfo = {}
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
        }
      ])
      .then(async (data) => {
        const { firstName, lastName } = data;
        employeeInfo.firstName = firstName;
        employeeInfo.lastName = lastName;
      });

    return employeeInfo;
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
    const managerNames = managerList.map(managerInfo => `${managerInfo['id']}: ${managerInfo['last_name']}, ${managerInfo['first_name']}`);
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