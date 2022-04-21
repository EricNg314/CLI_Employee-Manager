const inquirer = require("inquirer");
const axios = require("axios");
const Table = require('cli-table3');

async function initializeApp() {
  console.log(`
  ----------------------------
  
      CLI_Employee-Manager
  
  ----------------------------`)
  await managerMenu();
  console.log(`
  --------------------------------------------------
  
      Thank you for using CLI_Employee-Manager.
  
  --------------------------------------------------`)
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
            'View All Roles',
            'View All Departments',
            'View Employee By Manager',
            'View Employee By Department',
            'View Total Budget By Department',
            'Update Employee Role',
            'Update Employee Manager',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Delete Employee',
            'Delete Role',
            'Delete Department',
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
        } else if(task == 'View All Roles'){
          await viewAllRoles();
        } else if(task == 'View All Departments'){
          await viewAllDepartments();
        } else if(task == 'View Employee By Manager'){
          await viewEmployeeByManager();
        } else if(task == 'View Employee By Department'){
          await viewEmployeeByDept();
        } else if(task == 'View Total Budget By Department'){
          await viewTotalBudgetByDept();
        } else if(task == 'Update Employee Role'){
          await updateEmployee();
        } else if(task == 'Update Employee Manager'){
          await updateEmpManager();
        } else if(task == 'Add Employee'){
          await addEmployee();
        } else if(task == 'Add Role'){
          await addRole();
        } else if(task == 'Add Department'){
          await addDepartment();
        } else if(task == 'Delete Employee'){
          await deleteEmployee();
        } else if(task == 'Delete Role'){
          await deleteRole();
        } else if(task == 'Delete Department'){
          await deleteDepartment();
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
    const response = await axios.get(`${url}${route}`)
    if (response.data.data.length > 0){
      const headers = Object.keys(response.data.data[0])
      const table = new Table({
        head: headers
      });
      response.data.data.forEach(row => {
        const rowValues = Object.keys(row).map((key) => row[key])
        table.push(rowValues);
      });
      console.log(table.toString())
    } else {
      console.log("No employees found.")
    }
  } catch (err) {
    console.error(err);
  }
}

const viewEmployeeByManager = async () => {
  const department = await chooseDepartment();
  const manager = await chooseManager(department);

  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/employees/viewManagerEmployees?id=${manager.id}`
    const response = await axios.get(`${url}${route}`)
    if (response.data.data.length > 0){
      const headers = Object.keys(response.data.data[0])
      const table = new Table({
        head: headers
      });
      response.data.data.forEach(row => {
        const rowValues = Object.keys(row).map((key) => row[key])
        table.push(rowValues);
      });
      console.log(table.toString())
    } else {
      console.log(`No employees for ${manager.first_name} ${manager.last_name} found.`)
    }
  } catch (err) {
    console.error(err);
  }
}

const viewEmployeeByDept = async () => {
  const department = await chooseDepartment();

  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/employees/viewDepartmentEmployees?id=${department.id}`
    const response = await axios.get(`${url}${route}`)
    if (response.data.data.length > 0){
      const headers = Object.keys(response.data.data[0])
      const table = new Table({
        head: headers
      });
      response.data.data.forEach(row => {
        const rowValues = Object.keys(row).map((key) => row[key])
        table.push(rowValues);
      });
      console.log(table.toString())
    } else {
      console.log(`No employees for ${department.name} found.`)
    }
  } catch (err) {
    console.error(err);
  }
}

const viewAllRoles = async () => {
  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/roles/viewAll'
    const response = await axios.get(`${url}${route}`)
    if (response.data.data.length > 0){
      const headers = Object.keys(response.data.data[0])
      const table = new Table({
        head: headers
      });
      response.data.data.forEach(row => {
        const rowValues = Object.keys(row).map((key) => row[key])
        table.push(rowValues);
      });
      console.log(table.toString())
    } else {
      console.log("No roles found.")
    }
  } catch (err) {
    console.error(err);
  }
}

const viewAllDepartments = async () => {
  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/departments/all'
    const response = await axios.get(`${url}${route}`)
    if (response.data.data.length > 0){
      const headers = Object.keys(response.data.data[0])
      const table = new Table({
        head: headers
      });
      response.data.data.forEach(row => {
        const rowValues = Object.keys(row).map((key) => row[key])
        table.push(rowValues);
      });
      console.log(table.toString())
    } else {
      console.log("No departments found.")
    }
  } catch (err) {
    console.error(err);
  }
}

