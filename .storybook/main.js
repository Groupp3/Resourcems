/** @type { import('@storybook/react-vite').StorybookConfig } */
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
  "staticDirs": ["../public"],
  "viteFinal": async (config) => {
    const { default: svgr } = await import('vite-plugin-svgr');
    
    return {
      ...config,
      plugins: [
        ...config.plugins,
        svgr({
          svgrOptions: {
            exportType: 'named',
            ref: true,
            svgo: true,
            titleProp: true,
          },
          include: '**/*.svg',
        })
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
        }
      },
      css: {
        preprocessorOptions: {
          ...config.css?.preprocessorOptions,
        }
      }
    };
  }
};
export default config;