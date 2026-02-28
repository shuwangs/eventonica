// add delete user, update user, get user by id, etc. functions here
// import * as sql_queries from "../utils/sql_helper.js";
import pool from "../db/db.js";

const getAllUsers = async () => {
    const result = await pool.query(`
    SELECT id, name, email, is_manager
    FROM eventsdb.users
    `);
    return result.rows;
};

const addUser = async (name, email) => {
    const result = await pool.query(`
    INSERT INTO eventsdb.users (name, email)
    VALUES ($1, $2)
    RETURNING *; `
    , [name, email]);
    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await pool.query(`
    DELETE FROM eventsdb.users
    WHERE id = $1
    RETURNING *;
    `, [id]);
    return result.rows[0];
};

const getUserFavorites = async(id) => {
    const result = await pool.query(`
    SELECT event_id
    FROM eventsdb.user_favorites
    WHERE user_id = $1
    `, [id])
    return result.rows;
}

const addUserFavorites = async(user_id, event_id) => {
    const result = await pool.query(`
    INSERT INTO eventsdb.user_favorites (user_id, event_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [user_id, event_id])
    return result.rows;
}
const deleteUserFavorites = async(user_id, event_id) => {
    const result = await pool.query(`
    DELETE FROM eventsdb.user_favorites
    WHERE user_id = $1 AND event_id = $2
    RETURNING *;    
    `, [user_id, event_id])
    return result.rows;
}
export default {
    getAllUsers,
    addUser,
    deleteUser,
    getUserFavorites,
    addUserFavorites,
    deleteUserFavorites
};