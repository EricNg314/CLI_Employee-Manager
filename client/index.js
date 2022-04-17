const inquirer = require("inquirer");

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
              console.log("Please select a type.");
            }
          }
        }
      ])
      .then(async (data) => {
        const { task } = data;
        if(task == 'View All Employees'){
          await viewAllEmployees();
        } else if(task == 'Add Employee'){
          await viewAllEmployees();
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
  console.log('Viewing new request.')
}


initializeApp();