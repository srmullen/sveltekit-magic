<script lang="ts">
  import { onMount } from 'svelte';
  import { init } from './auth';

  onMount(() => {
    init();
  });
</script>

<slot />