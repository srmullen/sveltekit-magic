<script lang="ts">
	import { store as authStore } from './auth';

	$: auth = $authStore;
</script>

{#if auth.loading}
	<div>Loading...</div>
{:else if auth.user}
	<slot />
{:else}
	<slot name="unauthorized">
		<div>Unauthorized</div>
	</slot>
{/if}
