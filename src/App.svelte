<script lang="ts">
  import Header from './lib/layout/Header.svelte'
  import Footer from './lib/layout/Footer.svelte'
  import Sidebar from './lib/layout/Sidebar.svelte'
  import Content from './lib/layout/Content.svelte'
</script>

<div class="h-screen flex flex-col">
  <Header />

  <div class="flex flex-1 overflow-hidden">
    <Sidebar />
    <Content>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Welcome</h1>
      <p class="text-gray-600">Select a section from the sidebar to start building your resume.</p>
    </Content>
  </div>

  <Footer />
</div>
