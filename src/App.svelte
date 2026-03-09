<script lang="ts">
  import Header from './lib/layout/Header.svelte'
  import Footer from './lib/layout/Footer.svelte'
  import Sidebar from './lib/layout/Sidebar.svelte'
  import Content from './lib/layout/Content.svelte'
  import { theme } from './lib/theme.svelte'
</script>

<div class="h-screen flex flex-col" class:dark={theme.dark}>
  <Header />

  <div class="flex flex-1 overflow-hidden">
    <Sidebar />
    <Content>
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Welcome</h1>
      <p class="text-gray-600 dark:text-gray-400">Select a section from the sidebar to start building your resume.</p>
    </Content>
  </div>

  <Footer />
</div>
