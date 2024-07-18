import React from 'react';
import Sidebar from './SideBar';
import Navbar from './Navbar';
import TicketList from './Ticketlist'; // Corrected the import to TicketList (previously Ticketlist)

const Dashboard = () => {
  return (
   
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4">
          <TicketList />
        </div>
    </div>
  );
};

export default Dashboard;