import type { HandleFetch } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

// Necessary for fetch on server side when deployed
export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	if (request.url.startsWith(env.PUBLIC_API_URL)) {
		request = new Request(request.url.replace(env.PUBLIC_API_URL, 'http://api:4005'), request);
	}
	return fetch(request);
};
