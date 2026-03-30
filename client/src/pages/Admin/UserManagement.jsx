import { useEffect, useState } from "react";
import { getAllUsers, setAsAdmin, deleteUser, makeUser } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";
import "./UserManagement.css";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSetAdmin = async (userId) => {
    try {
      await setAsAdmin(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error setting admin:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleMakeUser = async(userId) => {
    try {
      await makeUser(userId);
      fetchUsers();
    } catch (err) {
      console.error("Error changing role to user", err)
    }
  }

  return (
    <div className="user-management-page">
      <div className="user-management-container">
        <h1>User Management</h1>
        <p className="user-management-subtitle">
          View all registered users, assign admin role, and delete users.
        </p>

        {loading ? (
          <p className="loading-text">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="empty-text">No users found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => {
                  const isCurrentUser = user?._id === u._id || user?.id === u._id;

                  return (
                    <tr
                      key={u._id}
                      className={isCurrentUser ? "current-user-row" : ""}
                    >
                      <td>
                        {u.firstName} {u.lastName}
                        {isCurrentUser && <span className="you-badge"> (You)</span>}
                      </td>

                      <td>{u.email}</td>

                      <td>
                        <span
                          className={
                            u.role === "admin"
                              ? "role-badge admin-role"
                              : "role-badge user-role"
                          }
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="action-buttons">
                        {u.role === "user" && !isCurrentUser && (
                          <button
                            className="make-admin-btn"
                            onClick={() => handleSetAdmin(u._id)}
                          >
                            Make Admin
                          </button>
                        )}

                        {u.role === "admin" && !isCurrentUser && (
                          <button
                            className="make-user-btn"
                            onClick={() => handleMakeUser(u._id)}
                          >
                            Make User
                          </button>
                        )}

                        <button
                          className="delete-user-btn"
                          onClick={() => handleDeleteUser(u._id)}
                          disabled={isCurrentUser}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;