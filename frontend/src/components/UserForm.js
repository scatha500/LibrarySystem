import React, { useState, useEffect } from 'react';

function UserForm({ onUserAdded, editingUser, setEditingUser }) {
  const [user, setUser] = useState({
    name: '',
    membership_id: '',
    role: 'member'
  });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: '', membership_id: '', role: 'member' });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingUser 
      ? `http://localhost:5000/users/${editingUser.id}` 
      : 'http://localhost:5000/users';
    
    const method = editingUser ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(() => {
        setUser({ name: '', membership_id: '', role: 'member' });
        setEditingUser(null);
        onUserAdded();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingUser ? 'Update User' : 'Add New User'}</h3>
      <div className="form-group">
        <input name="name" placeholder="Full Name" value={user.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <input name="membership_id" placeholder="Membership ID" value={user.membership_id} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
      {editingUser && (
        <button type="button" style={{ marginLeft: '10px', backgroundColor: '#888' }} onClick={() => setEditingUser(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;