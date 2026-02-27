import {Pool} from 'pg';
import dotenv from 'dotenv';


const env = process.env.NODE_ENV || "development";

switch(env) {
  case 'development':
    dotenv.config({ path: '.env' });
    break;
  case "test":
    dotenv.config({ path: '.env.test' });
    break;
  default:
    throw new Error(`Unknown environment: ${env}`);
}
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB:", process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export default pool;