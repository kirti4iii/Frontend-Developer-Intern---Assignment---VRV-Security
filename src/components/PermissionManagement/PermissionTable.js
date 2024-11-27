// components/PermissionManagement/PermissionTable.js
import React from "react";

const PermissionTable = ({ permissions }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Permissions</h2>
      <ul className="list-disc pl-6">
        {permissions.map((permission, index) => (
          <li key={index}>{permission}</li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionTable;
