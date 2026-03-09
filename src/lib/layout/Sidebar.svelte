<script lang="ts">
  import { router } from '../router.svelte';

  const sections = [
    {
      title: 'Details',
      links: [
        { route: 'personal', label: 'Personal Info' },
        { route: 'experience', label: 'Experience' },
        { route: 'education', label: 'Education' },
      ],
    },
    {
      title: 'Overview',
      links: [
        { route: 'details', label: 'Details' },
        { route: 'prompt', label: 'Prompt' },
      ],
    },
  ];

  const linkBase = 'block px-3 py-2 rounded-md text-sm transition-colors';
  const linkActive = 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium';
  const linkIdle = 'hover:bg-gray-200 dark:hover:bg-gray-700';
</script>

<aside class="w-60 shrink-0 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-700">
  <nav class="flex-1 overflow-y-auto p-4">
    {#each sections as section, i}
      <div>
        <h3 class="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {section.title}
        </h3>
        <div class="space-y-1">
          {#each section.links as { route, label }}
            <a
              href="#{route}"
              class="{linkBase} {router.current === route ? linkActive : linkIdle}"
            >
              {label}
            </a>
          {/each}
        </div>
      </div>

      {#if i < sections.length - 1}
        <hr class="my-4 border-gray-200 dark:border-gray-700" />
      {/if}
    {/each}
  </nav>
</aside>
