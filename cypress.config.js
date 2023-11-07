// TODO: Implement setupNodeEvents and remove eslint-disable below
/* eslint-disable no-unused-vars */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // BASE_URL is defined in cypress.env.json, use it. Otherwise, use the default.
      config.baseUrl = config.env.BASE_URL || "http://localhost:5500/";
      return config;
    },
    defaultCommandTimeout: 10000,
  },
});
