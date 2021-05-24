<script lang="ts">
	import * as auth from '$lib/auth';
	import { goto } from '$app/navigation';

	let email = '';
	let submitting = false;

	async function login() {
		try {
			submitting = true;
			await auth.login(email);
			goto('/todos');
		} catch (err) {
			submitting = false;
			console.log(err);
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="content">
	<form on:submit|preventDefault={login}>
		<label for="email">Email</label>
		<input id="email" bind:value={email} />
		<div class="btn-container">
			<button type="submit">Login</button>
		</div>
	</form>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}

	form {
		width: 28rem;
		margin: auto;
		font-size: 1.5rem;
	}

	label {
		display: block;
		font-weight: bold;
		margin-bottom: 0.25rem;
	}

	input {
		margin-bottom: 0.75rem;
		width: 100%;
		padding: 0 0.5rem;
		box-sizing: border-box;
		height: 2.5rem;
	}

	button {
		width: 100%;
		background-color: var(--accent-color);
		color: white;
		border: none;
		height: 2.5rem;
		font-weight: bold;
		transition: background-color 0.2s ease-in-out;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--accent-hover);
	}
</style>
