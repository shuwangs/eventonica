// event service to handle event related logic, such as creating, deleting, updating events, searching events, etc. 
// This is where you would interact with the database to perform CRUD operations on events.
import * as sql_queries from "../utils/sql_helper.js";
import pool from "../db/db.js";

const getAllEvents = async () => {
    const result = await pool.query(sql_queries.GET_ALL_EVENTS);
    
    // console.log(result.rows);
    return result.rows;
}
const getAllCategories = async () => {
    const result = await pool.query(sql_queries.GET_ALL_CATEGORY);
    console.log(result.rows);
    return result.rows;
}

const getEventByCategory = async (categoryName) => {
    const result = await pool.query(sql_queries.GET_EVENTS_BY_CATEGORY, [categoryName]);
    return result.rows;
}

const getEventByDate = async (dateStr) => {
    const result = await pool.query(sql_queries.GET_EVENTS_BY_DATE,[dateStr]);
    return result.rows;
}

const addEvent = async ({ name, event_date_time, location, category, description}) => {
    const result = await pool.query(sql_queries.ADD_INTO_EVENTS, [name, event_date_time, location, category, description]);
        
    return result.rows;
}

const updateEvent = async ({ id, name, event_date_time, location, category, description}) => {

    const updatedRes = await pool.query(sql_queries.UPDATE_EVENT, 
        [id, name, event_date_time, location, category, description ]);
    if (updatedRes.rows.length === 0) return null;
    
    return updatedRes.rows[0];
}

// TODO: delete event;
const deleteEvent = async (id) => {
    const res = await pool.query(sql_queries.DELETE_EVENT, [id]);
    return res.rows;
}

export default {
    getAllEvents, 
    getAllCategories,
    getEventByCategory,
    getEventByDate,
    addEvent,
    updateEvent,
    deleteEvent
}