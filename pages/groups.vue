<template>
  <div>
    <h1 class="text-center">Analyzing groups</h1>
    <SearchMacroTablePersons :persons="persons" />

    <h2 class="text-center uppercase">Global insights</h2>
    <SearchInsights />
    <div v-if="pending">Cargando datos...</div>
    <GroupsRelationsGraph :personsrelatedcyto="data.personsrelationscyto" :personsrelated="data.personsrelationstable"
      v-else />
  </div>
</template>

<script setup>
import { usePersonsStore } from "@/stores/personsStore";
import { useFilterStore } from "@/stores/filterStore";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

const store = usePersonsStore();
const { persons } = storeToRefs(store);

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);


const { data, pending, error } = await useFetch(`${api}/groups`, {
  method: "POST",
  body:
    filter.value,
});

console.log(data.value.personsrelationscyto);

</script>
