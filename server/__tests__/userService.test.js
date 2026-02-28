import {describe, it, expect, beforeEach, jest} from '@jest/globals';
import userService from '../services/userService.js';
import pool from '../db/db.js';

describe('User Service Tests  ', () => {
// Arrange, Act, Assert
    beforeEach(() =>{
        jest.restoreAllMocks();
    })

    it('should add users to the database', async () => {
        const name = "Test User";
        const randAttache = (Math.random()* 10).toString();
        const email =  `test`+ randAttache + "@gmail.com";

        jest.spyOn(pool, "query").mockResolvedValueOnce({
            rows:[{"id":1, name, email}]
        })
        const newUser = await userService.addUser(name, email);

        expect(newUser).toHaveProperty('id');
        expect(newUser.name).toBe(name);
        expect(newUser.email).toBe(email);
    });

    it('should get all users from the database', async () => {

        jest.spyOn(pool, "query").mockResolvedValueOnce({
        rows: [
            { id: 1, name: "Bobo", email: "bobo@gmail.com" },
            { id: 2, name: "Cat", email: "cat@gmail.com" },
            ],
        })
        const users = await userService.getAllUsers();
        expect(Array.isArray(users)).toBe(true);
        expect(users).toHaveLength(2);
    });

    it('should delete a user from the database', async () => {

        const created = { id: 99, name: "Delete Me", email: "del@gmail.com" };
        
        jest.spyOn(pool, "query")
            .mockResolvedValueOnce({ rows: [created] })
            .mockResolvedValueOnce({ rows: [created] })
            .mockResolvedValueOnce({rows:[]});

        const added = await userService.addUser(created.name, created.email);
        const deleted = await userService.deleteUser(added.id);

        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);

        const usersAfterDelete = await userService.getAllUsers();
        const found = usersAfterDelete.find((u) => u.id === created.id);

        expect(found).toBeUndefined();
    });

    afterAll(async () => {
         await pool.end();
    });

});


