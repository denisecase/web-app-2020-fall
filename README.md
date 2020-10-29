# web-app-2020-fall

> Example of a collaborative MVC web app built with the Express web framework for Node.js.

## Prerequisites

- Node.js (comes with npm)
- Git.
- TortoiseGit.
- VS Code
- VS Code Extension - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [DB Browser for SQLite](https://sqlitebrowser.org/dl/), e.g., standard for 64 Windows. Save the .msi file and double-click to run it.

## Background

- Express-generator with EJS
- Change var to const
- Change package.json versions to "latest"
- Added folders for MVC
- Updated to use express app4 updates
- [Set up ESLint and Prettier](https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node)

## Adding Resources

Follow conventions - use standard lowercase, no spaces, follow naming patterns

We want to be able to perform all CRUD options (create, read, update, delete)

- Make a model
- Make a controller
- Make a views subfolder with 5 views:

1. create.ejs
1. delete.ejs
1. details.ejs
1. edit.ejs
1. index.ejs

On your initial commit, just add a comment block at the top of each file.

Add yourself and your email as the author (follow the examples).

## Contributing

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

## Resources

- [Getting Started with Node, Express and PostgreSQL using Sequelize](https://morioh.com/p/fe03e5149f97)
