<script lang="ts">
  import { resume } from '../resume.svelte';

  const inputClass =
    'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20';
</script>

<div class="max-w-2xl mx-auto space-y-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Education</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Add your academic background and certifications.</p>
  </div>

  <!-- Education Section -->
  {#each resume.education as row, i (row.id)}
    <section class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Education {i + 1}</h2>

        {#if resume.education.length > 1}
          <button
            type="button"
            onclick={() => resume.removeEducation(row.id)}
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
          <label for="edu-institution-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Institution <span class="text-red-500">*</span>
          </label>
          <input
            id="edu-institution-{row.id}"
            type="text"
            bind:value={row.institution}
            placeholder="MIT"
            required
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="edu-degree-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Degree &amp; Major <span class="text-red-500">*</span>
          </label>
          <input
            id="edu-degree-{row.id}"
            type="text"
            bind:value={row.degreeMajor}
            placeholder="B.S. Computer Science"
            required
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="edu-period-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Period <span class="text-red-500">*</span>
          </label>
          <input
            id="edu-period-{row.id}"
            type="text"
            bind:value={row.period}
            placeholder="Sep 2019 – Jun 2023"
            required
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="edu-location-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            id="edu-location-{row.id}"
            type="text"
            bind:value={row.location}
            placeholder="Cambridge, MA"
            class={inputClass}
          />
        </div>
      </div>
    </section>
  {/each}

  <button
    type="button"
    onclick={resume.addEducation}
    class="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 py-3.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
  >
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Education
    </span>
  </button>

  <!-- Certification Section -->
  <div class="pt-2">
    <div>
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Certifications</h2>
      <p class="mt-0.5 text-xs text-gray-400 dark:text-gray-500">Optional — add any relevant certifications.</p>
    </div>
  </div>

  {#each resume.certifications as row, i (row.id)}
    <section class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Certification {i + 1}</h2>

        {#if resume.certifications.length > 0}
          <button
            type="button"
            onclick={() => resume.removeCertification(row.id)}
            class="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        {/if}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="space-y-1.5">
          <label for="cert-institution-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Institution
          </label>
          <input
            id="cert-institution-{row.id}"
            type="text"
            bind:value={row.institution}
            placeholder="AWS"
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="cert-name-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Certification
          </label>
          <input
            id="cert-name-{row.id}"
            type="text"
            bind:value={row.certification}
            placeholder="Solutions Architect"
            class={inputClass}
          />
        </div>

        <div class="space-y-1.5">
          <label for="cert-period-{row.id}" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Period
          </label>
          <input
            id="cert-period-{row.id}"
            type="text"
            bind:value={row.period}
            placeholder="Mar 2024"
            class={inputClass}
          />
        </div>
      </div>
    </section>
  {/each}

  <button
    type="button"
    onclick={resume.addCertification}
    class="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 py-3.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors cursor-pointer"
  >
    <span class="inline-flex items-center gap-1.5">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add Certification
    </span>
  </button>
</div>
