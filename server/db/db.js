import {Pool} from 'pg';
import dotenv from 'dotenv';

const env = process.env.ENV || "development";

dotenv.config({path: env == "test" ? ".env.test" : ".env"})

// if (!process.env.DATABASE_URL) {
//   throw new Error("Missing DATABASE_URL in .env");
// }
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export default pool;