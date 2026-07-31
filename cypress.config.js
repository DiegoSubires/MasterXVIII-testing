import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';

const PORT = process.env.PORT || 4173;

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: `http://localhost:${PORT}`,
    supportFile: false,
    setupNodeEvents(on, config) {
      // Usamos esbuild para procesar archivos .ts al instante
      on('file:preprocessor', createBundler());

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-software-rasterizer');
        }
        return launchOptions;
      });
    },
  },
});
