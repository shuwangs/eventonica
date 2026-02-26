import app from "../app.js";
import request from 'supertest';
// Maybe should mock a db

describe('Endpoint Tests', () => {
    // Events related endpoinst
 
    it('should return 200 for GET /api/events', async () => {
        const res = await request(app).get('/api/events');
        expect(res.statusCode).toEqual(200);
    });

    it('should return 200 for POST /api/events', async () => {
        const mockEvent = {
            name: 'Test Event',
            event_date_time:"2023-12-31T00:00:00.000Z",
            location: 'Test Location',
            category: 'Test Category',
            description: 'This is a test event'
        }
        const res = await request(app)
            .post('/api/events')
            .set('Content-Type', "application/json")
            .send(mockEvent);

        if (res.statusCode !== 200) {
            console.log("STATUS:", res.statusCode);
            console.log("BODY:", res.body);
            console.log("TEXT:", res.text)

        }
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(1);

        const rec_event = res.body[0];
        expect(rec_event).toHaveProperty("id");
        expect(rec_event.location).toEqual(mockEvent.location);
        expect(rec_event.is_favorite).toEqual(false);
        expect(rec_event.description).toEqual(mockEvent.description);
        expect(rec_event.category).toEqual(mockEvent.category);

    });

    it('shoudl return 200 for delete /api/events/:id', async ()=> {
        const mockEvent = {
            name: "Delete Test Event",
            event_date_time: "2023-12-31T00:00:00.000Z",
            location: "Test Location",
            category: "Test Category",
            description: "To be deleted",
        };

         const createRes = await request(app)
            .post("/api/events")
            .set('Content-Type', "application/json")
            .send(mockEvent);

        expect(createRes.statusCode).toBe(200);
        const createdEvent = createRes.body[0];
        const id = createdEvent.id;

        const deleteRes = await request(app).delete(`/api/events/${id}`);
        const getRes = await request(app).get("/api/events");
        const found = getRes.body.find((e) => e.id === id);
        expect(found).toBeUndefined();
    })

    it('should update an event', async() => {
        
    })
    // Users related endpoints
    it ('should return 200 for GET /api/users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
    });


});