<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }
  let { children }: Props = $props();
</script>

<main class="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
  {#if children}
    {@render children()}
  {:else}
    <p class="text-gray-500">Select a section from the sidebar to get started.</p>
  {/if}
</main>
