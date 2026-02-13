<h2>Contributing</h2>

[English](./CONTRIBUTING.md) | 简体中文

- [欢迎贡献](#欢迎贡献)
- [提交收录](#提交收录)
  - [方式 A：Issue](#方式-aissue)
  - [方式 B：Pull Request](#方式-bpull-request)
    - [一、提交新条目](#一提交新条目)
    - [二、更新文档（可选）](#二更新文档可选)
    - [三、提交 Pull Request](#三提交-pull-request)
- [报告问题](#报告问题)
- [撰写规范](#撰写规范)
  - [JSON 格式规范](#json-格式规范)
  - [中文写作规范](#中文写作规范)

## 欢迎贡献

感谢您对本项目的关注！无论是发现问题、提交新资源，还是改进建议，我们都欢迎您的贡献。本指南将帮助您了解如何以最有效的方式参与项目。

感谢您对本项目的关注与支持。无论是补充优质资源、修正现有内容，还是提出改进建议，我们都欢迎您的贡献。本指南将帮助您了解参与本项目的推荐方式与基本规范，使贡献流程更加高效、顺畅。

## 提交收录

如果您发现了高质量的相关资源（教程、工具、社区等），欢迎推荐收录。

### 方式 A：Issue

如果您不熟悉 Pull Request 流程，可通过创建 Issue 的方式进行推荐：[创建 Issue](https://github.com/palmcivet/awesome-arknights-endfield/issues/new)。

请在 Issue 中提供以下信息：

- 资源名称
- 资源链接
- 资源内容及适用场景（如有）

我们将会在评估后协助完成收录。

### 方式 B：Pull Request

#### 一、提交新条目

1. Fork 本仓库
2. 基于最新的 `main` 分支创建新分支，例如：`git checkout -b docs/new-entry`
3. 编辑 `data/LIST.json`，按照既有结构与字段规范添加新条目

#### 二、更新文档（可选）

为尽可能降低贡献的门槛，本项目不会在 CI 流程自动校验，维护者会不定期更新文档。

如果您熟悉 GitHub 贡献流程，且安装有 [bun](https://bun.sh/) 工具，可在修改之后进行校验和预览。

```bash
cd website
bun install

# 校验
bun check:list

# 格式化
bun format:list

# 生成 LIST 并更新 README
bun generate:list
```

#### 三、提交 Pull Request

按照 [模板](https://github.com/palmcivet/awesome-arknights-endfield/blob/main/.github/PULL_REQUEST_TEMPLATE.md) 填写，并提交 [Pull Request](https://github.com/palmcivet/awesome-arknights-endfield/pulls)

## 报告问题

如您发现项目中存在问题，欢迎反馈，包括但不限于：

- **翻译错误**：翻译不当、表述不清或语法错误
- **内容错误**：资源链接失效、信息过时或描述不准确
- **格式问题**：排版不统一、链接或代码块格式错误

您可以选择创建 Issue，或直接提交 Pull Request 并说明修改内容。请尽量提供清晰、具体的说明，以便快速定位与处理。

## 撰写规范

### JSON 格式规范

[`data/LIST.json`](./data/LIST.json) 中的每个条目需遵循统一的数据结构。字段说明如下，其中部分字段为可选项：

```ts
export interface Project {
  /**
   * @description The name of the project
   */
  name: string;
  /**
   * @description A brief description of the project
   */
  description: Record<Language, string>;
  /**
   * @description The URL of the project's repository
   */
  repository?: string;
  /**
   * @description An array of website URLs related to the project
   */
  website?: Array<WebsiteURL>;
  /**
   * @description The author of the project
   */
  author?: {
    name: string;
    url?: string;
  };
  /**
   * @description The category of the project
   */
  category: string;
  /**
   * @description Tags related to the project
   */
  tags: Array<string>;
  /**
   * @description Related projects in the list
   */
  relatives?: Array<ProjectId>;
  /**
   * @description The license of the project
   */
  license?: string;
  /**
   * @description Screenshots of the project
   */
  screenshots?: Array<string>;
  /**
   * @description The id of the project, auto-generated based on the order of addition
   */
  id: ProjectId;
  /**
   * @description The date when the project was added, in YYYY-MM-DD format
   */
  addedAt: string;
  /**
   * @description Open source or not, based on the presence of `repository` field
   */
  openSource: boolean;
}
```

### 中文写作规范

如果使用中文，建议遵循 [《中文技术文档的写作规范》](https://github.com/ruanyf/document-style-guide)。主要包括术语统一、句式简洁、标点规范及中英文混排规则等。
