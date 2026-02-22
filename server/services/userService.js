// add delete user, update user, get user by id, etc. functions here
import * as sql_queries from "../utils/sql_helper.js";
import pool from "../db/db.js";

const getAllUsers = async () => {
    const result = await pool.query(sql_queries.GET_ALL_USERS);
    console.log(`Users are ${result}`)
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

const getUserFavorites = async(id) => {
    const result = await pool.query(sql_queries.GET_USER_FAVORITES, [id])
    return result.rows;
}

const addUserFavorites = async(user_id, event_id) => {
    const result = await pool.query(sql_queries.ADD_USER_FAVORITE, [user_id, event_id])
    return result.rows;
}

export default {
    getAllUsers,
    addUser,
    deleteUser,
    getUserFavorites,
    addUserFavorites
};