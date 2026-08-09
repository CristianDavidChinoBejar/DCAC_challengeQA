import { defineConfig } from 'cypress';
import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Reporte de API Testing',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: 'https://fakestoreapi.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      cypressMochawesomeReporter(on);
      return config;
    },
  },
});
