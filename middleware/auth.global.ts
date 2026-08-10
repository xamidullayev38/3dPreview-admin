export default defineNuxtRouteMiddleware((to) => {
  const auth = useCookie('admin_auth');

  // If not authenticated and trying to access any page other than /login, redirect to /login
  if (!auth.value && to.path !== '/login') {
    return navigateTo('/login');
  }

  // If authenticated and trying to access /login, redirect to home page /
  if (auth.value && to.path === '/login') {
    return navigateTo('/');
  }
});
