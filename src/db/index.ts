import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import path from "path";

// Load environment variables from .env file
const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });

// Get database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Error: DATABASE_URL is not defined in environment variables");
  console.error("Please check your .env file and make sure it contains DATABASE_URL");
  throw new Error("DATABASE_URL is not defined in environment variables");
}

// Initialize the database connection
const sql = neon(databaseUrl);
export const db = drizzle(sql);