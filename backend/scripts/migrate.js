require("dotenv").config();

const path = require("path");
const { runner } = require("node-pg-migrate");

// "up" applies migrations || "down" rolls back the latest migration
const direction = process.argv[2] || "up";
const allowedDirections = new Set(["up", "down"]);

if (!allowedDirections.has(direction)) {
  console.error(`Unknown migration direction: ${direction}`);
  console.error("Use either: up, down");
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URI;

if (!databaseUrl) {
  console.error(
    "Missing database URL. Set POSTGRES_URI or DATABASE_URL in your environment.",
  );
  process.exit(1);
}

// Executes migrations and tracks progress in database
runner({
  databaseUrl,
  dir: path.join(__dirname, "..", "migrations"),
  direction,
  migrationsTable: "pgmigrations", // Internal table to track wwhich migrations have already been ran
  count: direction === "down" ? 1 : undefined, // Roll back 1 migration only
  log: console.log,
})
  .then(() => {
    console.log(`Migrations ${direction} completed.`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
