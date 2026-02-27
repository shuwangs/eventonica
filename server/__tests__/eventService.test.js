import {describe, it, expect, beforeEach, jest, afterAll } from '@jest/globals';
import eventService from '../services/eventService.js';
import pool from "../db/db.js"
import * as sql_queries from "../utils/sql_helper.js";


describe('eventService Test', () => {
    beforeEach(() =>{
        jest.restoreAllMocks();
    });
    
    it("get all events", async () => {
        const fakeRows = [
            {
                id: 1,
                name: "Music coding Night",
                event_date_time: new Date("2026-03-01T19:00:00.000Z"),
                location: "DC",
                category: "Workshop",
                description: "Live jazz",
                is_favorite: false,
                created_at: new Date("2026-02-26T12:00:00.000Z"),
            },
    ];

    const spy = jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: fakeRows });

    const events = await eventService.getAllEvents();

    expect(events).toEqual(fakeRows);
    expect(events).toHaveLength(1);
    expect(events[0]).toHaveProperty("id", 1);
    expect(events[0]).toHaveProperty("event_date_time");
    expect(events[0]).toHaveProperty("created_at");
    });

    it("getAllCategories() returns categories rows", async () => {
        const fakeRows = [{ id: 1, name: "Tech" }];
        const spy = jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: fakeRows });

        const res = await eventService.getAllCategories();

        expect(res).toEqual(fakeRows);
    });

  it("getEventByCategory(categoryName) uses category string", async () => {
    const spy = jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [{ id: 1, category: "Tech" }] });

    const res = await eventService.getEventByCategory("Tech");

    expect(spy).toHaveBeenCalledWith(sql_queries.GET_EVENTS_BY_CATEGORY, ["Tech"]);
    expect(Array.isArray(res)).toBe(true);
  });

    it("updateEvent() returns null when no row updated", async () => {
        jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [] });

        const res = await eventService.updateEvent({
        id: 999,
        name: "test event",
        event_date_time: "2026-03-01 19:00:00",
        location: "DC",
        category: "Tech",
        description: "test description",
        });

        expect(res).toBeNull();
    });
    
    it('searchEvents() maps "All" to null category and empty queryText to null keyword', async () => {
        const spy = jest.spyOn(pool, "query").mockResolvedValueOnce({ rows: [] });

        await eventService.searchEvents("", "All");

        expect(spy).toHaveBeenCalledWith(sql_queries.SEARCH_EVENTS, [null, null]);
    });

    afterAll(async ()=> {
        await pool.end();
    })


})