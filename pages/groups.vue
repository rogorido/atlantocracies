<template>
  <div>
    <h1 class="text-center">Analyzing groups</h1>
    <SearchMacroTablePersons :persons="persons" />

    <h2 class="text-center uppercase">Global insights</h2>
    <SearchInsights />
  </div>
</template>

<script setup>
import { usePersonsStore } from "@/stores/personsStore";

const store = usePersonsStore();
const { persons } = storeToRefs(store);

</script>
