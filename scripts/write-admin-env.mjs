import { writeFileSync } from "node:fs"

const generatedAdminEnv = {
  user: process.env.ADMIN_USER || "",
  password: process.env.ADMIN_PASSWORD || "",
  secret: process.env.ADMIN_SESSION_SECRET || "",
}

writeFileSync(
  "lib/admin-env.generated.ts",
  `// Generated during the Amplify build. Do not commit real values.\nexport const generatedAdminEnv = ${JSON.stringify(generatedAdminEnv, null, 2)}\n`,
)

const lines = ["ADMIN_USER", "ADMIN_PASSWORD", "ADMIN_SESSION_SECRET", "RESEND_API_KEY", "RESEND_FROM_EMAIL", "RESEND_TO_EMAIL"]
  .filter((key) => process.env[key])
  .map((key) => `${key}=${JSON.stringify(process.env[key])}`)
if (lines.length) writeFileSync(".env.production", `${lines.join("\n")}\n`)

console.log(`admin env: user ${generatedAdminEnv.user ? "set" : "missing"}, secret ${generatedAdminEnv.secret ? "set" : "missing"}`)
