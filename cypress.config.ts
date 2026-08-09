import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl: 'https://fakestoreapi.com',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts'
  },
});