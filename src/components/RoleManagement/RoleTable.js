import React, { useEffect, useState } from "react";
import { fetchRoles, deleteRole } from "../../services/api";
import AddEditRoleModal from "./AddEditRoleModal";

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = async (roleId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this role?");
    if (confirmDelete) {
      await deleteRole(roleId);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
    }
  };

  const handleSave = async (updatedRole) => {
    if (selectedRole) {
      const updatedRoles = roles.map((role) =>
        role.id === selectedRole.id ? { ...role, ...updatedRole } : role
      );
      setRoles(updatedRoles);
    } else {
      // Add new role
      setRoles((prevRoles) => [...prevRoles, updatedRole]);
    }
    setIsModalOpen(false);
    setSelectedRole(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Role Management</h2>
      <button
        onClick={() => {
          setSelectedRole(null); // Make sure selectedRole is null for new role
          setIsModalOpen(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Role
      </button>
      <table className="min-w-full bg-white shadow-md rounded my-4">
        <thead>
          <tr>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Permissions</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4">{role.name}</td>
              <td className="py-2 px-4">{role.permissions.join(", ")}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(role)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="bg-red-500 text-white px-3 py-1 ml-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddEditRoleModal
          user={selectedRole}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RoleTable;
