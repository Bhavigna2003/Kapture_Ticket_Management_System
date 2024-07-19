import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSms, faTimes, faEnvelope, faPhoneAlt, faComments } from '@fortawesome/free-solid-svg-icons';
import TicketItem from './TicketItem';
import TicketPagination from './TicketPagination';
import TicketFiltersSidebar from './SideBar';


// Redux actions
import { fetchTickets, createTicket, updateTicket, deleteTicket } from './redux/actions/ticketActions';

const TicketList = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.tickets); // Ensure correct access to tickets array in state
 // Assuming 'tickets' is under 'state.tickets'


 
  console.log(typeof tickets);
  // State to manage ticket form input fields


  useEffect(() => {
    // Load tickets from local storage if available
    const storedTickets = JSON.parse(localStorage.getItem('tickets'));
    if (storedTickets) {
      dispatch({ type: 'FETCH_TICKETS_SUCCESS', payload: storedTickets });
    } else {
      dispatch(fetchTickets());
    }
  }, [dispatch]);

  const [newTicketId, setNewTicketId] = useState('');
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketStatus, setNewTicketStatus] = useState('Open');
  const [newTicketSource, setNewTicketSource] = useState('SMS');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState('Low');
  const [showModal, setShowModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSource, setFilterSource] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsTicket, setDetailsTicket] = useState(null); // State for details view
  const [ticketsPerPage, setTicketsPerPage] = useState(5);
  const [newTicketDate, setNewTicketDate] = useState('');
  const [dateFilter, setDateFilter] = useState('');



  
  // Function to handle opening edit modal with ticket data
  const handleEditTicket = (ticketId) => {
    const ticketToEdit = tickets.find(ticket => ticket.id === ticketId);
    setNewTicketId(ticketId);
    setNewTicketTitle(ticketToEdit.title);
    setNewTicketStatus(ticketToEdit.status);
    setNewTicketSource(ticketToEdit.source);
    setNewTicketDescription(ticketToEdit.description);
    setNewTicketPriority(ticketToEdit.priority);
    setShowModal(true);
  };

  // Function to handle creating a new ticket
  const handleCreateTicket = () => {
    const newTicket = {
      id: generateUniqueId(),
      title: newTicketTitle,
      status: newTicketStatus,
      source: newTicketSource,
      description: newTicketDescription,
      priority: newTicketPriority,
      date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }).slice(0, 19),
    };
    dispatch(createTicket(newTicket));
    updateLocalStorage([...tickets, newTicket]);
    setShowModal(false);
    clearFormFields();

  };

  
  // Function to handle updating an existing ticket
  const handleUpdateTicket = () => {
    const updatedTicket = {
      id: newTicketId,
      title: newTicketTitle,
      status: newTicketStatus,
      source: newTicketSource,
      description: newTicketDescription,
      priority: newTicketPriority,
      date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }).slice(0, 19),
    };
    dispatch(updateTicket(updatedTicket));
    // Update details ticket if it's the same ticket being updated

    const updatedTickets = tickets.map(ticket => (ticket.id === newTicketId ? updatedTicket : ticket));
    updateLocalStorage(updatedTickets);

    if (detailsTicket && detailsTicket.id === newTicketId) {
      setDetailsTicket(updatedTicket);
    }
    setShowModal(false);
  };

  // Function to handle deleting a ticket
  const handleDeleteTicket = (ticketId) => {
    dispatch(deleteTicket(ticketId));
    const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
    updateLocalStorage(updatedTickets);
    // If details ticket is deleted, clear details view
    if (detailsTicket && detailsTicket.id === ticketId) {
      setDetailsTicket(null);
    }
  };

  // Function to view ticket details
  const viewTicketDetails = (ticketId) => {
    const ticket = tickets.find(ticket => ticket.id === ticketId);
    setDetailsTicket(ticket);
  };

  // Function to clear form fields
  const clearFormFields = () => {
    setNewTicketId('');
    setNewTicketTitle('');
    setNewTicketStatus('Open');
    setNewTicketSource('SMS');
    setNewTicketDescription('');
    setNewTicketPriority('Low');
  };

  // Function to generate a unique ID
  const generateUniqueId = () => {
    return Date.now().toString();
  };

  // Function to truncate text with an ellipsis for table cells
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  // Function to filter tickets
  const filteredTickets = tickets.filter(ticket => {
    if (filterPriority !== 'All' && ticket.priority !== filterPriority) {
      return false;
    }
    if (filterStatus !== 'All' && ticket.status !== filterStatus) {
      return false;
    }
    if (filterSource !== 'All' && ticket.source !== filterSource) {
      return false;
    }
    if (
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.priority.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }
    return false;
  });
 
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
  
    if (dateFilter === 'newest') {
      // Sort by descending order of timestamp
      return dateB - dateA;
    } else if (dateFilter === 'oldest') {
      // Sort by ascending order of timestamp
      return dateA - dateB;
    } else {
      // No sorting
      return 0;
    }
  });
  
  
  

