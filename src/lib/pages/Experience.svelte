<script lang="ts">
  import { resume } from '../resume.svelte';

  const inputClass =
    'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';
</script>

<div class="max-w-2xl mx-auto space-y-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Experience</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Add your work experience, most recent first.</p>
  </div>

  {#each resume.experience as row, i (row.id)}
    <section class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Position {i + 1}</h2>

        {#if resume.experience.length > 1}
          <button
            type="button"
            onclick={() => resume.removeExperience(row.id)}
            class="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        {/if}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="space-y-1.5">
          <label for="company-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company Name <span class="text-red-500">*</span>
          </label>
          <input
            id="company-{row.id}"
            type="text"
            bind:value={row.company}
            placeholder="Acme Corp"
            required
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="period-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Period <span class="text-red-500">*</span>
          </label>
          <input
            id="period-{row.id}"
            type="text"
            bind:value={row.period}
            placeholder="Jan 2023 – Present"
            required
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="location-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            id="location-{row.id}"
            type="text"
            bind:value={row.location}
            placeholder="New York, NY"
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="bullets-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bullet Points
          </label>
          <input
            id="bullets-{row.id}"
            type="number"
            bind:value={row.bulletPoints}
            min="1"
            max="10"
            class={inputClass}
          />
        </div>
      </div>
    </section>
  {/each}

  <button
    type="button"
    onclick={resume.addExperience}
    class="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 py-3.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
  >
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Position
    </span>
  </button>
</div>
