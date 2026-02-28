// event service to handle event related logic, such as creating, deleting, updating events, searching events, etc. 
// This is where you would interact with the database to perform CRUD operations on events.
// import * as sql_queries from "../utils/sql_helper.js";
import pool from "../db/db.js";

const getAllEvents = async () => {
    const result = await pool.query(`
    SELECT e.id, e.name, e.event_date_time,  e.location, e.category, e.description
    FROM eventsdb.events e
    `);
    return result.rows;
}
const getAllCategories = async () => {
    const result = await pool.query(`
    SELECT id, name
    FROM eventsdb.categories;
    `);
    return result.rows;
}

const getEventByCategory = async (categoryName) => {
    const result = await pool.query(`
    SELECT id, name
    FROM eventsdb.categories;
    `, [categoryName]);
    return result.rows;
}

const getEventByDate = async (dateStr) => {
    const result = await pool.query(`
    SELECT e.id, e.name, e.event_date_time, e.location, e.description, ec.name AS category_name
    FROM eventsdb.events AS e
    LEFT JOIN eventsdb.events_categories AS ec ON e.id = ec.event_id
    WHERE DATE(e.event_date_time) = $1;
    `,[dateStr]);
    return result.rows;
}

const addEvent = async ({ name, event_date_time, location, category, description}) => {
    const result = await pool.query( `
    INSERT INTO eventsdb.events (name, event_date_time, location, category ,description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `, [name, event_date_time, location, category, description]);
        
    return result.rows;
}

const updateEvent = async ({ id, name, event_date_time, location, category, description}) => {

    const updatedRes = await pool.query(`
    UPDATE eventsdb.events
    SET name = $2, event_date_time = $3, location = $4, category = $5, description = $6
    WHERE id = $1
    RETURNING *;
`, 
        [id, name, event_date_time, location, category, description ]);
    if (updatedRes.rows.length === 0) return null;
    
    return updatedRes.rows[0];
}

const deleteEvent = async (id) => {
    const res = await pool.query(`
    DELETE FROM eventsdb.events
    WHERE id = $1
    RETURNING *;
    `, [id]);
    return res.rows;
}

const searchEvents = async (queryText, category) => {
    const keyword = queryText ? `%${queryText}%` : null;
    const cat = category && category !== "All" ? category : null;
    const res = await pool.query(`
    SELECT id, name, event_date_time, location, category, description
    FROM eventsdb.events
    WHERE ($1::text IS NULL OR name ILIKE $1 OR location ILIKE $1 OR description ILIKE $1 OR CAST(event_date_time AS TEXT) LIKE $1)
    AND ($2::text IS NULL OR category = $2)
    ` , [keyword, cat]);
    return res.rows;
}

export default {
    getAllEvents, 
    getAllCategories,
    getEventByCategory,
    getEventByDate,
    addEvent,
    updateEvent,
    deleteEvent,
    searchEvents
}