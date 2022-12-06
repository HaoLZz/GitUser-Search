import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: [
      "**/**/*.comp-spec.{js,ts,jsx,tsx}",
      "src/**/*.cy.{js,ts,jsx,tsx}",
    ],
  },
});
