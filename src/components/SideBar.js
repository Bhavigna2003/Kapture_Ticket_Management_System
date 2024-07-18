import React, { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi'; // Import HiOutlineSearch icon from react-icons/hi

const SideBar = ({
  filterPriority,
  filterStatus,
  filterSource,
  setFilterPriority,
  setFilterStatus,
  setFilterSource,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    priority: 'All',
    status: 'All',
    source: 'All',
  });

  const applyDirectFilter = (filterType) => {
    switch (filterType) {
      case 'All Tickets':
        setFilterPriority('All');
        setFilterStatus('All');
        setFilterSource('All');
        break;
      case 'All Open Tickets':
        setFilterStatus('Open');
        break;
      case 'All Closed Tickets':
        setFilterStatus('Closed');
        break;
      case 'All In Progress Tickets':
        setFilterStatus('In Progress');
        break;
      default:
        break;
    }
  };

  const applyAdvancedFilters = () => {
    setFilterPriority(advancedFilters.priority);
    setFilterStatus(advancedFilters.status);
    setFilterSource(advancedFilters.source);
    // Apply advanced filters logic here
    console.log('Applying advanced filters:', advancedFilters);
  };

  const resetToAllTickets = () => {
    setFilterPriority('All');
    setFilterStatus('All');
    setFilterSource('All');
    setShowAdvancedFilters(false); // Hide advanced filters after resetting
  };

  return (
    <div className="w-1/4 ">
      
      {/* Direct Filter Options */}
      <ul className="mb-4 ">
        
      <li
          className="m-2 text-xl text-blue-500 rounded p-2 "
        >
          Views
        </li>
        <hr/>
        <li
          className="cursor-pointer  m-3 hover:bg-blue-200 rounded p-2 "
          onClick={() => applyDirectFilter('All Tickets')}
        >
          All Tickets
        </li>
        <li
          className="cursor-pointer m-3 hover:bg-blue-200 rounded p-2"
          onClick={() => applyDirectFilter('All Open Tickets')}
        >
          All Open Tickets
        </li>
        <li
          className="cursor-pointer m-3 hover:bg-blue-200 rounded p-2"
          onClick={() => applyDirectFilter('All Closed Tickets')}
        >
          All Closed Tickets
        </li>
        <li
          className="cursor-pointer m-3 hover:bg-blue-200 rounded p-2"
          onClick={() => applyDirectFilter('All In Progress Tickets')}
        >
          All In Progress Tickets
        </li>
        
      </ul>

      {/* Advanced Filters Dropdown */}
      {showAdvancedFilters && (
        <div className="mb-4 border border-gray-300 p-4 rounded-md">
          <p className="text-sm text-gray-700 mb-2">Advanced Filters:</p>
          <div className="mb-4">
            <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priorityFilter"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={advancedFilters.priority}
              onChange={(e) => setAdvancedFilters({ ...advancedFilters, priority: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="statusFilter"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={advancedFilters.status}
              onChange={(e) => setAdvancedFilters({ ...advancedFilters, status: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="sourceFilter" className="block text-sm font-medium text-gray-700">
              Source
            </label>
            <select
              id="sourceFilter"
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              value={advancedFilters.source}
              onChange={(e) => setAdvancedFilters({ ...advancedFilters, source: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Mail">Mail</option>
              <option value="Call">Call</option>
              <option value="SMS">SMS</option>
              <option value="Chat">Chat</option>
            </select>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={applyAdvancedFilters}
          >
            Apply
          </button>
          <br/>
          <br/>
        </div>
      )}

      {/* Show Advanced Filters Button */}
      <button
        onClick={showAdvancedFilters ? resetToAllTickets : () => setShowAdvancedFilters(true)}
        className="fixed bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
      >
        {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        <HiOutlineSearch className="ml-2" />
      </button>
    </div>
  );
};

export default SideBar;
