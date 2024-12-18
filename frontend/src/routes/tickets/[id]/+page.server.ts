import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { Ticket } from '../../../app.js';
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
                    created_at
                    
                    tasks {
                        id
                        status
                        title
                        description
                        created_at
                    }

                    user {
                        name
                    }

                    comments {
                        content
                        created_at
                        user {
                            name
                        }
                    }
										
                    team {
                        name
                    }
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

		const ticket: Ticket = result.data.ticket;

		return {
			ticket
		};
	} catch (e) {
		error(404, 'This ticket does not exist');
	}
};

export const actions = {
	task_status: async ({ request, fetch }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id') as string);
		const status = parseInt(data.get('status') as string);

		const mutation = {
			query: `
			mutation Mutation($data: UpdatedTask!) {
				updateTask(data: $data) {
					title
				}
			},
            `,
			variables: {
				data: {
					id,
					status
				}
			}
		};

		const response = await fetch(env.PUBLIC_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(mutation)
		});

		const result = await response.json();

		console.log(result);

		if (result.errors && result.errors.length) {
			console.log(result.errors);
			error(400, 'Does the mutation exist?');
		}
	},

	delete: async ({ request, fetch }) => {
		const data = await request.formData();

		const ticket_id = parseInt(data.get('ticket_id') as string);

		const query = {
			query: `
				mutation Mutation($deleteTicketId: Int!) {
					deleteTicket(id: $deleteTicketId) {
					id
					}
				}
            `,
			variables: {
				deleteTicketId: ticket_id
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
	},
	status: async ({ request, fetch }) => {
		const data = await request.formData();

		const ticket_id = parseInt(data.get('ticket_id') as string);
		const status = parseInt(data.get('status') as string);

		let newStatus = 1;

		if (status !== 2) {
			newStatus = 2;
		}

		const query = {
			query: `
                mutation UpdateTicket($data: UpdatedTicket!) {
                    updateTicket(data: $data) {
                        status
                    }
                }
            `,
			variables: {
				data: {
					id: ticket_id,
					status: newStatus
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
			return fail(400, { errors: result.erros });
		}

		redirect(303, '/tickets');
	}
} satisfies Actions;
