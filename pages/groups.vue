<template>
  <div>
    <h1 class="text-center">Analyzing groups</h1>
    <h2 class="text-center uppercase">Persons analyzed</h2>
    <PersonsTable :persons="groups.persons" />

    <h2 class="text-center uppercase">Global insights</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  groups: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
