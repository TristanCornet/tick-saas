import DataLoader from "dataloader";
import { GraphQLError } from "graphql/error";

import prisma from "../../prisma/client";

class PrismaDataSource {
  private model: any;
  private readonly entity: string;

  constructor(entity: string) {
    this.model = prisma[entity];
    this.entity = entity.toUpperCase();
  }

  private loaders = {
    loadOne: new DataLoader((identifiers: number[]) =>
      Promise.all(identifiers.map((id) => this.findOne(id)))
    ),
    loadMany: new DataLoader((args: any[]) => {
      const promises = args.map(({ where, limit }) => {
        return this.findMany(where, limit);
      });
      return Promise.all(promises);
    }),
    loadRelated: new DataLoader((options: any[]) => {
      const promises = options.map((option) => {
        return this.findRelated(option.id, option.relation);
      });
      return Promise.all(promises);
    }),
  };

  async getOne(id: number) {
    return await this.loaders.loadOne.load(id);
  }

  async getMany(where: any, limit: number) {
    return await this.loaders.loadMany.load({
      where: where || {},
      limit: limit || undefined,
    });
  }

  async getRelated(id: number, relation: string) {
    return await this.loaders.loadRelated.load({ id, relation });
  }

  private findOne(id: number) {
    console.log(
      `[${this.entity}] Retrieving the instance with identifier: ${id}`
    );
    try {
      return this.model.findUnique({ where: { id } });
    } catch (error) {
      console.error(
        `[${this.entity}] Unable to retrieve instance with identifier: ${id}`
      );
      throwError(
        `[${this.entity}] Unable to retrieve instance with identifier: ${id}`
      );
    }
  }

  private findMany(where?: any, limit?: number) {
    console.log(`[${this.entity}] Retrieving instances with where clause:`);
    console.log(where || "No where clause provided");
    console.log(limit || "No result limit provided");
    try {
      return this.model.findMany({
        where,
        take: limit,
      });
    } catch (error) {
      console.error(
        `[${this.entity}] Unable to retrieve instances with the where clause provided`
      );
      throwError(
        `[${this.entity}] Unable to retrieve instances with the where clause provided`
      );
    }
  }

  private findRelated(id: number, relation: string) {
    console.log(
      `[${this.entity}] Retrieving the related instances of ${relation} from the instance with identifier: ${id}`
    );
    try {
      return this.model.findUnique({ where: { id } })[relation]();
    } catch (error) {
      console.error(
        `[${this.entity}] Unable to retrieve the related instances of ${relation} from the instance with identifier: ${id}`
      );
      throwError(
        `[${this.entity}] Unable to retrieve the related instances of ${relation} from the instance with identifier: ${id}`
      );
    }
  }
}

function throwError(message: string) {
  throw new GraphQLError(message, {
    extensions: {
      code: "BAD_USER_INPUT",
      http: {
        status: 400,
      },
    },
  });
}

export default PrismaDataSource;
