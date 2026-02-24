<h2>Code of conduct</h2>

English | [简体中文](.github/CODE_OF_CONDUCT.zh-CN.md)

- [Categories](#categories)
- [Tags](#tags)
  - [Functional Tags (what the project does)](#functional-tags-what-the-project-does)
  - [Domain Tags (which game system it involves)](#domain-tags-which-game-system-it-involves)
  - [Form Tags (what form the project takes)](#form-tags-what-form-the-project-takes)
  - [Tag Guidelines](#tag-guidelines)

This document defines the classification system for [`data/LIST.json`](data/LIST.json). Categories are designed to be **orthogonal** — each project should belong to exactly one category with no ambiguity.

## Categories

Each project must be assigned to exactly **one** of the following categories:

| Category                 | Description                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Production & Factory** | Tools related to factory production, recipe management, resource optimization, and AIC blueprints.                       |
| **Maps & Guides**        | Interactive maps, battle guides, puzzle solvers, event calendars, and other game-content-oriented resources.             |
| **Gacha**                | Tools for gacha/headhunting record tracking, probability calculation, and strategy simulation.                           |
| **Game Utilities**       | Game-peripheral utilities that don't fit above categories: automation scripts, launchers, API archives, UID lookup, etc. |
| **Themes & Design**      | Blog themes, presentation themes, icon sets, and other visual/design resources inspired by Arknights: Endfield.          |
| **Fan Creations**        | Fan-made creative projects and Endfield-themed non-game applications (e.g. themed productivity apps, portfolio sites).   |
| **Uncategorized**        | Reserved for special entries only. Do not use for regular submissions.                                                   |

## Tags

Tags are **multi-select** and describe specific characteristics of a project. They fall into three dimensions:

### Functional Tags (what the project does)

| Tag          | Description                                  |
| ------------ | -------------------------------------------- |
| `Calculator` | Provides numerical calculation functionality |
| `Planner`    | Helps plan or optimize resource allocation   |
| `Tracker`    | Records or tracks history data               |
| `Simulator`  | Simulates game mechanics or outcomes         |
| `Map`        | Provides interactive map functionality       |
| `Automation` | Automates game operations                    |
| `Archive`    | Archives or monitors data/APIs               |

### Domain Tags (which game system it involves)

| Tag       | Description                          |
| --------- | ------------------------------------ |
| `Gacha`   | Related to gacha/headhunting system  |
| `Factory` | Related to factory/production system |
| `Battle`  | Related to combat system             |
| `Puzzle`  | Related to in-game puzzles           |
| `Essence` | Related to essence/weapon system     |

### Form Tags (what form the project takes)

| Tag                  | Description                           |
| -------------------- | ------------------------------------- |
| `Blog Theme`         | A blog theme or template              |
| `Presentation Theme` | A presentation/slides theme           |
| `Icon Set`           | A collection of icons                 |
| `Launcher`           | A game launcher or launcher plugin    |
| `Desktop App`        | A desktop application (e.g. Electron) |
| `Script`             | A standalone script or CLI tool       |

### Tag Guidelines

- Use **1-3 tags** per project. Avoid over-tagging.
- Do **not** create tags like `Endfield-themed` — all projects in this list are Endfield-related by definition.
- Do **not** create single-use tags. If a tag would only apply to one project, consider using an existing tag or omitting it.
- Prefer existing tags over creating new ones. New tags can be added when necessary, or discussed via Issues or PRs.
