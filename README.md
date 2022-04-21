# CLI_Employee-Manager

<div align="center">
 <img src="https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E" alt="JavaScript Badge"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" alt="NodeJS Badge"/>
 <img src="https://img.shields.io/badge/Express.js-white?style=flat&logo=express&logoColor=black" alt="ExpressJS Badge"/>
 <img src="https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white" alt="MySQL Badge"/>
</div>

## Description
Command line application to help manage organization of employees.





## Table Of Contents
 - [Installation](#installation) 
 - [Usage](#usage) 
 - [Languages, Libraries, and Frameworks](#languages)
 - [Contributor](#contributor)

## Installation
 - Install using npm package manager. 
    - ```
        npm install
        ``` 
 - Install nodemon globally for cli.
    - ```
        npm install -g nodemon
        ``` 
 - Create environment variable file ".env" with filled in parameters listed in file below. Save to root folder.
    - [env](./.env.EXAMPLE)
 - Create MySQL database using 'db.sql' file in db folder.
    - [database](./db/db.sql)
 - Create MySQL tables using 'schema.sql' file in db folder.
    - [schema](./db/schema.sql)
 - Optional: Pre-populate table with 'seeds.sql' file in db folder.
    - [seeds](./db/seeds.sql)

## Usage
 - Run server command. Note: command uses nodemon.
    - ```
        npm run server
        ``` 
 - In a separate terminal. Run client command.
    - ```
        npm run client
        ``` 

<div id='languages'></div>

## **Languages, Libraries, and Frameworks:**

| Technology | Type | Description |
| ----------- | ----- | -------- |
| [Javascript](https://www.javascript.com/) | Language | An object-oriented computer programming language. |
| [Node.js](https://nodejs.org/en/) | Runtime Environment | An open source server environment. |
| [NPM - nodemon](https://www.npmjs.com/package/nodemon) | Module | Is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. |
| [NPM - express](https://www.npmjs.com/package/express) | Module | A node package for creating a web framework in node. |
| [NPM - inquirer](https://www.npmjs.com/package/inquirer) | Module | Inquirer.js should ease the process of providing error feedback, asking questions, parsing input, validating answers, managing hierarchical prompts. |
| [NPM - mysql2](https://www.npmjs.com/package/mysql2) | Database | An updated version of the [MySQL](https://www.npmjs.com/package/mysql) package required for Sequelize package. |



## Contributor
 - **Eric Ng**  - [EricNg314](https://github.com/EricNg314) 