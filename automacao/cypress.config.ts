import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { configurePlugin } from 'cypress-mongodb';



async function setupNodeEvents(on: any, config: any) {
  await addCucumberPreprocessorPlugin(on, config);
  configurePlugin(on),
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
    mongodb: {
      uri: 'mongodb+srv://admin:admin1234@cluster0.rn6zj2i.mongodb.net/livraria?retryWrites=true&w=majority&appName=Cluster0',
      database: 'livraria',
      collection: 'livros'
  },
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
    setupNodeEvents
  },
});
