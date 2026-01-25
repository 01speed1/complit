import { existsSync, readFileSync, unlinkSync } from "node:fs"

const PENDING_FILE = ".claude/pending-doc-updates.json"

function showReminder() {
  if (!existsSync(PENDING_FILE)) {
    return
  }

  try {
    const pending = JSON.parse(readFileSync(PENDING_FILE, "utf-8"))

    if (pending.length === 0) {
      unlinkSync(PENDING_FILE)
      return
    }

    const docSet = new Set()
    pending.forEach(item => {
      item.docs.forEach(doc => docSet.add(doc))
    })

    console.log("\n" + "=".repeat(60))
    console.log("📝 DOCUMENTATION SYNC REMINDER")
    console.log("=".repeat(60))
    console.log("\nThe following docs may need updates based on code changes:\n")

    docSet.forEach(doc => {
      console.log(`  • ${doc}`)
    })

    console.log("\nTriggers:")
    pending.forEach(item => {
      console.log(`  - ${item.trigger} (${item.type})`)
    })

    console.log("\n" + "=".repeat(60))
    console.log("Run: claude 'Review and update documentation in docs/ based on recent code changes'")
    console.log("=".repeat(60) + "\n")

    unlinkSync(PENDING_FILE)
  } catch (err) {
    // Ignore errors
  }
}

showReminder()