const viewTotalBudgetByDept = async () => {
  const department = await chooseDepartment();

  try {
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/departments/totalBudget?id=${department.id}`
    const response = await axios.get(`${url}${route}`)
    if (response.data.data.length > 0){
      const headers = Object.keys(response.data.data[0])
      const table = new Table({
        head: headers
      });
      response.data.data.forEach(row => {
        const rowValues = Object.keys(row).map((key) => row[key])
        table.push(rowValues);
      });
      console.log(table.toString())
    } else {
      console.log(`No expenses for ${department} found.`)
    }
  } catch (err) {
    console.error(err);
  }
}

const addEmployee = async () => {
  const employeeName = await promptEmployeeInfo();
  const department = await chooseDepartment();
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

const addRole = async () => {
  const role = await promptRoleInfo();
  const department = await chooseDepartment();

  try {
    const bodyInfo = {
      role_title: role.role_title,
      role_salary: role.role_salary,
      department_id: department.id,
      department_name: department.name
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/roles/add'
    const response = await axios.post(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const addDepartment = async () => {
  const department = await promptDepartmentInfo();

  try {
    const bodyInfo = {
      department_name: department.department_name
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/departments/add'
    const response = await axios.post(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const updateEmployee = async () => {
  const employee = await chooseEmployee();
  const department = await chooseDepartment();
  const role = await chooseRoles(department);

  try {
    const bodyInfo = {
      employee_id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      role_id: role.id,
      role_title: role.title
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/update'
    const response = await axios.post(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const updateEmpManager = async () => {
  const employee = await chooseEmployee();
  const department = await chooseDepartment();
  const manager = await chooseManager(department);

  try {
    const bodyInfo = {
      employee_id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      manager_id: manager.id,
      manager_name: manager.first_name + " " + manager.last_name,
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/updateManager'
    const response = await axios.post(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const deleteEmployee = async () => {
  const employee = await chooseEmployee();

  try {
    const bodyInfo = {
      data: {
        employee_id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name
      }
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/employees/delete`
    const response = await axios.delete(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const deleteRole = async () => {
  const department = await chooseDepartment();
  const role = await chooseRoles(department);

  try {
    const bodyInfo = {
      data: {
        role_id: role.id,
        title: role.title,
        department_name: department.name
      }
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/roles/delete`
    const response = await axios.delete(`${url}${route}`, {
      ...bodyInfo
    })
    console.log(response.data.data.message)
  } catch (err) {
    console.error(err);
  }
}

const deleteDepartment = async () => {
  const department = await chooseDepartment();

  try {
    const bodyInfo = {
      data: {
        department_id: department.id,
        department_name: department.name
      }
    }
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = `/api/departments/delete`
    const response = await axios.delete(`${url}${route}`, {
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

const promptRoleInfo = async () => {
  let roleInfo = {}
  await inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "Role Title:",
        validate: (answer) => {
          if (answer) {
            return true;
          } else {
            console.log("Please add Role Title.");
          }
        }
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Role Salary:",
        validate: (answer) => {
          if (answer && (Number.isInteger(parseFloat(answer)))) {
            return true;
          } else {
            console.log("Please add Role Salary.");
          }
        }
      },
    ])
    .then(async (data) => {
      const { roleTitle, roleSalary } = data;
      roleInfo.role_title = roleTitle;
      roleInfo.role_salary = roleSalary;
    });
    return roleInfo;
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

const chooseEmployee = async () => {
  try {
    let selectedEmployee = {};
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/employees/all'
    const response = await axios.get(`${url}${route}`)
    const employeeList = response.data.data
    const employeeNames = employeeList.map(employeeInfo => `${employeeInfo['id']}: ${employeeInfo['last_name']}, ${employeeInfo['first_name']}`);
    
    await inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          message: "Update which employee?",
          choices: employeeNames,
          validate: (answer) => {
            if (answer) {
              return true;
            } else {
              console.log("Please select a employee.");
            }
          }
        }
      ])
      .then(async (data) => {
        const { employeeName } = data;
        if(employeeName !== "N/A") {
          const employeeInfoArr = employeeName.split(": ");
          const employeeNameArr = employeeInfoArr[1].split(", ");
          selectedEmployee.id = employeeInfoArr[0];
          selectedEmployee.first_name = employeeNameArr[1];
          selectedEmployee.last_name = employeeNameArr[0];
        } else {
          selectedEmployee.id = null;
          selectedEmployee.first_name = null;
          selectedEmployee.last_name = null;
        }
      });

    return selectedEmployee;
  } catch (err) {
    console.error(err);
  }
}

const chooseDepartment = async () => {
  try {
    let selectedDept = {};
    const url = process.env.DB_URL || 'http://localhost:3001';
    const route = '/api/departments/all'
    const response = await axios.get(`${url}${route}`)
    const deptList = response.data.data
    const deptNames = deptList.map(deptInfo => `${deptInfo['id']}: ${deptInfo['name']}`);
    
    await inquirer
      .prompt([
        {
          name: "deptName",
          type: "list",
          message: "Select Department.",
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
    const route = `/api/roles/byDepartment?id=${department.id}`
    const response = await axios.get(`${url}${route}`)
    const roleList = response.data.data
    const roleNames = roleList.map(roleInfo => `${roleInfo['id']}: ${roleInfo['title']}`);
    
    await inquirer
      .prompt([
        {
          name: "roleName",
          type: "list",
          message: `Select Role within ${department.name}?`,
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
    const response = await axios.get(`${url}${route}`)
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
          message: `Select Manager within ${department.name}?`,
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