// Pagination logic
const indexOfLastTicket = currentPage * ticketsPerPage;
const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
const currentTickets = sortedTickets.slice(indexOfFirstTicket, indexOfLastTicket);
const totalTickets = sortedTickets.length;

console.log(currentTickets, "currentTickets")

// Function to handle pagination
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

// Function to handle changing tickets per page
const changeTicketsPerPage = (newTicketsPerPage) => {
  setTicketsPerPage(newTicketsPerPage);
  setCurrentPage(1); // Reset to first page when changing tickets per page
};

    // Function to update local storage with new tickets array
    const updateLocalStorage = (updatedTickets) => {
        localStorage.setItem('tickets', JSON.stringify(updatedTickets));
      };
    

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <TicketFiltersSidebar
        filterPriority={filterPriority}
        filterStatus={filterStatus}
        filterSource={filterSource}
        setFilterPriority={setFilterPriority}
        setFilterStatus={setFilterStatus}
        setFilterSource={setFilterSource}
      />

      {/* Search and Ticket List */}
      <div className="w-full bg-gray-100 shadow-md rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search tickets..."
            className="border border-gray-300 rounded-lg px-3 py-2 w-1/3 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />


           {/* Date Filter Dropdown */}
          <div className="relative">
          <select
             value={dateFilter}
             onChange={(e) => setDateFilter(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg shadow-sm leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
             <option value="">Filter By Date</option>
             <option value="newest">Newest</option>
             <option value="oldest">Oldest</option>
           </select> 

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 0 0 1.414 1.414L10 6.414l3.293 3.293a1 1 0 0 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414z"
                />
              </svg>
            </div>
          </div>

          {/* Create Ticket Button */}
          <button
            onClick={() => {
              clearFormFields(); // Clear form fields before opening modal
              setShowModal(true);
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition ease-in-out duration-150"
          >
            Create Ticket
          </button>
        </div>

        {/* Tickets List */}
        <div className="overflow-x-auto">
          <div className="min-w-screen bg-gray-100 mx-2 flex items-center justify-center font-sans overflow-hidden">
            <div className="w-full">
              {currentTickets.map((ticket, index) => (
                <div key={ticket.id}>
                  {/* Individual Ticket Row */}
                  <div className="bg-white shadow-md rounded mb-4">
                    <div className="grid grid-cols-10 gap-4 py-4">
                      {/* Title */}
                      <div className="col-span-2 px-3 py-2 whitespace-wrap break-all text-sm font-medium text-gray-900">
                        {ticket.title}
                      </div>
                      {/* Status */}
                      <div className={`col-span-1 px-3 py-2 whitespace-nowrap text-sm font-medium ${
                        ticket.status === 'Open' ? 'text-green-600' :
                        ticket.status === 'In Progress' ? 'text-yellow-600' :
                        ticket.status === 'Closed' ? 'text-red-600' : ''
                      }`}>{ticket.status}</div>
                      {/* Source */}
                      <div className="col-span-1 px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket.source === 'SMS' && (
                          <span><FontAwesomeIcon icon={faSms} className="text-blue-600" /> SMS</span>
                        )}
                        {ticket.source === 'Mail' && (
                          <span><FontAwesomeIcon icon={faEnvelope} className="text-red-600" /> Mail</span>
                        )}
                        {ticket.source === 'Call' && (
                          <span><FontAwesomeIcon icon={faPhoneAlt} className="text-green-600" /> Call</span>
                        )}
                        {ticket.source === 'Chat' && (
                          <span><FontAwesomeIcon icon={faComments} className="text-yellow-600" /> Chat</span>
                        )}
                      </div>
                      {/* Description */}
                      <div className="col-span-2 px-3 py-2 whitespace-normal text-sm font-medium text-gray-900">
                        {truncateText(ticket.description, 100)}
                      </div>
                      {/* Priority */}
                      <div className="col-span-1 px-3 py-2 whitespace-nowrap text-sm font-medium">
                        <span className={`inline-block px-2 py-1 leading-none rounded-full ${
                          ticket.priority === 'Low' ? 'bg-green-100 text-green-800' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          ticket.priority === 'High' ? 'bg-red-100 text-red-800' : ''
                        }`}>{ticket.priority}</span>
                      </div>
                      {/* Details Button */}
                      <div className="col-span-1 px-2 py-1 whitespace-normal text-sm font-medium">
                        <button
                          onClick={() => viewTicketDetails(ticket.id)}
                          className="bg-indigo-600 text-white py-1 px-2 rounded-md shadow-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 transition ease-in-out duration-150"
                          >
                          Details
                        </button>
                      </div>
                      <div className="col-span-2 px-3 py-2 whitespace-wrap break-all text-sm font-medium text-gray-900">
                        {ticket.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


          {/* Pagination */}
          <TicketPagination
          currentPage={currentPage}
          ticketsPerPage={ticketsPerPage}
          totalTickets={filteredTickets.length}
          paginate={paginate}
          changeTicketsPerPage={changeTicketsPerPage}
        />
        </div>
        
       
     {/* Ticket Details Modal */}


     {detailsTicket && (
  <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* Modal Panel */}
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      {/* Modal Content */}
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="text-center sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4 ">Ticket Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1">
                  <p><span className="font-medium">ID:</span> {detailsTicket.id}</p>
                </div>
                <div className="col-span-1">
                  <p><span className="font-medium">Title:</span> {detailsTicket.title}</p>
                </div>
                <div className="col-span-1">
                  <p><span className="font-medium">Status:</span> {detailsTicket.status}</p>
                </div>
                <div className="col-span-1">
                  <p><span className="font-medium">Source:</span> {detailsTicket.source}</p>
                </div>
                <div className="col-span-1">
                  <p><span className="font-medium">Description:</span> {detailsTicket.description}</p>
                </div>
                <div className="col-span-1">
                  <p><span className="font-medium">Priority:</span> {detailsTicket.priority}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-gray-600 dark:text-gray-400 mb-2"><span className="font-semibold">Date:</span> {detailsTicket.date}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleEditTicket(detailsTicket.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTicket(detailsTicket.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 ml-2 focus:outline-none"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDetailsTicket(null)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-lg hover:bg-gray-400 ml-2 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


       {/* Create/Edit Ticket Modal */}
       {showModal && (
  <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      {/* Modal Panel */}
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      {/* Modal Content */}
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                {newTicketId ? 'Edit Ticket' : 'Create New Ticket'}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="col-span-1">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newTicketTitle}
                    onChange={(e) => setNewTicketTitle(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter title..."
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={newTicketStatus}
                    onChange={(e) => setNewTicketStatus(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Open" className="text-green-600">Open</option>
                    <option value="In Progress" className="text-yellow-600">In Progress</option>
                    <option value="Closed" className="text-red-600">Closed</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
                  <select
                    id="source"
                    name="source"
                    value={newTicketSource}
                    onChange={(e) => setNewTicketSource(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="SMS" className="text-blue-600">SMS</option>
                    <option value="Mail" className="text-red-600">Mail</option>
                    <option value="Call" className="text-green-600">Call</option>
                    <option value="Chat" className="text-yellow-600">Chat</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTicketDescription}
                    onChange={(e) => setNewTicketDescription(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                    placeholder="Enter description..."
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={newTicketPriority}
                    onChange={(e) => setNewTicketPriority(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={newTicketId ? handleUpdateTicket : handleCreateTicket}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {newTicketId ? 'Update' : 'Create'}
          </button>
          <button
            onClick={() => {
              setShowModal(false);
              clearFormFields();
            }}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};


export default TicketList;