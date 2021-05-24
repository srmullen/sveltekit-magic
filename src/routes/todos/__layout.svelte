<script lang="ts" context="module">
	import { get } from 'svelte/store';
	import { store as authStore } from '$lib/auth';

	export function load() {
		const { user } = get(authStore);
		if (!user) {
			return {
				status: 302,
				redirect: '/auth'
			};
		}
		return {
			status: 200
		};
	};
</script>

<slot />
