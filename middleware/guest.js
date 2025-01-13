// The guest.js middleware handles redirecting authenticated users away
// from auth pages (like login and signup). This prevents logged-in users
// from accessing these pages unnecessarily, complementing the protected middleware
// by managing the opposite scenario.

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  const authStore = useAuthStore();
  await authStore.checkAuth();

  // If user is authenticated and trying to access auth pages (login/register)
  if (authStore.user) {
    return navigateTo("/");
  }
});
