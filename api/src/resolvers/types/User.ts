export default {
  tickets: ({ id }: { id: number }, _: any, { datasources: { user } }: any) =>
    user.getRelated(id, "tickets"),

  team: (
    { team_id }: { team_id: number },
    _: any,
    { datasources: { team } }: any
  ) => team.getOne(team_id),
};
