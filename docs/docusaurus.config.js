// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Canvas Datagrid',
  tagline:
    'Canvas based data grid web component. Capable of displaying millions of contiguous hierarchical rows and columns without paging or loading, on a single canvas element.',
  url: 'https://canvas-datagrid.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'TonyGermaneri', // Usually your GitHub org/user name.
  projectName: 'canvas-datagrid', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // path: 'docs',
          sidebarPath: 'sidebars.js',
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl:
            'https://github.com/TonyGermaneri/canvas-datagrid/edit/main/docs/',
        },
        theme: {
          customCss: require.resolve('./css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Canvas Datagrid',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Introduction',
          },
          {
            to: 'getting-started',
            label: 'Getting started',
            position: 'right',
          },
          {
            to: 'examples',
            label: 'Examples',
            position: 'right',
          },
          {
            href: 'https://github.com/TonyGermaneri/canvas-datagrid',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: 'intro',
              },
              {
                to: 'getting-started',
                label: 'Getting started',
              },
              {
                to: 'examples',
                label: 'Examples',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack support',
                href: 'https://canvas-datagrid.slack.com/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/TonyGermaneri/canvas-datagrid',
              },
              {
                href: 'https://www.npmjs.com/package/canvas-datagrid',
                label: 'npm',
              },
              {
                href: 'https://canvas-datagrid.js.org/',
                label: 'js.org',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Canvas Datagrid`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
