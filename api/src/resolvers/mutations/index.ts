import Ticket from './Ticket';
import Task from './Task';

const { createTicket, updateTicket, deleteTicket } = Ticket;
const { updateTask } = Task;

export default {
    createTicket,
    updateTicket,
    deleteTicket,

    updateTask
}