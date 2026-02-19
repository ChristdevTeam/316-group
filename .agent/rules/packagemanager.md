---
trigger: always_on
---

Always use pnpm for the package manager.
When we need to generate types, pnpm generate:types instead of npm run generate:types
When we need to check TypeScr errors, we do pnpm tsc --noEmit instead of npm commands.
