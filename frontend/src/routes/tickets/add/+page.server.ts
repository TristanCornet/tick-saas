import { api } from '$lib/api';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { Team } from '../../../app';
import { env } from '$env/dynamic/public';

export const load = async ({ fetch }) => {
	const query = {
		query: `
            query {
                teams(where: null, limit: 10) {
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

		console.log(result);

		const teams: Array<Team> = result?.data.teams;

		return { teams };
	} catch (e) {
		console.log(e);
		error(400, 'Cannot get teams list');
	}
};

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		const team_id = parseInt(data.get('team_id') as string);
		const user_id = parseInt(data.get('user_id') as string);
		const title = data.get('title');
		const description = data.get('description');
		const priority = parseInt(data.get('priority') as string);

		const query = {
			query: `       
                mutation Mutation($data: NewTicket!) {
                    createTicket(data: $data) {
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
					team_id,
					user_id,
					title,
					description,
					status: 1,
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
