import supertest from 'supertest';
import app from "../app.js";
import { request } from 'express';

describe('Endpoint Tests', () => {
    // Events related endpoinst
 
    it('should return 200 for GET /api/events', async () => {
        const res = await request(app).get('/api/events');
        expect(res.statusCode).toEqual(200);
    });

    it('should return 200 for POST /api/events', async () => {
        const mockEvent = {
            name: 'Test Event',
            event_date_time: '2023-12-31',
            location: 'Test Location',
            category: 'Test Category',
            description: 'This is a test event'
        }
        const res = await request(app).post('/api/events').send(mockEvent);
        expect(res.body.name).toEqual(mockEvent.name);
        expect(res.body.event_date_time).toEqual(mockEvent.event_date_time);
        expect(res.body.location).toEqual(mockEvent.location);
        expect(res.body.category).toEqual(mockEvent.category);
        expect(res.body.description).toEqual(mockEvent.description);
        expect(res.body.is_favorite).toEqual(false);
        expect(res.statusCode).toEqual(200);
    });



    

    // Users related endpoints
    it('should return 200 for GET /api/users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
    });


});