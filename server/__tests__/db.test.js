import pool from "../db/db.js"

// const test = async () => {
//   try {
//     const res = await pool.query("SELECT NOW()");
//     console.log("DB Connected:", res.rows[0]);
//   } catch (err) {
//     console.error("DB Error:", err);
//   } finally {
//     await pool.end();
//   }
// };

// test();