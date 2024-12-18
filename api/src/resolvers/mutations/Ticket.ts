import { GraphQLError } from "graphql";

export default {
  createTicket: async (_: any, {data}: any, {prisma}: any) => {
    return prisma.ticket.create({ data });
  },

  
  updateTicket: async (_: any, {data}: any, {prisma}: any) => {
    const { ticket_relations_ids, ticket_relateds_ids, tasks_ids, ...ticket } = data;

    if (ticket_relations_ids && ticket_relations_ids.length) {
      ticket.ticketrelations = { set: ticket_relations_ids.map((id: number) => ({ id })) };
    }

    if (ticket_relateds_ids && ticket_relateds_ids.length) {
      ticket.ticketrelateds = { set: ticket_relateds_ids.map((id: number) => ({ id })) };
    }

    if (tasks_ids && tasks_ids.length) {
      ticket.tasks = { set: tasks_ids.map((id: number) => ({ id })) };
    }

    return prisma.ticket.update({ where: { id: ticket.id }, data: ticket });
  },


  deleteTicket: async (_: any, {id}: any, {prisma}: any) => {
    if (!id) {
      throw new GraphQLError("You must provide either an id in order to delete a ticket.", {
        extensions: {
          code: "BAD_USER_INPUT"
        }
      });
    }

    return prisma.ticket.delete({ where: { id } });
  }
}