import express from 'express';
import cors from 'cors';
import userService from './services/userService.js';
import eventService from './services/eventService.js';
import pool from './db/db.js';


const app = express();

// add middleware
app.use(cors());
app.use(express.json())


app.get("/api/users", async (req, res)=>{
    try{
        const result = await userService.getAllUsers();
        console.log(`the users are : \n ${result}`)

        res.json(result.rows);
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users." });
    }

})


// get all the events;
app.get("/api/events", async (req, res) => {
    try{
        const result = await eventService.getAllEvents();
        console.log(`the events are : \n ${result}`)
        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch events." });

    }
})



export default app;