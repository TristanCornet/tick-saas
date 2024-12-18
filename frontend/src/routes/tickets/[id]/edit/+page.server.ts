import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { Team, Ticket } from '../../../../app';
import { env } from '$env/dynamic/public';

export const load = async ({ params, fetch }) => {
	const { id } = params;

	const query = {
		query: `
            query {
                ticket(id: ${id}) {
                    id
                    title
                    description
                    status
                    priority
                    
                    team {
                        id
                    }
                }

                teams(where: null, limit: 100) {
                    id
                    name
                }
            }
        `
	};

	try {
		const response = await fetch(env.PUBLIC_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(query)
		});

		const result = await response.json();

		const ticket: Ticket = result?.data.ticket;
		const teams: Array<Team> = result?.data.teams;

		return { ticket, teams };
	} catch (e) {
		console.log(e);
		error(400, 'Cannot get teams list');
	}
};

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		const ticket_id = parseInt(data.get('ticket_id') as string);
		const team_id = parseInt(data.get('team_id') as string);
		const user_id = parseInt(data.get('user_id') as string);
		const title = data.get('title');
		const description = data.get('description');
		const priority = parseInt(data.get('priority') as string);

		const query = {
			query: `       
                mutation Mutation($data: UpdatedTicket!) {
                    updateTicket(data: $data) {
                        title
                        description
                        priority
                        created_at
                        updated_at
                    }
                }
            `,
			variables: {
				data: {
					id: ticket_id,
					team_id,
					user_id,
					title,
					description,
					priority
				}
			}
		};

		const response = await fetch(env.PUBLIC_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(query)
		});

		const result = await response.json();

		if (result.errors && result.errors.length) {
			return fail(400, { errors: result.errors });
		}

		redirect(303, '/tickets');
	}
} satisfies Actions;
