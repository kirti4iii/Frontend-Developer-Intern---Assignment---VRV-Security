import React, { useState, useEffect } from "react";

const AddEditRoleModal = ({ user = null, onSave, onClose }) => {
  const [name, setName] = useState(user?.name || ""); // Default to empty string if user is null
  const [permissions, setPermissions] = useState(user?.permissions || []); // Default to empty array if user is null

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPermissions(user.permissions || []);
    }
  }, [user]);

  const handleSave = () => {
    if (!name || permissions.length === 0) {
      alert("Name and Permissions are required!");
      return;
    }
    // On Save, pass the data to the parent (RoleTable)
    onSave({ name, permissions, id: user?.id || Date.now() }); // Use Date.now for new roles
  };

  const handlePermissionChange = (e) => {
    const { value } = e.target;
    setPermissions(
      value
        .split(",")
        .map((permission) => permission.trim())
        .filter((permission) => permission)
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{user?.id ? "Edit Role" : "Add Role"}</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Role Name"
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={permissions.join(", ")}
          onChange={handlePermissionChange}
          placeholder="Permissions (comma separated)"
          className="block w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
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

export default AddEditRoleModal;
