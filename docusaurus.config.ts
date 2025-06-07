import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: '復旦程式設計班',
  tagline: '網站 by 14th進階教學',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://Fudan-Computer-Science.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/homepage/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Fudan-Computer-Science', // Usually your GitHub org/user name.
  projectName: 'homepage', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-TW',     
    // 預設語系
    locales: ['zh-TW'],   
    // 語系配置
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Fudan-Computer-Science/homepage/blob/main/docusaurus.config.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Fudan-Computer-Science/homepage/tree/main/blog',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'FDCS復旦程式設計班',
      logo: {
        alt: 'FDCS Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'introSidebar',
          position: 'left',
          label: '介紹',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '講義',
        },
        {to: '/blog', label: '部落格', position: 'left'},
        {
          href: 'https://github.com/Fudan-Computer-Science/homepage/tree/main/blog',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '資源',
          items: [
            {
              label: '講義',
              to: '/docs/category/入班考講義',
            },
          ],
        },
        {
          title: '社群',
          items: [
            {
              label: 'github',
              href: 'https://github.com/Fudan-Computer-Science',
            },
            {
              label: '十四屆IG',
              href: 'https://www.instagram.com/fdcs_114/',
            },
            {
              label: 'Facebook 粉專',
              href: 'https://www.facebook.com/FDHSCoder/?locale=zh_TW',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: '部落格',
              to: '/blog',
            },
            {
              label: '網站GitHub連結',
              href: 'https://github.com/Fudan-Computer-Science/homepage/tree/main/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 復旦程式設計班, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
