export default {
  tickets: ({ id }: { id: number }, _: any, { datasources: { team } }: any) =>
    team.getRelated(id, "tickets"),

  users: ({ id }: { id: number }, _: any, { datasources: { team } }: any) =>
    team.getRelated(id, "users"),
};
