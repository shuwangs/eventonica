// add delete user, update user, get user by id, etc. functions here
import * as sql_queries from "../utils/sql_queries.js";
import pool from "../db/db.js";

const getAllUsers = async () => {
    const result = await pool.query(sql.GET_ALL_USERS);
    return result.rows;
};