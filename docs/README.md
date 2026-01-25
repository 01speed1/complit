# Documentation

Dual-purpose documentation files: visual diagrams for humans + structured data for Claude.

## Files

| File | Format | Purpose |
|------|--------|---------|
| `db.dbml` | DBML | Database schema |
| `api.yaml` | OpenAPI 3.1 | API specification |
| `architecture.mmd` | Mermaid | System architecture |
| `flow-auth.mmd` | Mermaid | OAuth authentication flow |
| `flow-route-guard.mmd` | Mermaid | Route protection flow |
| `flow-goals.mmd` | Mermaid | Goal CRUD flow |
| `flow-evidence.mmd` | Mermaid | Evidence tracking flow |
| `flow-api-sequence.mmd` | Mermaid | API request sequence |

## Viewing

### DBML
- Use extension or paste in [dbdiagram.io](https://dbdiagram.io)
- Generate SQL: `dbml2sql docs/db.dbml`

### Mermaid
- Preview with extension (Ctrl+Shift+V)
- Or paste in [mermaid.live](https://mermaid.live)

### OpenAPI
- Preview with extension
- Or import in [Swagger Editor](https://editor.swagger.io)

## Keeping in Sync

When making changes:
1. Update code
2. Update corresponding doc file
3. Claude can read these files to understand current state
