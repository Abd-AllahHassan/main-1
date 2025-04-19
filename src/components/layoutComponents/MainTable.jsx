import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import moment from 'moment';

const MainTable = ({ users, onDelete }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-center mx-auto mt-5">
        <thead className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Last Updated</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              className="border-b hover:bg-gray-50 text-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 capitalize">{user.gender}</td>
              <td className="px-4 py-2">{user.country}</td>
              <td className="px-4 py-2">{user.age}</td>
              <td className="px-4 py-2">{moment(user.updatedAt).fromNow()}</td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <Link
                  to={`/customers/${user._id}`}
                  className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                  title="View details"
                >
                  <Eye size={18} />
                </Link>
                <Link
                  to={`/customers/edit/${user._id}`}
                  className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                  title="Edit user"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => onDelete(user._id)}
                  className="p-2 rounded bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
                  title="Delete user"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
