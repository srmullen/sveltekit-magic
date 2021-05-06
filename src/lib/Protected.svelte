<script lang="ts">
  import { store as authStore } from './auth';

  $: auth = $authStore;
</script>

{#if auth && auth.state === 'loading'}
  <div>Loading...</div>
{:else if auth && auth.user}
  <slot />
{/if}

