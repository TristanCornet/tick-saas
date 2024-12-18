export default {
  user: (
    { user_id }: { user_id: number },
    _: any,
    { datasources: { user } }: any
  ) => user.getOne(user_id),

  team: (
    { team_id }: { team_id: number },
    _: any,
    { datasources: { team } }: any
  ) => team.getOne(team_id),

  comments: (
    { id }: { id: number },
    _: any,
    { datasources: { ticket } }: any
  ) => ticket.getRelated(id, "comments"),

  tasks: ({ id }: { id: number }, _: any, { datasources: { ticket } }: any) =>
    ticket.getRelated(id, "tasks"),

  ticketrelations: (
    { id }: { id: number },
    _: any,
    { datasources: { ticket } }: any
  ) => ticket.getRelated(id, "ticketrelations"),

  ticketrelateds: (
    { id }: { id: number },
    _: any,
    { datasources: { ticket } }: any
  ) => ticket.getRelated(id, "ticketrelateds"),
};
