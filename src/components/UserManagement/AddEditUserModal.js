import React, { useState, useEffect } from "react";

const AddEditUserModal = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [status, setStatus] = useState(user?.status || "");

  useEffect(() => {
    // Only reset the state when the modal is opened with a new user
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "");
      setStatus(user.status || "");
    }
  }, [user]);

  const handleSave = () => {
    if (!name || !email || !role || !status) {
      alert("All fields are required!");
      return;
    }
    onSave({ id: user?.id, name, email, role, status });
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{user?.id ? "Edit User" : "Add User"}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
          className="block w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Save
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditUserModal;
