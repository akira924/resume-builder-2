<script lang="ts">
  let prompt = $state('');
</script>

<div class="max-w-2xl mx-auto space-y-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Prompt</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Provide instructions to tailor the resume generation to your needs.</p>
  </div>

  <section class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Custom Prompt</h2>

    <div class="space-y-1.5">
      <label for="prompt" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Prompt
      </label>
      <textarea
        id="prompt"
        bind:value={prompt}
        rows={8}
        placeholder="e.g. Emphasise leadership experience and quantify achievements where possible..."
        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
      ></textarea>
    </div>
  </section>
</div>
