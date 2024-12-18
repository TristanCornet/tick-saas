export default {
  ticket: (
    { ticket_id }: { ticket_id: number },
    _: any,
    { datasources: { ticket } }: any
  ) => ticket.getOne(ticket_id),

  user: (
    { user_id }: { user_id: number },
    _: any,
    { datasources: { user } }: any
  ) => user.getOne(user_id),

  comment: (
    { comment_id }: { comment_id: number },
    _: any,
    { datasources: { comment } }: any
  ) => comment.getOne(comment_id),

  children: (
    { id }: { id: number },
    _: any,
    { datasources: { comment } }: any
  ) => comment.getRelated(id, "children"),
};
