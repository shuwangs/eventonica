// event service to handle event related logic, such as creating, deleting, updating events, searching events, etc. 
// This is where you would interact with the database to perform CRUD operations on events.
import * as sql_queries from "../utils/sql_queries.js";
import pool from "../db/db.js";

const getAllEvents = async () => {
    const result = await pool.query(sql_queries.GET_ALL_EVENTS);
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

const addEvent = async ({ name, event_date_time, location, description, categoryName}) => {
    const client = await pool.connect();
    try{
        await client.query("BEGIN");

        const eventRes = await client.query(sql_queries.ADD_INTO_EVENTS, [name, event_date_time, location, description])
        const cateRes = await client.query(sql_queries.ADD_TO_CATEGORIES, [categoryName]);
        const eventCatRes = await client.query(sql_queries.ADD_EVENT_CATEGORY, [name, categoryName]);
        
        await pool.query("COMMIT");
    }catch(err) {
        console.log(err);
        await client.query("ROLLBACK");
    } finally{
        client.release();
    }
    
    return null;
}

const updateEvent = async ({ id, name, event_date_time, location, description, categoryName}) => {
    const client = await pool.connect();

    try{
        await client.query("BEGIN");
        
        const updatedRes = await client.query(sql_queries.UPDATE_EVENT, 
            [name, event_date_time, location, description ]);

        await client.query(q.ADD_EVENT_CATEGORY, [id, categoryId]);

        await client.query("COMMIT");

        return finalRes.rows[0];
    } catch(err) {
        console.log(err);
        await client.query("ROLLBACK");
    } finally {
        client.release();
    }


}

