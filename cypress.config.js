const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // BASE_URL is defined in cypress.env.json, use it. Otherwise, use the default.
      config.baseUrl = config.env.BASE_URL;
      return config;
    },
    defaultCommandTimeout: 10000,
  },
});
