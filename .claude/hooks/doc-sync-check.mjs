import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"

const PENDING_FILE = ".claude/pending-doc-updates.json"

const DOC_MAPPINGS = {
  "apps/api/src/routes/": {
    docs: ["docs/api.yaml"],
    type: "api"
  },
  "apps/api/src/server.ts": {
    docs: ["docs/architecture.mmd"],
    type: "server"
  },
  "apps/web/src/routes/": {
    docs: ["docs/flow-route-guard.mmd", "docs/flow-auth.mmd"],
    type: "routes"
  },
  "apps/web/src/main.tsx": {
    docs: ["docs/architecture.mmd"],
    type: "app-entry"
  },
  "prisma/schema.prisma": {
    docs: ["docs/db.dbml"],
    type: "database"
  },
  "drizzle/": {
    docs: ["docs/db.dbml"],
    type: "database"
  }
}

function detectDocUpdates(filePath) {
  const updates = []

  for (const [pattern, config] of Object.entries(DOC_MAPPINGS)) {
    if (filePath.includes(pattern)) {
      updates.push({
        trigger: filePath,
        docs: config.docs,
        type: config.type,
        timestamp: new Date().toISOString()
      })
    }
  }

  return updates
}

function savePendingUpdates(updates) {
  if (updates.length === 0) return

  const dir = dirname(PENDING_FILE)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  let existing = []
  if (existsSync(PENDING_FILE)) {
    try {
      existing = JSON.parse(readFileSync(PENDING_FILE, "utf-8"))
    } catch {
      existing = []
    }
  }

  const merged = [...existing, ...updates]
  const unique = merged.filter((item, index, self) =>
    index === self.findIndex(t =>
      t.trigger === item.trigger &&
      JSON.stringify(t.docs) === JSON.stringify(item.docs)
    )
  )

  writeFileSync(PENDING_FILE, JSON.stringify(unique, null, 2))
}

const toolInput = process.argv[2]
if (toolInput) {
  try {
    const parsed = JSON.parse(toolInput)
    const filePath = parsed.file_path || parsed.path || ""

    if (filePath && !filePath.includes("/docs/")) {
      const updates = detectDocUpdates(filePath)
      if (updates.length > 0) {
        savePendingUpdates(updates)
        console.log(`[doc-sync] Detected changes requiring doc updates: ${updates.map(u => u.docs.join(", ")).join("; ")}`)
      }
    }
  } catch {
    // Ignore parse errors
  }
}
