# Migration Checklist: web_old → apps/web

Migration from Remix (web_old) to TanStack Router (apps/web).

---

## Routes

| Status | web_old | apps/web | Notes |
|--------|---------|----------|-------|
| [x] | `routes/_index.tsx` | `routes/index.tsx` | Landing page |
| [x] | `routes/login.tsx` | `routes/login/index.tsx` | Already migrated with improvements |
| [ ] | `routes/logout.tsx` | `routes/logout/index.tsx` | Verify session cleanup |
| [ ] | `routes/auth.callback.tsx` | TBD | Google OAuth callback |
| [x] | `routes/me.tsx` | `routes/_auth/dashboard.tsx` | Adapted to Goals model |
| [x] | `routes/projects.new.tsx` | `routes/_auth/goals.new.tsx` | Adapted to Goal model with all fields |
| [ ] | `routes/projects.$id.tsx` | TBD | Project/goal detail |
| [ ] | `routes/projects.$id.change-working.tsx` | TBD | Change project status |
| [ ] | `routes/tasks.new.tsx` | TBD | Create new task/milestone |
| [ ] | `routes/test.tsx` | - | Skip (dev only) |

## Components

| Status | web_old | apps/web | Notes |
|--------|---------|----------|-------|
| [ ] | `components/CardContainer.tsx` | TBD | Reusable card wrapper |
| [ ] | `components/StatusBadge.tsx` | TBD | Status indicator |
| [ ] | `routes/projects/ProjectCard.tsx` | TBD | Project card in list |

## Layout

| Status | web_old | apps/web | Notes |
|--------|---------|----------|-------|
| [ ] | `layout/MainNavBar.tsx` | TBD | Main navigation bar |

## Icons

| Status | web_old | apps/web | Notes |
|--------|---------|----------|-------|
| [ ] | `icons/BaseIcon.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/BookMarkStart.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/Calendar.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/Check.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/Completed.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/Delete.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/Flag.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/Pending.tsx` | - | Evaluate: replace with lucide-react |
| [ ] | `icons/Working.tsx` | - | Evaluate: replace with lucide-react |

## Services

| Status | web_old | apps/web | Notes |
|--------|---------|----------|-------|
| [ ] | `services/apiClient.ts` | TBD | HTTP client setup |
| [ ] | `services/auth/` | TBD | Auth service layer |
| [ ] | `services/completions/` | TBD | Completions service |
| [ ] | `services/projects/` | TBD | Projects CRUD |
| [ ] | `services/tasks/` | TBD | Tasks/milestones CRUD |
| [ ] | `services/users/` | TBD | Users service |

## Other Files

| Status | web_old | apps/web | Notes |
|--------|---------|----------|-------|
| [x] | `tailwind.css` | `src/styles.css` | Tailwind v4 format |
| [ ] | `root.tsx` | `routes/__root.tsx` | Verify layout/providers match |
| [ ] | `constants.tsx` | TBD | App constants |
| [ ] | `entry.client.tsx` | - | Not needed in TanStack |
| [ ] | `entry.server.tsx` | - | Not needed in TanStack |

---

## Workflow

1. Pick next unchecked item
2. Read the web_old source
3. Adapt to TanStack Router / React patterns
4. Test in apps/web
5. Mark as [x] in this checklist
6. Delete the file from web_old
