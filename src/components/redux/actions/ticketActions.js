import axios from 'axios';

export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const CREATE_TICKET_SUCCESS = 'CREATE_TICKET_SUCCESS';
export const UPDATE_TICKET_SUCCESS = 'UPDATE_TICKET_SUCCESS';
export const DELETE_TICKET_SUCCESS = 'DELETE_TICKET_SUCCESS';

const JSON_URL = 'http://localhost:3000/tickets.json'; // Replace with your JSON API endpoint

export const fetchTickets = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(JSON_URL);
      dispatch({ type: FETCH_TICKETS_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };
};

export const createTicket = (newTicket) => {
  return async (dispatch) => {
    try {
      // Simulate server response delay (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: CREATE_TICKET_SUCCESS, payload: newTicket });
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
};

export const updateTicket = (updatedTicket) => {
  return async (dispatch) => {
    try {
      // Simulate server response delay (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: UPDATE_TICKET_SUCCESS, payload: updatedTicket });
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };
};

export const deleteTicket = (ticketId) => {
  return async (dispatch) => {
    try {
      // Simulate server response delay (remove in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: DELETE_TICKET_SUCCESS, payload: ticketId });
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };
};




