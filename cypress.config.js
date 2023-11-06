// TODO: Implement setupNodeEvents and remove eslint-disable below
/* eslint-disable no-unused-vars */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5500", // Set your local development URL
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 10000,
  },
});
