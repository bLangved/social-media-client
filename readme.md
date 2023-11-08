## Usage instructions for project

## For cypress E2E testing

1. If you do not have a Noroff API user, check out the API documentation at https://docs.noroff.dev/
2. Create a cypress.env.json file in the root directory.
3. Enter both valid login-credentials (this is used in E2E-testing with cypress)
4. Both variables are strings, and needs to be inside quotation marks

// Inside cypress.env.json
{
"VALID_USERNAME": "test.test@mail.com",
"VALID_PASSWORD": "validPassword"
}

5. (optional) Both variables needs to be added as secret variables on github, if you want to run tests remotely
6. (contain links/test code for E2E test?)

## Additional info

- See .vscode folder in root directory for my recommended settings working on this project.
