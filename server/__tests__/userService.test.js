import {describe, it, expect} from '@jest/globals';
import * as userService from '../services/userService.js';
import pool from '../db/db.js';

describe('User Service Tests  ', () => {
// Arrange, Act, Assert

    it('should add users to the database', async () => {
        const name = "Test User";
        const email = "test@example.com";

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
        const users = await userService.getAllUsers();
        if (users.length === 0) {
            throw new Error("No users to delete");
        }
        
        const userToDelete = users[0];
        const deletedUser = await userService.deleteUser(userToDelete.id);  
        const found = users.find(u => u.id === userToDelete.id);
        expect(deletedUser).toBeUndefined();
    });

});