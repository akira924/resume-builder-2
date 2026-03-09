<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }
  let { children }: Props = $props();
</script>

<aside class="w-60 shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-700">
  <nav class="flex-1 overflow-y-auto p-4 space-y-2">
    {#if children}
      {@render children()}
    {:else}
      <a href="#personal" class="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Personal Info</a>
      <a href="#experience" class="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Experience</a>
      <a href="#education" class="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Education</a>
      <a href="#skills" class="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Skills</a>
      <a href="#projects" class="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Projects</a>
    {/if}
  </nav>
</aside>
