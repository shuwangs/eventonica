// Hardcoded users
import React from "react";
const UserList = ({ users }) => {
  console.log(users);
  return (
    <div className="userList">
      {users.map((user) => (
        <div className="eachUser" key={user.id}>
          <span className="userName">{user.name}</span>
          {user.is_manager && <span> (Manager)</span>}
        </div>
      ))}
    </div>
  );
};

export default UserList;
