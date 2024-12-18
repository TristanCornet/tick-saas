import { api } from '$lib/api';
import type { Ticket } from '../../app';

export const load = async () => {
	const query = {
		query: `
            query {
                tickets(limit: 1050) {
                    id
                    title
                    description
										status
                    priority
										created_at
					
										team {
											name
										}
                }
            }
        `
	};

	try {
		const result = await api(query);

		let tickets: Array<Ticket> = result?.data.tickets;

		if (tickets.length > 100) {
			tickets = tickets.slice(0, 100);
		}

		return {
			tickets
		};
	} catch (e) {
		return {
			tickets: null
		};
	}
};
