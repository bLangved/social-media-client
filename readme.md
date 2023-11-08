# Workflow CA

## Description
This project is a school assigment in the subject "Workflow". The goal for the assigment was as follows: 
Using the skills and knowledge from this course, improve the quality of a package by establishing helpful workflows that make the development process more efficient.

## Status bagdes
[![Automated Unit Testing](https://github.com/bLangved/social-media-client/actions/workflows/unit-test.yml/badge.svg)](https://github.com/bLangved/social-media-client/actions/workflows/unit-test.yml)

[![Automated E2E Testing](https://github.com/bLangved/social-media-client/actions/workflows/e2e-test.yml/badge.svg)](https://github.com/bLangved/social-media-client/actions/workflows/e2e-test.yml)

## Usage instructions for project

See .vscode folder in root directory for my recommended settings working on this project.
If you install newer/older versions of some dependencies, I can't guarante that it won't break functionality in the project. 

These are dependencies I have used within this project (and commands to install them): 

**Eslint:**
How to install: npm install eslint --save-dev
How to initialise: npx eslint --init (follow instructions)

**Prettier:**
How to install: npm install --save-dev prettier

**Mrm:**
How to install: npx mrm@2 lint-staged

### For unit-testing with Jest:
- Versions listed are current versions used
1. Install Jest - npm i -D jest@29.7.0
2. Install Babel for Jest: npm -D install @babel/core@7.19.3 @babel/preset-env@7.19.4

### For E2E testing with Cypress:

1. Install Cypress: npm i -D cypress eslint-plugin-cypress
2. If you do not have a Noroff API user, check out the API documentation at https://docs.noroff.dev/
3. Create a cypress.env.json file in the root directory.
4. Enter both valid login-credentials inside cypress.env.json.
5. Both variables are strings, and needs to be inside quotation marks

// Inside cypress.env.json
{
"VALID_USERNAME": "test.test@mail.com",
"VALID_PASSWORD": "validPassword"
}

5. (optional) Both variables needs to be added as secret variables on github if you want to run tests remotely


## Getting started

### Installing
Clone this repo:

```bash
git clone https://github.com/bLangved/social-media-client.git
```

### Running

You might need to install a package manager before working on the project. Run "npm install" for this. 

### Contributing

As this project was a school assigment, and forked from a Noroff repo, it is not open for contributions.

### Contact

To get in contact with me regarding this project, please use one of the below options:

[My LinkedIn page](https://www.linkedin.com/in/bj%C3%B8rnar-heian-langved-23157b246/)
<br>
Discord User name: Langved


### Acknowledgments

[Noroff - School of technology and digital media](https://www.noroff.no/en)







