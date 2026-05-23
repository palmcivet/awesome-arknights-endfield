---
name: add-project
description: Add a new project to the awesome list from a GitHub repository URL
argument-hint: <github-repo-url>
---

Add a new project entry to `data/LIST.json` from the given GitHub repository URL: $ARGUMENTS

Follow these steps:

1. **Fetch project info**: Use WebFetch to visit the GitHub repository URL and extract:
   - Project description (write concise en-US and zh-CN descriptions)
   - Author/owner info: Determine whether the repository owner (the first part of `owner/repo` in the URL) is a **GitHub organization** or a **personal account**. If it is an organization, use the organization name and URL as the author. Only use an individual's name if the owner is a personal account.
   - License (if any)
   - Any website links (homepage, demo, etc.)

2. **Read current list**: Read `data/LIST.json` to determine the next available `id` (last entry's id + 1) and understand the existing format.

3. **Read field definitions**: Read `website/shared/fields.ts` to check valid categories (`CATEGORIES`) and website providers (`WEBSITE_PROVIDERS`).

4. **Choose category and tags**: Select the most appropriate category and tags based on the project's purpose. Refer to existing entries for tag conventions.

5. **Add entry**: Append the new project entry to `data/LIST.json` before the closing `]`. Follow the `ProjectProps & ProjectMeta` interface from `website/shared/project.ts`:
   - `name`: Use `author/repo` format
   - `description`: Object with `en-US` and `zh-CN` keys
   - `repository`: The GitHub URL
   - `website`: Array of `{ provider, url }` objects (only if applicable)
   - `author`: Object with `name` and `url`. Use the repository owner (organization or user) from the GitHub URL, not an individual contributor mentioned in the README
   - `category`: One of the valid categories
   - `tags`: Array of relevant tags
   - `id`: Next sequential id
   - `addedAt`: Today's date in `YYYY-MM-DD` format
   - `openSource`: `true` if repository field is present
   - `license`: Include only if a license is detected

6. **Run validation and generation**: Execute the following commands sequentially in the `website` directory using bun:
   ```
   bun run check:list && bun run format:list && bun run generate:list
   ```

7. **Report result**: Show the added entry name, id, category, and whether all checks passed.
