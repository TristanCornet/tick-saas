import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

import prisma from "../prisma/client";

import PrismaDataSource from "./datasources/PrismaDataSource";

import typeDefs from "./schemas";
import resolvers from "./resolvers";

interface Context {
  prisma: PrismaClient;
  sources: {
    [key: string]: PrismaDataSource;
  }
}

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
});


const {url} = await startStandaloneServer(server, {
  listen: {port: 4005},
  context: async () => {
    return {
      prisma,
      datasources: {
        comment: new PrismaDataSource("comment"),
        task: new PrismaDataSource("task"),
        team: new PrismaDataSource("team"),
        ticket: new PrismaDataSource("ticket"),
        ticketrelation: new PrismaDataSource("ticketrelation"),
        user: new PrismaDataSource("user"),
      }
    };
  }
});

console.log(`🚀  Server ready at: ${url}`);