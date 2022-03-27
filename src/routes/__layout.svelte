<script lang="ts" context="module">
	import { store as authStore } from '$lib/auth';

	export async function load({ fetch }) {
		const res = await fetch('/api/auth/user');
		const { user } = await res.json();
		authStore.set({ 
			loading: false,
			user 
		});
		return {
			status: 200,
			context: {
				user
			}
		}
	}
</script>

<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import '../app.css';
  import { onMount } from 'svelte';

  onMount(async () => {
    // XXX: Temp workaround due to:
    // https://github.com/sveltejs/kit/issues/1198
    //
    // Also see:
    // https://github.com/sveltejs/kit/issues/696
    // https://github.com/sveltejs/kit/issues/672
    await fetch('/api/auth/user');
  })
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
