export const fetchUsers = async () => {
    const response = await fetch("http://localhost:3001/users");
    return response.json();
  };
  
  export const updateUser = async (user) => {
    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return response.json();
  };
  
  export const deleteUser = async (userId) => {
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: "DELETE",
    });
  };
  
  export const fetchRoles = async () => {
    const response = await fetch("http://localhost:3001/roles");
    if (!response.ok) {
      throw new Error("Failed to fetch roles");
    }
    return response.json();
  };
  

  export const addUser = async (user) => {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to add user");
    }
    return response.json();
  };

  // services/api.js
export const deleteRole = async (roleId) => {
    await fetch(`http://localhost:3001/roles/${roleId}`, {
      method: "DELETE",
    });
  };
  