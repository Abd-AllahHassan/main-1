import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import moment from 'moment';

const MainTable = ({ users, onDelete, theme }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-center mx-auto mt-5">
        <thead className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}>
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
              className={`border-b ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-gray-50 text-gray-800'
              }`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-2 capitalize">{user.gender}</td>
              <td className="px-4 py-2">{user.country}</td>
              <td className="px-4 py-2">{user.age}</td>
              <td className="px-4 py-2">
                {moment(user.updatedAt).fromNow()}
              </td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <Link
                  to={`/user/${user._id}`}
                  className={`p-2 rounded hover:bg-blue-600 ${
                    theme === 'dark' 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}
                  title="View details"
                >
                  <Eye size={18} />
                </Link>
                
                <Link
                  to={`/user/edit/${user._id}`}
                  className={`p-2 rounded hover:bg-blue-600 ${
                    theme === 'dark' 
                      ? 'bg-blue-700 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}
                  title="Edit user"
                >
                  <Pencil size={18} />
                </Link>
                
                <button
                  onClick={() => onDelete(user._id)}
                  className={`p-2 rounded hover:bg-red-600 ${
                    theme === 'dark' 
                      ? 'bg-red-700 text-white' 
                      : 'bg-red-500 text-white'
                  }`}
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