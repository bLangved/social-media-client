1.  Create a cypress.env.json file in the root directory: Enter both valid and unvalid login-credentials (this is used in E2E-testing with cypress):

cypress.env.json

- All variables are strings, and needs to be inside quotation marks
  {
  "validUSERNAME": a valid username,
  "validPASSWORD": a valid password,
  "notValidUSERNAME": "invalid@example.com",
  "notValidPASSWORD": "wrongpassword"
  }

2.  See .vscode folder in root directory for my recommended settings working on this project.
