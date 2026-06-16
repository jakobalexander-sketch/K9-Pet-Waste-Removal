import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Fall back to a placeholder so `prisma generate` succeeds during CI/build
    // without DATABASE_URL set. The real URL must be present at runtime.
    url: process.env["DATABASE_URL"] ?? "file:./prisma/dev.db",
  },
});
