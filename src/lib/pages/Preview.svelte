<script lang="ts">
  import { resume } from '../resume.svelte';
  import { generateResumePdf } from '../pdf';

  interface ResumeData {
    role: string;
    summary: string;
    skills: Record<string, string[]>[];
    experience: { title: string; sentences: string[] }[];
    education: string[];
  }

  let parsed: ResumeData | null = $state(null);
  let parseError: string = $state('');
  let pasteConfirm: boolean = $state(false);
  let copyConfirm: boolean = $state(false);

  function tryParse(raw: string) {
    if (!raw.trim()) {
      parsed = null;
      parseError = '';
      return;
    }

    try {
      const clean = raw.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '').trim();
      const obj = JSON.parse(clean);
      parsed = obj as ResumeData;
      parseError = '';
    } catch (e: any) {
      parsed = null;
      parseError = e.message ?? 'Invalid JSON';
    }
  }

  $effect(() => {
    tryParse(resume.resumeJson);
  });

  function buildCompletedJson(): object | null {
    if (!parsed) return null;

    const p = resume.personal;
    const personal: Record<string, string> = {};
    if (p.fullName) personal.fullName = p.fullName;
    if (p.email) personal.email = p.email;
    if (p.phone) personal.phone = p.phone;
    if (p.location) personal.location = p.location;
    if (p.linkedin) personal.linkedin = p.linkedin;
    if (p.github) personal.github = p.github;
    if (p.website) personal.website = p.website;

    const experience = (parsed.experience ?? []).map((exp, i) => {
      const profile = resume.experience[i];
      return {
        ...(profile?.company ? { company: profile.company } : {}),
        ...(profile?.period ? { period: profile.period } : {}),
        ...(profile?.location ? { location: profile.location } : {}),
        title: exp.title,
        sentences: exp.sentences,
      };
    });

    const education = (parsed.education ?? []).map((degree, i) => {
      const profile = resume.education[i];
      return {
        ...(profile?.institution ? { institution: profile.institution } : {}),
        degree,
        ...(profile?.period ? { period: profile.period } : {}),
        ...(profile?.location ? { location: profile.location } : {}),
      };
    });

    const certs = resume.certifications
      .filter((c) => c.certification || c.institution)
      .map((c) => ({
        ...(c.institution ? { institution: c.institution } : {}),
        ...(c.certification ? { certification: c.certification } : {}),
        ...(c.period ? { period: c.period } : {}),
      }));

    return {
      ...(Object.keys(personal).length ? { personal } : {}),
      role: parsed.role,
      summary: parsed.summary,
      skills: parsed.skills,
      experience,
      education,
      ...(certs.length ? { certifications: certs } : {}),
    };
  }

  let completedJson: string = $derived.by(() => {
    const obj = buildCompletedJson();
    return obj ? JSON.stringify(obj, null, 2) : '';
  });

  async function handleCopyCompleted() {
    if (!completedJson) return;
    await navigator.clipboard.writeText(completedJson);
    copyConfirm = true;
    setTimeout(() => (copyConfirm = false), 1500);
  }

  function handleClear() {
    resume.resumeJson = '';
  }

  async function handlePaste() {
    const text = await navigator.clipboard.readText();
    resume.resumeJson = text;
    pasteConfirm = true;
    setTimeout(() => (pasteConfirm = false), 1500);
  }

  let downloading: boolean = $state(false);

  function handleDownloadPdf() {
    const obj = buildCompletedJson();
    if (!obj) return;
    downloading = true;
    try {
      const doc = generateResumePdf(obj as any);
      const name = resume.personal.fullName
        ? `${resume.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      doc.save(name);
    } finally {
      setTimeout(() => (downloading = false), 1200);
    }
  }

  const inputCls =
    'w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors font-mono';
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Preview</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Paste the AI-generated resume JSON to preview and use it.
    </p>
  </div>

  <!-- Section 1: JSON Input -->
  <section class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">JSON Input</span>
      <div class="flex items-center gap-2">
        <button
          type="button"
          onclick={handlePaste}
          class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {#if pasteConfirm}
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Pasted!
          {:else}
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
            Paste
          {/if}
        </button>
        {#if resume.resumeJson}
          <button
            type="button"
            onclick={handleClear}
            class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        {/if}
      </div>
    </div>

    <div class="p-6">
      <textarea
        bind:value={resume.resumeJson}
        placeholder='Paste the AI-generated JSON here...'
        rows="14"
        class={inputCls}
      ></textarea>

      {#if parseError}
        <p class="mt-2 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          {parseError}
        </p>
      {:else if parsed}
        <p class="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
          <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Valid JSON
        </p>
      {/if}
    </div>
  </section>

  <!-- Download PDF Button -->
  {#if parsed}
    <div class="flex justify-center">
      <button
        type="button"
        onclick={handleDownloadPdf}
        disabled={downloading}
        class="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all cursor-pointer shadow-md
          {downloading
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-blue-900/30 hover:shadow-lg'}"
      >
        {#if downloading}
          <svg class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Downloaded!
        {:else}
          <svg class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Resume PDF
        {/if}
      </button>
    </div>
  {/if}

  <!-- Section 2: Completed JSON (collapsible) -->
  {#if parsed}
    <section class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Completed JSON</span>
        <button
          type="button"
          onclick={handleCopyCompleted}
          class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {#if copyConfirm}
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Copied!
          {:else}
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0a2.25 2.25 0 0 1 .1-.664m5.8 0A48.667 48.667 0 0 0 12 2.25c-1.357 0-2.699.056-4.024.166" />
            </svg>
            Copy
          {/if}
        </button>
      </div>

      <div class="p-6">
        <pre class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-xs text-gray-800 dark:text-gray-200 font-mono overflow-x-auto max-h-[32rem] overflow-y-auto leading-relaxed">{completedJson}</pre>
      </div>
    </section>
  {/if}

  <!-- Section 3: Preview -->
  <section class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Preview</span>
    </div>

    <div class="p-6">
      {#if !parsed}
        <p class="text-sm text-gray-400 dark:text-gray-500 italic">Paste valid JSON above to see a preview.</p>
      {:else}
        <div class="space-y-6">
          <!-- Role -->
          {#if parsed.role}
            <div>
              <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{parsed.role}</h2>
            </div>
          {/if}

          <!-- Summary -->
          {#if parsed.summary}
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Summary</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{parsed.summary}</p>
            </div>
          {/if}

          <!-- Skills -->
          {#if parsed.skills?.length}
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Skills</h3>
              <div class="space-y-2">
                {#each parsed.skills as group}
                  {#each Object.entries(group) as [category, skills]}
                    <div>
                      <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{category}:</span>
                      <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">{skills.join(', ')}</span>
                    </div>
                  {/each}
                {/each}
              </div>
            </div>
          {/if}

          <!-- Experience -->
          {#if parsed.experience?.length}
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Experience</h3>
              <div class="space-y-4">
                {#each parsed.experience as exp, i}
                  <div class="pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                    <h4 class="text-sm font-medium text-gray-800 dark:text-gray-200">{exp.title}</h4>
                    <ul class="mt-1 space-y-1">
                      {#each exp.sentences as sentence}
                        <li class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{sentence}</li>
                      {/each}
                    </ul>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Education -->
          {#if parsed.education?.length}
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Education</h3>
              <ul class="space-y-1">
                {#each parsed.education as degree}
                  <li class="text-sm text-gray-700 dark:text-gray-300">{degree}</li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </section>
</div>
