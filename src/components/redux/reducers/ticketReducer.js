import {
  FETCH_TICKETS_SUCCESS,
  CREATE_TICKET_SUCCESS,
  UPDATE_TICKET_SUCCESS,
  DELETE_TICKET_SUCCESS,
} from '../actions/ticketActions';

const initialState = {
  tickets: [], // Ensure this is initialized properly
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.payload,
      };
    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case UPDATE_TICKET_SUCCESS:
      const updatedTickets = state.tickets.map((ticket) =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
      return {
        ...state,
        tickets: updatedTickets,
      };
    case DELETE_TICKET_SUCCESS:
      const filteredTickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
      return {
        ...state,
        tickets: filteredTickets,
      };
    default:
      return state;
  }
};

export default ticketReducer;
