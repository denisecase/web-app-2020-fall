# web-app-2020-fall

> Example of a collaborative MVC web app built with the Express web framework for Node.js.

## Prerequisites

- Git
- TortoiseGit
- VS Code
- VS Code Extension - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Background

- Express-generator with EJS
- Change var to const
- Change package.json versions to "latest"
- Added folders for MVC
- Updated to use express app4 updates
- [Set up ESLint and Prettier](https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node)
- Set up [Cypress](https://docs.cypress.io/) testing

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

1. Pull fresh code. (Fork & clone if this is the first time.)
1. Run npm install 
1. Run npm start dev
1. Verify everything runs.
1. Make your local edits. 
1. Git add & git commit locally. 
1. Git push to the origin. 
1. Submit your pull request to the main repo. 

## Start

```PowerShell
 $env:DEBUG='web-app-2020-fall:*'; npm start
 ```