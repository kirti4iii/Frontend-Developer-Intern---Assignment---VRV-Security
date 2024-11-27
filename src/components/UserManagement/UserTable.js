import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../../services/api";
import AddEditUserModal from "./AddEditUserModal";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleAddUser = (newUser) => {
    addUser(newUser)
      .then((createdUser) => {
        setUsers([...users, createdUser]);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Failed to add user:", error);
      });
  };

  const handleUpdateUser = (updatedUser) => {
    updateUser(updatedUser)
      .then((savedUser) => {
        setUsers(users.map((user) => (user.id === savedUser.id ? savedUser : user)));
        setIsModalOpen(false);
        setEditingUser(null);
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId)
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Failed to delete user:", error);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">User Management</h2>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded mb-4"
        onClick={() => {
          setIsModalOpen(true);
          setEditingUser(null);
        }}
      >
        Add User
      </button>
      <table className="min-w-full bg-white shadow-md rounded my-4">
        <thead>
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">{user.status}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setEditingUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 ml-2 rounded"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddEditUserModal
          user={editingUser}
          onSave={editingUser ? handleUpdateUser : handleAddUser}
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserTable;
