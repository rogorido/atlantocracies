<template>
  <h1 class="text-center">
    Type of relation: {{ useRoute().params.titlebyid }}
  </h1>
  <div v-if="status === 'pending'">Loading data...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <SearchMacroTablePersons />
    <DividerShape />
  </div>
  <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
</template>

<script setup>
definePageMeta({
  middleware: ["protected"],
});

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// with useLazyFetch the page is loaded while the data is being fetched
// TODO: atención mirar esto del status que parece que no existe ya...
const { data, status, error } = await useFetch(
  `${api}/titles/${useRoute().params.titlebyid}`,
);

// provide tiene que ser usado en setup
provide("persons", readonly(data.value.personsAll));

const columnsRel = [
  { field: "_id", header: "Person" },
  { field: "infOrigin", header: "Origin" },
  { field: "totalInformations", header: "Informations" },
];
const columnsPositions = [
  { field: "_id", header: "Position" },
  { field: "count", header: "Total" },
];
</script>
