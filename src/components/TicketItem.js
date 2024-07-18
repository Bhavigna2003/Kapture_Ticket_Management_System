// TicketItem.js

import React from 'react';

const TicketItem = ({ ticket, onEdit, onDelete }) => {
  const { id, title, status, source, description, priority } = ticket;

  return (
    <tr className='' >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">{id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{title}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{source}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{priority}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(id)}
          className="text-indigo-600 hover:text-indigo-900 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TicketItem;
