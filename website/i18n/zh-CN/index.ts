import type { Translation } from '../i18n-types.js';

const zh_CN = {
  nav: {
    github: 'GitHub',
  },

  hero: {
    label: '社区资源',
    projectCount: '{count} 个项目',
    titleLine1: 'Awesome',
    titleLine2: 'Arknights Endfield',
    description: '一个由社区维护的《明日方舟：终末地》工具、资源与社区项目的精选合集。',
    explore: '探索',
    github: 'GitHub',
  },

  search: {
    placeholder: '搜索项目',
    category: '分类',
  },

  sidebar: {
    clear: '清除',
  },

  projectCard: {},

  drawer: {
    close: '关闭',
    index: '序号',
    author: '作者',
    added: '收录时间',
    license: '许可证',
    source: '开源状态',
    repository: '仓库',
    links: '链接',
    openSource: '开源',
    closedSource: '闭源',
    noScreenshots: '暂无截图',
  },

  gallery: {
    noResults: '未找到项目。',
    noResultsHint: '请尝试调整搜索条件或筛选器。',
  },

  footer: {
    contribute: '贡献',
    awesomeArknights: 'Awesome Arknights',
  },

  language: {
    label: '语言',
  },

  theme: {
    switchToDark: '切换到深色模式',
    switchToLight: '切换到浅色模式',
    dark: '深色',
    light: '浅色',
  },
} satisfies Translation;

export default zh_CN;
