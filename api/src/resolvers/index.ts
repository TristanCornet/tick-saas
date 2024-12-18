import Query from './Query';
import Mutation from './mutations';

import Ticket from './types/Ticket';
import Team from './types/Team';
import Comment from './types/Comment';
import Task from './types/Task';
import TicketRelation from './types/TicketRelation';
import User from './types/User';


const resolvers = {
    Query,
    Mutation,

    Ticket,
    Team,
    Comment,
    Task,
    TicketRelation,
    User,
}

export default resolvers;