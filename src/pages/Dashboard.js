// pages/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <Link to="/users" className="text-blue-500">Go to User Management</Link>
        <br />
        <Link to="/roles" className="text-blue-500">Go to Role Management</Link>
      </div>
    </div>
  );
};

export default Dashboard;
