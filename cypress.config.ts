import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: 'https://fakestoreapi.com',
    supportFile: 'cypress/support/e2e.ts',
  },
});