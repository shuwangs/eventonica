// add delete user, update user, get user by id, etc. functions here
import * as sql_queries from "../utils/sql_helper.js";
import pool from "../db/db.js";

const getAllUsers = async () => {
    const result = await pool.query(sql_queries.GET_ALL_USERS);
    return result.rows;
};

const addUser = async (name, email) => {
    const result = await pool.query(sql_queries.ADD_USER, [name, email]);
    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await pool.query(sql_queries.DELETE_USER, [id]);
    return result.rows[0];
};

export default {
    getAllUsers,
    addUser,
    deleteUser
};