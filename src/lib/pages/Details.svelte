<script lang="ts">
  let summary = $state('');
</script>

<div class="max-w-2xl mx-auto space-y-8">
  <div>
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Details</h1>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Review and fine-tune the details that will appear on your resume.</p>
  </div>

  <section class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
    <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Professional Summary</h2>

    <div class="space-y-1.5">
      <label for="summary" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Summary
      </label>
      <textarea
        id="summary"
        bind:value={summary}
        rows={5}
        placeholder="Write a brief professional summary highlighting your key skills and experience..."
        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
      ></textarea>
    </div>
  </section>
</div>
