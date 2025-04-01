import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Connection string to the database
const connectionString = process.env.DATABASE_URL;

// For migrations
export const migrationClient = postgres(connectionString, { max: 1 });

// For queries
export const queryClient = postgres(connectionString);

// Create the database instance
export const db = drizzle(queryClient, { schema });

// Run migrations
export async function runMigrations() {
  try {
    console.log("Running migrations...");
    
    // Create a separate client for migrations
    const migrationDB = drizzle(migrationClient);
    
    await migrate(migrationDB, { migrationsFolder: "./migrations" });
    
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error running migrations:", error);
    throw error;
  }
}