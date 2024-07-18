import React from 'react';

const TicketPagination = ({
  currentPage,
  ticketsPerPage,
  totalTickets,
  paginate,
  changeTicketsPerPage,
}) => {
  // Function to handle changing tickets per page
  const handleTicketsPerPageChange = (e) => {
    const newTicketsPerPage = parseInt(e.target.value);
    changeTicketsPerPage(newTicketsPerPage);
  };

  // Calculate range of tickets being displayed
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTicketsEnd = Math.min(indexOfLastTicket, totalTickets);
  const currentTicketsStart = totalTickets === 0 ? 0 : indexOfFirstTicket + 1;

  return (
    <div className="flex justify-between items-center mt-4">
      {/* Pagination Info */}
      <div className="text-sm text-gray-700">
        Showing {currentTicketsStart} - {currentTicketsEnd} of {totalTickets} entries
      </div>

      {/* Pagination Controls */}
      <div className="flex space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md bg-gray-300 text-gray-700 ${
            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalTickets / ticketsPerPage)}
          className={`px-3 py-1 rounded-md bg-gray-300 text-gray-700 ${
            currentPage === Math.ceil(totalTickets / ticketsPerPage) ? 'cursor-not-allowed' : 'hover:bg-gray-300'
          }`}
        >
          Next
        </button>
      </div>

      {/* Tickets Per Page Dropdown */}
      <div>
        <select
          value={ticketsPerPage}
          onChange={handleTicketsPerPageChange}
          className="border border-gray-400 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <span className="text-sm text-gray-700 ml-1">entries</span>
      </div>
    </div>
  );
};

export default TicketPagination;
