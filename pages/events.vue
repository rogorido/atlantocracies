<template>
  <div>
    <h1 class="text-center">Events</h1>

    <EventsTable :eventsrelated="events" tabStyle="max-width: 50rem" />
  </div>
</template>

<script setup>
import { useEventsStore } from "../stores/eventsStore";

const eventsstore = useEventsStore();

const events = ref([]);
const loaded = ref(false);

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

if (!eventsstore.initialized) {
  await eventsstore.fetchEvents();
}

events.value = eventsstore.events;
loaded.value = true;
</script>
