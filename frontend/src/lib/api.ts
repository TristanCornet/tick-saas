import { env } from '$env/dynamic/public';

export const api = async (query: { query: string }) => {
	const response = await fetch(env.PUBLIC_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	});

	return await response.json();
};
