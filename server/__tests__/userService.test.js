import {describe, it, expect} from '@jest/globals';
import userService from '../services/userService.js';
import pool from '../db/db.js';

describe('User Service Tests  ', () => {
// Arrange, Act, Assert

    it('should add users to the database', async () => {
        const name = "Test User";
        const randAttache = (Math.random()* 10).toString();
        const email =  `test`+ randAttache + "@gmail.com";

        const newUser = await userService.addUser(name, email);

        expect(newUser).toHaveProperty('id');
        expect(newUser.name).toBe(name);
        expect(newUser.email).toBe(email);
    });

    it('should get all users from the database', async () => {
        const users = await userService.getAllUsers();
        expect(Array.isArray(users)).toBe(true);
    });

    it('should delete a user from the database', async () => {

        const name = "Delete Me";
        const email = `del_${Math.random()}@gmail.com`;
        const created = await userService.addUser(name, email);

        const deleted = await userService.deleteUser(created.id);

        expect(deleted).toBeTruthy();

        expect(deleted.id).toBe(created.id);

        const usersAfterDelete = await userService.getAllUsers();
        const found = usersAfterDelete.find((u) => u.id === created.id);

        expect(found).toBeUndefined();
    });

    afterAll(async () => {
         await pool.end();
    });

});