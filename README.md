# web-app-2020-fall

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dabde95955984dd08493709c421c7da6)](https://app.codacy.com/gh/denisecase/web-app-2020-fall?utm_source=github.com&utm_medium=referral&utm_content=denisecase/web-app-2020-fall&utm_campaign=Badge_Grade)
![GitHub repo size](https://img.shields.io/github/repo-size/denisecase/web-app-2020-fall?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

> Example of a collaborative MVC web app built with the Express web framework for Node.js.

## Links

- [Webapp on Heroku](https://web-app-2020-fall.herokuapp.com/)
- [Source](https://github.com/denisecase/web-app-2020-fall)

## Set Up Machine for Development

First, set up your Windows machine for development - follow the instructions at [Windows Setup For Developers (The Basics)](https://github.com/denisecase/windows-setup). Be able to right-click your project folder and "Open PowerShell here as Administrator". 

## Prerequisites

- Node.js (comes with npm)
- Git
- TortoiseGit
- VS Code
- VS Code Extension - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [DB Browser for SQLite](https://sqlitebrowser.org/dl/), e.g., standard for 64 Windows. Save the .msi file and double-click to run it.

```PowerShell
choco install nodejs -y
choco install git -y
choco install tortoisegit -y
choco install vscode -y
choco upgrade all -y
refresh env
```

## Prerequisites for Publishing

- [Heroku CLI - to publish](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
- [Heroku login](https://id.heroku.com/login)
- [PostgreSQL local install](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

Create Heroku app with Heroku Postgres (Hobby Dev - free) add-on.

## Background - How to Start a New App like this

- Run Express-generator with EJS (dynamically create pages with HTML & embedded JS)
- Update the JavaScript - change var to const, use async/await
- Change package.json versions to "latest" - until you have issues, then freeze a version
- Add folders to organize your code
- Update to use Express app4 updates - stay current
- [Set up ESLint and Prettier](https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node)

## Build Responsive Apps (for all screen sizes)

- We choose [MDB 5](https://mdbootstrap.com/docs/standard/) (Material Design Bootstrap 5 - no jQuery)

## Add App-Specific Resources

Follow conventions - use standard lowercase, no spaces, follow naming patterns

Enable standard CRUD options (create, read, update, delete)

- Make a model & seed some data on startup
- Route requests to specific routers
- Route CRUD requests to controller functions
- Create standard views for the resource

1. create.ejs
1. delete.ejs
1. details.ejs
1. edit.ejs
1. index.ejs

Add a standard comment block at the top of each file.

Add yourself and email as the author (follow examples).

## How to Contribute

### Step 1 - Get fresh code.

1. Pull fresh code. (Fork & clone if this is the first time.)
1. Run npm install
1. Run npm run start
1. Verify everything runs.

```PowerShell
npm install
npm run start
```

### Step 2 - Make your contributions.

As you test your code, format it with Prettier and
lint (clean it up) with ESLint.
See scripts in package.json.

1. Immediately, make your local edits.
1. Verify the app still runs & standarize your code (see commands below)

```PowerShell
npm install
npm run start

npm run prettier
npm run lint
npm run lint-fix
```

### Step 3 - Save your work.

1. Git add & git commit locally.
1. Git push to the origin.
1. In your updated GitHub repo look for "Pull Request".
1. Follow instructions (click the green buttons) to prepare a "pull request" into the main repo.

## Start Options

Start the app by running npm run start.
Until error handling is complete, a clean shutdown is better.
Once error handling is complete, use npm run dev to start with nodemon.

```PowerShell
npm run start
```

View the application locally at <http://localhost:3020/>

## Sequelize commands

```PowerShell
npx sequelize-cli db:migrate
```

## PostgreSQL commands (for Production Database)

```PowerShell
Start-Process 'C:\Program Files\PostgreSQL\13\scripts\runpsql.bat'
psql "${DATABASE_URL}"

```

## Heroku commands (for Production App)

```PowerShell
heroku login
heroku addons

heroku addons:create heroku-postgresql:hobby-dev
heroku ps:scale web=1 --app web-app-2020-fall

heroku config --app web-app-2020-fall
heroku pg:info --app web-app-2020-fall
heroku pg:diagnose --app web-app-2020-fall
heroku pg:psql postgresql-round-39059 --app web-app-2020-fall

heroku run sequelize --app web-app-2020-fall
heroku run sequelize db:migrate --app web-app-2020-fall

heroku logs --app web-app-2020-fall --tail

heroku open --app web-app-2020-fall
```

## Resources

- [Express API with Postgres](https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/)
- [See repo](https://github.com/chidimo/Express-API-Template)
- [Getting Started with Sequelize and Postgres](https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp)
- [Getting Started with Node, Express and PostgreSQL using Sequelize](https://morioh.com/p/fe03e5149f97)
- [EJS CRUD tutorial](https://www.mynotepaper.com/nodejs-simple-crud-with-expressjs-and-mysql)
- [EJS CRUD repo](https://github.com/mdobydullah/nodejs-crud-with-expressjs-mysql)
- [MDN Guide to Publishing with Heroku](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
- [Provising Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres)

## Resources - Authentication & Authorization

- [ISA NWMSU Repo (GDP 2 Team 4 Section 2)](https://github.com/MAHALAKSHMIKONGARI/GDP_Team-4_Section-2) - example using passport and passport-jwt for user authentication and authorization
- [ISA NWMSU App](http://isanwmsu.herokuapp.com/)

