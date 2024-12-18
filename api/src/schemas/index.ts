import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configuration = {
  directives: {
    repository: "./directives",
    files: ["CacheControl"],
  },
  types: {
    repository: "./types",
    files: ["Comment", "Task", "Team", "Ticket", "User", "TicketRelation"],
  },
  queries: {
    repository: "./",
    files: ["Query"],
  },
  mutations: {
    repository: "./",
    files: ["Mutation"],
  },
};

function read(type: string) {
  const { repository, files } = configuration[type];
  return files
    .map((file: any) =>
      readFileSync(join(__dirname, repository, `${file}.graphql`))
    )
    .join("\n");
}

const directives = read("directives");
const types = read("types");
const queries = read("queries");
const mutations = read("mutations");

// Construct the combined GraphQL schema from individual parts.
export default `#graphql
${directives}
${types}
${queries}
${mutations}
`;
