# Complit - Project Context

Cross-platform app (web + mobile) for personal goal management with milestones and evidence tracking.

## Entities

### Goals
| Field | Type | Notes |
|-------|------|-------|
| id | string | unique |
| title | string | **required** |
| description | string? | optional detail |
| targetDescription | string? | completion criteria |
| durationInMonths | number? | estimated time |
| priority | low/medium/high | user-defined |
| status | active/completed/paused | |
| order | number | manual sorting |
| createdAt/completedAt | date | |

### Milestones
| Field | Type | Notes |
|-------|------|-------|
| id | string | unique |
| goalId | string | parent goal |
| title | string | **required** |
| description | string? | |
| status | pending/in_progress/completed | |
| order | number | within goal |
| createdAt/completedAt | date | |

### Evidence
| Field | Type | Notes |
|-------|------|-------|
| id | string | unique |
| goalId | string | **required** |
| milestoneId | string? | optional link |
| content | string | what was done |
| createdAt/updatedAt | date | |

## Business Rules

**Goals:**
- Must have title
- User controls status changes freely
- Completed when user decides target is reached

**Milestones:**
- Visual breakdown of goal progress
- Non-linear: no required order
- CRUD + reorder freely

**Evidence:**
- Immutable history (edit allowed, no delete)
- Can be added anytime
- Ordered by createdAt by default

## Key Flows

1. **Create goal** → title required → status: active → add milestones/evidence
2. **Track progress** → view goals by priority → log evidence → mark milestones done
3. **Reorder** → drag-drop or buttons → persist immediately
4. **Complete goal** → user marks done → record completedAt

## Tech Requirements

- Sync frontend ↔ backend
- Persist reordering immediately
- Validate title on goal creation
- Evidence: preserve history via updatedAt
