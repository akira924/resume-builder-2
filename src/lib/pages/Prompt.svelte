<script lang="ts">
  import { resume } from '../resume.svelte';

  const filledExperience = $derived(resume.experience.filter((r) => r.company));
  const filledEducation = $derived(resume.education.filter((r) => r.degreeMajor));

  const candidateProfile = $derived.by(() => {
    const lines: string[] = [];

    if (filledExperience.length > 0) {
      lines.push('EXPERIENCE');
      for (const row of filledExperience) {
        const parts = [row.company];
        if (row.period) parts.push(row.period);
        lines.push(`- ${parts.join(' | ')}`);
      }
    }

    if (filledEducation.length > 0) {
      if (lines.length > 0) lines.push('');
      lines.push('EDUCATION');
      for (const row of filledEducation) {
        lines.push(`- ${row.degreeMajor}`);
      }
    }

    return lines.join('\n');
  });

  const sentenceCount = $derived.by(() => {
    return filledExperience
      .map((row) => `- ${row.company}: ${row.bulletPoints} sentences`)
      .join('\n');
  });

  const promptText = $derived.by(() => {
    return [
      'You are an expert resume writer.',
      'Your task is to generate a professional resume tailored to the provided job description based on the candidate\'s profile.',
      '',
      '----------------------------------------',
      'CANDIDATE PROFILE',
      '----------------------------------------',
      candidateProfile,
      '',
      '----------------------------------------',
      'JOB DESCRIPTION VALIDATION RULES',
      '----------------------------------------',
      'If any rule below is triggered, DO NOT generate resume JSON and return ONLY plain text error message.',
      '1. If the job requires any type of security clearance',
      '2. If the job requires on-site or hybrid work and remote work is not allowed for the candidate\'s location',
      'If none of the above rules apply, proceed to generate the resume JSON.',
      '',
      '----------------------------------------',
      'OUTPUT RULES',
      '----------------------------------------',
      '- Return ONLY one valid JSON object with the following structure:',
      '{',
      '  "role": "",',
      '  "summary": "",',
      '  "skills": [',
      '    { "Category1": ["Skill1", "Skill2", "..."] }',
      '  ],',
      '  "experience": [',
      '    {',
      '      "title": "",',
      '      "sentences": [',
      '        "Sentence 1",',
      '        "Sentence 2"',
      '      ]',
      '    }',
      '  ],',
      '  "education": [',
      '    "Degree1"',
      '  ]',
      '}',
      '- The JSON must appear inside a single code block.',
      '- Do not include text before or after the code block.',
      '- Do not include explanations or comments.',
      '- Do not ask questions.',
      '- Do not generate multiple code blocks.',
      '',
      '----------------------------------------',
      'CONTENT RULES',
      '----------------------------------------',
      'ROLE',
      '- 2\u20134 words',
      '- Common industry title aligned with the job description',
      '- Seniority must match the candidate\u2019s total years of experience',
      '',
      'SUMMARY',
      '- 3-5 sentences',
      '- Professional, concise, ATS-optimized',
      '- Directly aligned with the job description',
      '',
      'SKILLS',
      '- 30\u201340 total skills',
      '- Grouped into categories',
      '- Must include technologies from the job description',
      '- Only include technologies that existed during the candidate\u2019s work period',
      '',
      '----------------------------------------',
      'EXPERIENCE RULES (VERY IMPORTANT)',
      '----------------------------------------',
      '',
      'JOB TITLES',
      '- 2\u20134 words',
      '- Common industry titles aligned with the job description',
      '- Must follow a logical career progression',
      '',
      'SENTENCE FORMAT',
      '- Third-person only',
      '- Each sentence: 150\u2013220 characters',
      '- Each sentence must end with a period',
      '- Each sentence contain detailed, technically rich descriptions of your role, specific contributions, and technologies used.',
      '- Each experience must reference company industry relevance',
      '- No bullet symbols',
      '- No vague or generic statements',
      '- Special characters allowed only for technical terms',
      '- Only include technologies that existed during the candidate\u2019s work period',
      '',
      'SENTENCE COUNT PER COMPANY',
      sentenceCount,
      '',
      '----------------------------------------',
      'EDUCATION RULES',
      '----------------------------------------',
      '- Modify the degree only if it is unrelated to the job description',
      '- Degrees must be relevant to the role',
      '- Use common industry degrees',
      '',
      '----------------------------------------',
      'FINAL VALIDATION',
      '----------------------------------------',
      '- All technologies mentioned in the job description are included.',
      '- All experience sentences are 150\u2013220 characters.',
      '- Each company has the required number of sentences.',
      '- Job titles align with the job description and career progression.',
      '- The output is a single valid JSON object.',
      '',
      '----------------------------------------',
      'JOB DESCRIPTION',
      '----------------------------------------',
      '',
    ].join('\n');
  });

  let copied = $state(false);

  async function copyPrompt() {
    await navigator.clipboard.writeText(promptText);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">AI Prompt</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Copy this prompt and paste it into your AI tool along with the job description.
    </p>
  </div>

  <section class="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Prompt Preview</span>
      <button
        type="button"
        onclick={copyPrompt}
        class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer {copied
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
      >
        {#if copied}
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Copied
        {:else}
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
          Copy
        {/if}
      </button>
    </div>

    <pre class="px-6 py-5 text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words overflow-auto max-h-[70vh] font-mono">{promptText}</pre>
  </section>
</div>
