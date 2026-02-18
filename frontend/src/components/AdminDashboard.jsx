import { useState, useEffect } from 'react';
import { adminService } from '../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [flaggedBlogs, setFlaggedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [view, setView] = useState('users'); // 'users' | 'flagged'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersData, flaggedData] = await Promise.all([
          adminService.getAllUsers(),
          adminService.getFlaggedBlogs(),
        ]);
        setUsers(usersData);
        setFlaggedBlogs(flaggedData);
        setLoading(false);
      } catch (err) {
        // axios errors are a bit different; normalize message
        const message =
          err?.response?.status === 401
            ? 'Unauthorized. Admin access required.'
            : err?.response?.data?.message || err.message;
        setError(message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <h2 className="font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">User statistics and blog counts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Total users
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {users.length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Flagged blogs
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {flaggedBlogs.length}
          </div>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setView('users')}
          className={`px-3 py-1 text-sm rounded-full border ${
            view === 'users'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setView('flagged')}
          className={`px-3 py-1 text-sm rounded-full border ${
            view === 'flagged'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          Flagged content
        </button>
      </div>

      {view === 'users' ? (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Blog Count
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              [...users]
                .sort((a, b) => (b.blogCount ?? 0) - (a.blogCount ?? 0))
                .map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={user.role}
                      onChange={async (e) => {
                        const newRole = e.target.value;
                        try {
                          await adminService.updateUserRole(user._id, newRole);
                          setUsers((prev) =>
                            prev.map((u) =>
                              u._id === user._id ? { ...u, role: newRole } : u,
                            ),
                          );
                        } catch (err) {
                          console.error(err);
                          // keep old value on error
                        }
                      }}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.blogCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.created_at 
                      ? new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Flagged At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flaggedBlogs.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No flagged blogs.
                  </td>
                </tr>
              ) : (
                flaggedBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blog.author?.email || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blog.Engagement || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blog.Date
                        ? new Date(blog.Date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={async () => {
                          try {
                            await adminService.deleteBlog(blog._id);
                            setFlaggedBlogs((prev) =>
                              prev.filter((b) => b._id !== blog._id),
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
