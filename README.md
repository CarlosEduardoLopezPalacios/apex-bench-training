# APEX Bench Training

Personal repository to track progress during bench periods and practice with real projects across different technologies.

## Objective

This repo works as a **continuous training workspace** where I will add multiple applications and exercises, for example:

- Frontend with React
- Backend with Java (Spring Boot)
- Containerization with Docker
- Integrations and end-to-end testing

The goal is to keep clear evidence of learning, technical decisions, and results for each initiative.

## Scope

This repository can include:

- Practice mini apps
- PoCs (proof of concept)
- Technical challenges
- Full stack projects (FE + BE + infrastructure)
- Architecture notes and lessons learned

## Suggested structure

As the repository grows, it is recommended to organize it like this:

```text
apex-bench-training/
├── apps/
│   ├── react-<nombre-app>/
│   ├── java-<nombre-app>/
│   └── fullstack-<nombre-app>/
├── shared/
│   ├── docs/
│   ├── scripts/
│   └── templates/
└── README.md
```

> Note: This structure is flexible and can be adjusted based on the type of project.

## Expected stack

- React / TypeScript
- Java / Spring Boot
- Docker / Docker Compose
- Testing (unit and integration)
- CI/CD (when applicable)

## How to use this repository

1. Create one folder per project inside `apps/`.
2. Add a dedicated `README.md` for each project with:
   - Objective
   - Technologies
   - Run instructions
   - Current status
3. Log important milestones in the progress section (below).
4. Keep commits small and descriptive.

## Progress log

Use this table to keep general progress tracking:

| Date | Project | Type (FE/BE/FS) | Stack | Status | Notes |
|------|----------|-----------------|-------|--------|-------|
| 2026-07-01 | Repository initialization | N/A | Markdown | In progress | Base README created |

## Quick project template

You can copy this template for each new project:

```md
# <project-name>

## Objective
Brief description of the problem or feature to build.

## Stack
- React / Java / Docker / etc.

## Run local
- Steps to install and run.

## Status
- [ ] Initial setup
- [ ] Main feature
- [ ] Testing
- [ ] Dockerization

## Learnings
- Point 1
- Point 2
```

## Recommended conventions

- Use kebab-case for folder names.
- Document environment variables in `.env.example`.
- Include build/run/test commands in each app README.
- Add screenshots or diagrams when they help provide context.

## Next steps

- Create the `apps/` folder.
- Start the first project (for example: `react-dashboard-training`).
- Define a weekly routine for progress tracking.
