export default {
  ticket: (
    { ticket_id }: { ticket_id: number },
    _: any,
    { datasources: { ticket } }: any
  ) => ticket.getOne(ticket_id),
};
