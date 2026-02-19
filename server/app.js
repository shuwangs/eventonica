import express from 'express';
import cors from 'cors';
import * as sql_queries from "./utils/sql_helper.js";
import pool from './db/db.js';

const app = express();

// add middleware
app.use(cors());
app.use(express.json())


app.get("/api/users", async (req, res)=>{
    const result = await pool.query(sql_queries.GET_ALL_USERS);
    // console.log(result);
    res.json(result.rows);
})




export default app;