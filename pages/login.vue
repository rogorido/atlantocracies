// components/LoginForm.vue
<template>
  <div class="p-container">
    <h2 class="text-center">Login Page</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4 mt-5">
        <InputText
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <InputText
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>

      <Button
        type="submit"
        class="w-full px-4 py-2 rounded mb-4"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : "Login" }}
      </Button>

      <p v-if="error" class="mt-4 text-red-500">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { InputText } from "primevue";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function handleSubmit() {
  loading.value = true;
  error.value = "";

  try {
    const success = await authStore.login(email.value, password.value);
    if (success) {
      router.push("/");
    } else {
      error.value = "Invalid credentials";
    }
  } catch (e) {
    error.value = "An error occurred";
  } finally {
    loading.value = false;
  }
}
</script>
