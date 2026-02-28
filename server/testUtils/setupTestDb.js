import fs from "fs";
import path from "path";
import pool from "../db/db.js";

export const resetTestDb = async() => {
    const schemaSQL = fs.readFileSync(path.resolve("db/schema.sql"), "utf8");
    const seedSQL = fs.readFileSync(path.resolve("db/seed.sql"), "utf8");
    
    await pool.query(schemaSQL);
    await pool.query(seedSQL);
}

