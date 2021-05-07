<script lang="ts" context="module">
  export function load({ context }) {
    if (!context.user) {
      return {
        status: 302,
        redirect: '/auth'
      }
    }
    return {
      status: 200
    };
  }
</script>

<slot />