import express from 'express';
import cors from 'cors';

const app = express();

// add middleware
app.use(cors());
app.use(express.json())


app.get("/api/events", (req, res)=>{
    res.json({ok: true});
})

export default app;