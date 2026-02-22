import express from 'express';
import cors from 'cors';
import userService from './services/userService.js';
import eventService from './services/eventService.js';

const app = express();

// add middleware
app.use(cors());
app.use(express.json())


app.get("/api/users", async (req, res)=>{
    try{
        const result = await userService.getAllUsers();
        console.log(`the users are : \n ${result}`)
        res.json(result);
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

app.delete("/api/events/:id", async (req, res) => {
    const deleteId = Number(req.params.id);
    console.log(`the id to be deleted ${deleteId}`);

    try{
        const result = await eventService.deleteEvent(deleteId);
        console.log(`the events are : \n ${result}`)
        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delte events." });

    }
})

app.post("/api/events", async (req, res) => {
    const eventData = req.body;
    const {name, event_date_time, location,category, description} = req.body;

    try{
        const result = await eventService.addEvent( {name, event_date_time, location, description, category});
        console.log(`the events are : \n ${result}`)
        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delte events." });

    }
})

app.put("/api/events/:id", async (req, res) => {
    const eventData = req.body;
    const {id, name, event_date_time, location, category, description} = req.body;

    try{
        const result = await eventService.updateEvent({id, name, event_date_time, location, description, category});
        
        if (!result) {
            return res.status(404).json({ error: "Event not found" });
        }
        console.log(`the events are : \n ${result}`);

        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delte events." });

    }
})


// Get user favoritates event id

app.get("/api/users/:userId/favorites", async (req, res) => {
    const userId = Number(req.params.userId);
    console.log(`the id to be deleted ${userId}`);
    try {
        const result = await userService.getUserFavorites(userId);
        if (!result) {
            return res.status(404).json({ error: "Favorite events not found" });
        }
        console.log(`the events are : \n ${result}`);

        res.json(result);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delte events." });

    }
})


app.post("/api/users/:userId/favorites", async (req, res) => {
    const userId = Number(req.params.userId);
    const {user_id, event_id } = req.body;

    console.log(`the users are to be deleted,`, user_id);
    console.log(`the users add into favoriate list`, event_id )
    try {
        const result = await userService.addUserFavorites(user_id, event_id);
        if (!result) {
            return res.status(404).json({ error: "add to favorite not found" });
        }
        console.log(`the events are : \n ${result}`);

        res.json(result);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add favorite events." });

    }
})

export default app;