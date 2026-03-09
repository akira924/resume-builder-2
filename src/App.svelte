<script lang="ts">
  import Header from './lib/layout/Header.svelte'
  import Footer from './lib/layout/Footer.svelte'
  import Sidebar from './lib/layout/Sidebar.svelte'
  import Content from './lib/layout/Content.svelte'
  import PersonalInfo from './lib/pages/PersonalInfo.svelte'
  import Experience from './lib/pages/Experience.svelte'
  import Education from './lib/pages/Education.svelte'
  import { theme } from './lib/theme.svelte'
  import { router } from './lib/router.svelte'
</script>

<div class="h-screen flex flex-col" class:dark={theme.dark}>
  <Header />

  <div class="flex flex-1 overflow-hidden">
    <Sidebar />
    <Content>
      {#if router.current === 'personal'}
        <PersonalInfo />
      {:else if router.current === 'experience'}
        <Experience />
      {:else if router.current === 'education'}
        <Education />
      {:else}
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Welcome</h1>
        <p class="text-gray-600 dark:text-gray-400">Select a section from the sidebar to start building your resume.</p>
      {/if}
    </Content>
  </div>

  <Footer />
</div>
