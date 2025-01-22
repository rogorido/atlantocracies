<template>
  <div class="p-container">
    <h1 class="text-center">Events</h1>

    <div class="grid">
      <div class="col-12 lg:col-6">
        <p>
          Our datababase contains information about the titles held by the
          persons. If you click on a row, you will get details about the
          selected title (which persons held it, where and when was it granted,
          etc.).
        </p>
        <p v-show="!authStore.isAuthenticated">
          You have to be
          <Button as="router-link" label="logged in" to="/login" />logged in
          order to see the details!
        </p>
      </div>
      <div class="col-12 lg:col-6">
        <EventsTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
</script>
