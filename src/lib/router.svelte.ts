function createRouter() {
  let current = $state(location.hash.slice(1) || 'personal');

  function handleHashChange() {
    current = location.hash.slice(1) || 'personal';
  }

  window.addEventListener('hashchange', handleHashChange);

  return {
    get current() {
      return current;
    },
    navigate(route: string) {
      location.hash = route;
    },
  };
}

export const router = createRouter();
