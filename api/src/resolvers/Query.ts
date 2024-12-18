export default {
  // Tickets
  tickets: (
    _: any,
    { where, limit }: any,
    { datasources: { ticket } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 30 });
    return ticket.getMany(where, limit);
  },
  ticket: (
    _: any,
    { id }: { id: number },
    { datasources: { ticket } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 30 });
    return ticket.getOne(id);
  },

  // Teams
  teams: (
    _: any,
    { where, limit }: any,
    { datasources: { team } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 240 });
    return team.getMany(where, limit);
  },
  team: (
    _: any,
    { id }: { id: number },
    { datasources: { team } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 240 });
    return team.getOne(id);
  },

  // Users
  users: (
    _: any,
    { where, limit }: any,
    { datasources: { user } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 240 });
    return user.getMany(where, limit);
  },
  user: (
    _: any,
    { id }: { id: number },
    { datasources: { user } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 240 });
    return user.getOne(id);
  },

  // Comments
  comments: (
    _: any,
    { where, limit }: any,
    { datasources: { comment } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 30 });
    return comment.getMany(where, limit);
  },
  comment: (
    _: any,
    { id }: { id: number },
    { datasources: { comment } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 30 });
    return comment.getOne(id);
  },

  // Tasks
  tasks: (
    _: any,
    { where, limit }: any,
    { datasources: { task } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 30 });
    return task.getMany(where, limit);
  },
  task: (
    _: any,
    { id }: { id: number },
    { datasources: { task } }: any,
    { cacheControl }
  ) => {
    cacheControl.setCacheHint({ maxAge: 30 });
    return task.getOne(id);
  },

  // TicketRelations
  ticketRelations: (
    _: any,
    { where, limit }: any,
    { datasources: { ticketrelation } }: any
  ) => ticketrelation.getMany(where, limit),
  ticketRelation: (
    _: any,
    { id }: { id: number },
    { datasources: { ticketrelation } }: any
  ) => ticketrelation.getOne(id),
};
