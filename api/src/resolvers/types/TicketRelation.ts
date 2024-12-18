export default {
  ticket: (
    { ticket_id }: { ticket_id: number },
    _: any,
    { datasources: { ticket } }: any
  ) => ticket.getOne(ticket_id),

  relatedTicket: (
    { related_ticket_id }: { related_ticket_id: number },
    _: any,
    { datasources: {  ticket } }: any
  ) =>  ticket.getOne(related_ticket_id),
};
