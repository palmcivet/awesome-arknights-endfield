<h2>Contributing</h2>

English | [简体中文](./CONTRIBUTING.zh-CN.md)

- [Welcome Contributions](#welcome-contributions)
- [Submitting Resources](#submitting-resources)
  - [Option A: Pull Request](#option-a-pull-request)
  - [Option B: Issue](#option-b-issue)
- [Reporting Issues](#reporting-issues)
- [Writing Guidelines](#writing-guidelines)
  - [JSON Format Guidelines](#json-format-guidelines)

## Welcome Contributions

Thank you for your interest in this project. Contributions of all kinds are welcome, including identifying issues, recommending new resources, and proposing improvements. This guide explains how to participate in the project in the most effective way.

We appreciate your attention and support. Whether you are adding high-quality resources, correcting existing content, or suggesting enhancements, your contributions are highly valued. This document outlines the recommended contribution methods and basic conventions to ensure an efficient and smooth workflow.

## Submitting Resources

If you discover high-quality related resources (such as tutorials, tools, or communities), you are welcome to recommend them for inclusion.

### Option A: Pull Request

1. Fork this repository.
2. Create a new branch based on the latest `main` branch, for example: `git checkout -b docs/new-entry`.
3. Edit `data/LIST.json` and add a new entry following the existing structure and field conventions.
4. Submit a [Pull Request](https://github.com/palmcivet/awesome-arknights-endfield/pulls), and briefly describe the purpose and key features of the resource in the PR description.

### Option B: Issue

If you are not familiar with the Pull Request workflow, you may recommend a resource by creating an Issue: [Create an Issue](https://github.com/palmcivet/awesome-arknights-endfield/issues/new).

Please include the following information in the Issue:

- Resource name
- Resource URL
- Description of the resource and applicable use cases (if available)

After evaluation, we will assist with adding the resource to the list.

## Reporting Issues

If you identify any issues in the project, feedback is welcome, including but not limited to:

- **Translation issues**: inaccurate translations, unclear wording, or grammatical errors
- **Content issues**: broken links, outdated information, or inaccurate descriptions
- **Formatting issues**: inconsistent layout, or incorrect link or code block formatting

You may either create an Issue or submit a Pull Request with the relevant changes. Please provide clear and specific details to help us locate and address the problem efficiently.

## Writing Guidelines

### JSON Format Guidelines

Each entry in [`data/LIST.json`](./data/LIST.json) must follow a unified data structure. The fields are defined as follows; some fields are optional:

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
````
