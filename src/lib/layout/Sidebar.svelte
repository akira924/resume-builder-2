<script lang="ts">
  import { router } from '../router.svelte';

  const links = [
    { route: 'personal', label: 'Personal Info' },
    { route: 'experience', label: 'Experience' },
    { route: 'education', label: 'Education' },
  ];
</script>

<aside class="w-60 shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-700">
  <nav class="flex-1 overflow-y-auto p-4 space-y-1">
    {#each links as { route, label }}
      <a
        href="#{route}"
        class="block px-3 py-2 rounded-md transition-colors {router.current === route
          ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700'}"
      >
        {label}
      </a>
    {/each}
  </nav>
</aside>
