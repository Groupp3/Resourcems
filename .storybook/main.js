/** @type { import('@storybook/react-vite').StorybookConfig }
 * 
 */

const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    {
      "name": "@storybook/addon-essentials",
      "options": {
        "docs": false
      }
    },
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  // Add static directories if needed
  "staticDirs": ["../public"],
  // Add Vite configuration for handling Bootstrap Icons
  "viteFinal": async (config) => {
    // Add any custom Vite configuration
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          // Add path aliases if needed
        }
      },
      // Make sure CSS is properly handled
      css: {
        preprocessorOptions: {
          ...config.css?.preprocessorOptions,
        }
      }
    };
  }
  
};
export default config;