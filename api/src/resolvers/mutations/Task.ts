export default {
  updateTask: async (_: any, {data}: any, {prisma}: any) => {
    return prisma.task.update({ where: {id: data.id}, data });
  }
}