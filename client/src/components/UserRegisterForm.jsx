import React, { useState, useEffect } from "react";

const UserRegisterForm = ({ onSubmit }) => {
    const [user, setUser] = useState({
        username: "",
        email: ""
    });

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(user);
        setUser({
            username: "",
            email: ""
        });
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