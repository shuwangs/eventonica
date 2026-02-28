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
        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch events." });

    }
})

app.delete("/api/events/:id", async (req, res) => {
    const deleteId = Number(req.params.id);

    try{
        const result = await eventService.deleteEvent(deleteId);
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
        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create events." });

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

        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delte events." });

    }
})


// Get user favoritates event id

app.get("/api/users/:userId/favorites", async (req, res) => {
    const userId = Number(req.params.userId);
    try {
        const result = await userService.getUserFavorites(userId);
        if (!result) {
            return res.status(404).json({ error: "Favorite events not found" });
        }

        res.json(result);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delte events." });

    }
})


app.post("/api/users/:user_id/favorites", async (req, res) => {
    const {user_id, event_id } = req.body;

    try {
        const result = await userService.addUserFavorites(user_id, event_id);
        if (!result) {
            return res.status(404).json({ error: "add to favorite not found" });
        }

        res.json(result);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add favorite events." });

    }
})


app.delete("/api/users/:user_id/favorites/:event_id", async (req, res) => {
    const {user_id, event_id} = req.params;

    try {
        const result = await userService.deleteUserFavorites(user_id, event_id);
        res.json(result);

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete user favorite event." });

    }
})

app.get('/api/categories', async (req, res) => {
    try {
        const result = await eventService.getAllCategories();
        res.json(result);
    }catch(err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get event categories." });
    }
})

app.get('/api/events/search', async (req, res) => {
    const queryText = (req.query.q || "").toString().trim();
    const category = (req.query.category || "All").toString().trim();
    try {
        const events = await eventService.searchEvents(queryText, category);
        res.json(events);
    } catch (err) {
        console.error("Search events failed:", err);
        res.status(500).json({ error: "Failed to search events" });
    }
})
export default app;