import React from 'react';

function UserList({ users, onUserDeleted, setEditingUser }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => onUserDeleted())
      .catch(err => console.error(err));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Membership ID</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.membership_id}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => setEditingUser(user)} style={{ marginRight: '10px' }}>Update</button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;