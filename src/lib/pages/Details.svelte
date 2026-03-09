<script lang="ts">
  import { resume } from '../resume.svelte';

  const p = $derived(resume.personal);
  const hasLinks = $derived(p.linkedin || p.github || p.website);
  const filledExperience = $derived(resume.experience.filter((r) => r.company));
  const filledEducation = $derived(resume.education.filter((r) => r.institution));
  const filledCertifications = $derived(resume.certifications.filter((r) => r.certification));

  const cardClass =
    'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6';
  const labelClass = 'text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500';
  const valueClass = 'text-sm text-gray-900 dark:text-gray-100';
  const emptyClass = 'text-sm italic text-gray-400 dark:text-gray-500';

  const editBtnClass =
    'inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors';
</script>

<div class="max-w-3xl mx-auto space-y-8">
  <!-- Page Header -->
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Resume Overview</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Review all the information that will be used to generate your resume.
    </p>
  </div>

  <!-- Personal Information -->
  <section class="{cardClass} space-y-5">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Personal Information</h2>
      <a href="#personal" class={editBtnClass}>
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
        </svg>
        Edit
      </a>
    </div>

    {#if p.fullName}
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-xl font-bold text-blue-600 dark:text-blue-400">
          {p.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">{p.fullName}</p>
          {#if p.location}
            <p class="text-sm text-gray-500 dark:text-gray-400">{p.location}</p>
          {/if}
        </div>
      </div>
    {/if}

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      <div>
        <p class={labelClass}>Email</p>
        <p class={p.email ? valueClass : emptyClass}>{p.email || 'Not provided'}</p>
      </div>
      <div>
        <p class={labelClass}>Phone</p>
        <p class={p.phone ? valueClass : emptyClass}>{p.phone || 'Not provided'}</p>
      </div>
      <div>
        <p class={labelClass}>Location</p>
        <p class={p.location ? valueClass : emptyClass}>{p.location || 'Not provided'}</p>
      </div>
    </div>

    {#if hasLinks}
      <div class="border-t border-gray-100 dark:border-gray-700 pt-4">
        <p class="{labelClass} mb-3">Online Presence</p>
        <div class="flex flex-wrap gap-3">
          {#if p.linkedin}
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
          {/if}
          {#if p.github}
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          {/if}
          {#if p.website}
            <a href={p.website} target="_blank" rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z"/></svg>
              Website
            </a>
          {/if}
        </div>
      </div>
    {/if}
  </section>

  <!-- Work Experience -->
  <section class="{cardClass} space-y-5">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Work Experience</h2>
        {#if filledExperience.length > 0}
          <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
            {filledExperience.length}
          </span>
        {/if}
      </div>
      <a href="#experience" class={editBtnClass}>
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
        </svg>
        Edit
      </a>
    </div>

    {#if filledExperience.length === 0}
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <svg class="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        <p class={emptyClass}>No experience added yet.</p>
        <a href="#experience" class="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">Add experience</a>
      </div>
    {:else}
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        {#each filledExperience as row (row.id)}
          <div class="py-4 first:pt-0 last:pb-0">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="font-medium text-gray-900 dark:text-gray-100">{row.company}</p>
                <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                  {#if row.period}
                    <span class="inline-flex items-center gap-1">
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                      {row.period}
                    </span>
                  {/if}
                  {#if row.location}
                    <span class="inline-flex items-center gap-1">
                      <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                      {row.location}
                    </span>
                  {/if}
                </div>
              </div>
              <span class="shrink-0 rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                {row.bulletPoints} bullet{row.bulletPoints !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Education -->
  <section class="{cardClass} space-y-5">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Education</h2>
        {#if filledEducation.length > 0}
          <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
            {filledEducation.length}
          </span>
        {/if}
      </div>
      <a href="#education" class={editBtnClass}>
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
        </svg>
        Edit
      </a>
    </div>

    {#if filledEducation.length === 0}
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <svg class="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
        <p class={emptyClass}>No education added yet.</p>
        <a href="#education" class="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">Add education</a>
      </div>
    {:else}
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        {#each filledEducation as row (row.id)}
          <div class="py-4 first:pt-0 last:pb-0">
            <p class="font-medium text-gray-900 dark:text-gray-100">{row.institution}</p>
            {#if row.degreeMajor}
              <p class="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{row.degreeMajor}</p>
            {/if}
            <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
              {#if row.period}
                <span class="inline-flex items-center gap-1">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
                  {row.period}
                </span>
              {/if}
              {#if row.location}
                <span class="inline-flex items-center gap-1">
                  <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                  {row.location}
                </span>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <!-- Certifications -->
  <section class="{cardClass} space-y-5">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Certifications</h2>
        {#if filledCertifications.length > 0}
          <span class="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
            {filledCertifications.length}
          </span>
        {/if}
      </div>
      <a href="#education" class={editBtnClass}>
        <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
        </svg>
        Edit
      </a>
    </div>

    {#if filledCertifications.length === 0}
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <svg class="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
        <p class={emptyClass}>No certifications added yet.</p>
        <a href="#education" class="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">Add certification</a>
      </div>
    {:else}
      <div class="divide-y divide-gray-100 dark:divide-gray-700">
        {#each filledCertifications as row (row.id)}
          <div class="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="font-medium text-gray-900 dark:text-gray-100">{row.certification}</p>
              {#if row.institution}
                <p class="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{row.institution}</p>
              {/if}
            </div>
            {#if row.period}
              <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">{row.period}</span>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </section>
</div>
