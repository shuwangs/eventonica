import React, { useState, useEffect } from "react";
import userFrom from "../hooks/useForm";
const UserRegisterForm = ({ onSubmit }) => {
    const [user, handleOnChange, resetForm] = userFrom({
        username: "",
        email: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user);
        resetForm();
    }


    return (
        <form 
            className="user-register-form"
            onSubmit={handleSubmit}
            > 
            <h2>Add New User </h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={user.username} onChange={handleOnChange} required />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleOnChange} required />

            <button type="submit">Add User</button>

        </form>
    )

}

export default UserRegisterForm;