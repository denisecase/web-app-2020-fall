# web-app-2020-fall
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build Status](https://travis-ci.org/denisecase/web-app-2020-fall.svg?branch=main)](https://travis-ci.org/denisecase/web-app-2020-fall)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dabde95955984dd08493709c421c7da6)](https://app.codacy.com/gh/denisecase/web-app-2020-fall?utm_source=github.com&utm_medium=referral&utm_content=denisecase/web-app-2020-fall&utm_campaign=Badge_Grade)
![GitHub repo size](https://img.shields.io/github/repo-size/denisecase/web-app-2020-fall?style=flat)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![Known Vulnerabilities](https://snyk.io/test/github/denisecase/web-app-2020-fall/badge.svg?targetFile=package.json)](https://snyk.io/test/github/denisecase/web-app-2020-fall?targetFile=package.json)

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
refreshenv
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
2. delete.ejs
3. details.ejs
4. edit.ejs
5. index.ejs

Add a standard comment block at the top of each file.

Add yourself and email as the author (follow examples).

## How to Contribute

### First time only

1. Click the fork icon on this repo to fork it into your own cloud account.
2. Clone your new cloud repo down to your machine.

### Step 1 - Get fresh code

1. Pull fresh code from shared cloud repo.
2. Update your cloud repo (git add and push).
3. Install dependencies (assume there have been changes).
4. Start the app.
5. Open your browser to verify everything runs.

```Powershell
git pull "https://github.com/denisecase/web-app-2020-fall.git"
git add .
git push
npm install
npm run start
```

### Step 2 - Make your contributions

As you test your code, format it with Prettier and
lint (clean it up) with ESLint.
See scripts in package.json.

1. While code is fresh, make your local edits.
2. Verify the app still runs & standarize your code.

```PowerShell
npm install
npm run start

npm run prettier
npm run lint
npm run lint-fix
```

Fix your code as suggested by the linter.

### Step 3 - Save and share your work

1. Git add & git commit locally.
2. Git push to the origin.
3. In your updated GitHub repo look for "Pull Request".
4. Follow instructions (click the green buttons) to prepare a "pull request" into the main repo.

### Step 4 - Refresh before making new contributions

1. Git pull from shared repo to your laptop
2. Git add any new files from root folder on down (git add .)
3. Git push to your origin repo (your forked repo in the cloud)

```Powershell
git pull "https://github.com/denisecase/web-app-2020-fall.git"
git add .
git push
```

## Start Options

Start the app by running npm run start.
Until error handling is complete, a clean shutdown is better.
Once error handling is complete, use npm run dev to start with nodemon.

```PowerShell
npm run start
```

View the application locally at <http://localhost:3020/>

## Reference Command Examples

Sequelize commands

```PowerShell
npx sequelize-cli db:migrate
```

PostgreSQL commands (for Production Database)

```PowerShell
Start-Process 'C:\Program Files\PostgreSQL\13\scripts\runpsql.bat'
psql "${DATABASE_URL}"

```

Heroku commands (for production reference)

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

Security

- [GitHub: Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [US Gov: Before You Ship - Static Security Analysis](https://before-you-ship.18f.gov/security/static-analysis/)
- [OWASP: Node Security Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html)
- [Express: Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [ES Lint: Config](https://github.com/EvgenyOrekhov/eslint-config-hardcore)

Sequelize & PostgreSQL

- [Getting Started with Sequelize and Postgres](https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp)
- [Getting Started with Node, Express and PostgreSQL using Sequelize](https://morioh.com/p/fe03e5149f97)

Express

- [MDN Web Docs - Express Web Framework](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

EJS CRUD

- [EJS CRUD tutorial](https://www.mynotepaper.com/nodejs-simple-crud-with-expressjs-and-mysql)
- [EJS CRUD repo](https://github.com/mdobydullah/nodejs-crud-with-expressjs-mysql)

Deploying on Heroku

- [MDN Guide to Publishing with Heroku](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
- [Provising Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres)

Authentication & Authorization

- [NWMSU GDP1 - The Hunt](https://github.com/Krishna-Koyyalamudi/The-Hunt)
- [ISA NWMSU Repo (GDP 2 Team 4 Section 2)](https://github.com/MAHALAKSHMIKONGARI/GDP_Team-4_Section-2) - example using passport and passport-jwt for user authentication and authorization
- [ISA NWMSU App](http://isanwmsu.herokuapp.com/)

# Contribute

See our [Contributing Guide](./CONTRIBUTING.md) for instructions on how to contribute code.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/denisecase"><img src="https://avatars0.githubusercontent.com/u/13016516?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Denise Case</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=denisecase" title="Code">💻</a> <a href="https://github.com/denisecase/web-app-2020-fall/commits?author=denisecase" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/StephenBurke"><img src="https://avatars1.githubusercontent.com/u/42814417?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stephen Burke</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=StephenBurke" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lrfares1996"><img src="https://avatars3.githubusercontent.com/u/54172122?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lindsey Fares</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=lrfares1996" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bben6087"><img src="https://avatars2.githubusercontent.com/u/54418954?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Blake Bennett</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=bben6087" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SRitt12"><img src="https://avatars0.githubusercontent.com/u/54680543?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sam Ritter</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=SRitt12" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cherryvarsha99"><img src="https://avatars2.githubusercontent.com/u/70028775?v=4?s=100" width="100px;" alt=""/><br /><sub><b>varsha vellanki</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=cherryvarsha99" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shivani-ta"><img src="https://avatars2.githubusercontent.com/u/69983357?v=4?s=100" width="100px;" alt=""/><br /><sub><b>shivani tangellapally</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=shivani-ta" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/chanWright"><img src="https://avatars0.githubusercontent.com/u/25439117?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chandler Wright</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=chanWright" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Charles-Hoot"><img src="https://avatars2.githubusercontent.com/u/32575563?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Charles-Hoot</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=Charles-Hoot" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zachariahwatson"><img src="https://avatars0.githubusercontent.com/u/54414185?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zach Watson</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=zachariahwatson" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/praneethvallabhaneni"><img src="https://avatars0.githubusercontent.com/u/71108379?v=4?s=100" width="100px;" alt=""/><br /><sub><b>praneethvallabhaneni</b></sub></a><br /><a href="https://github.com/denisecase/web-app-2020-fall/commits?author=praneethvallabhaneni" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Your contributions are appreciated!
