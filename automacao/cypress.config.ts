import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';


async function setupNodeEvents(on: any, config: any) {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );
  return config;
}

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  env: {
    apiUrl: 'http://localhost:3000',
  },
  e2e: {
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 90000,
    video: false,
    numTestsKeptInMemory: 10,
    specPattern: [
      './cypress/e2e/features/*.feature',
    ],
    setupNodeEvents,
  },
});
