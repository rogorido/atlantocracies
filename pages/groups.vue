<template>
  <div class="p-container-fluid">
    <h1 class="text-center">Details</h1>

    <div class="flex justify-content-center gap-3 mt-4 mb-4">
      <NuxtLink to="#insights">
        <Button label="View insights" rounded />
      </NuxtLink>

      <NuxtLink to="#relations">
        <Button label="View relations" rounded />
      </NuxtLink>

      <NuxtLink to="#marriages">
        <Button label="View marriages" rounded />
      </NuxtLink>

      <NuxtLink to="#places">
        <Button label="View related places" rounded />
      </NuxtLink>
    </div>
  </div>

  <DividerShape />

  <div class="p-container-fluid">
    <!-- Macro tabla de personas. -->
    <SearchMacroTablePersons />

    <DividerShape />
    <div id="insights">
      <h2 class="text-center uppercase">Global insights</h2>
      <SearchInsights />
    </div>

    <DividerShape />
    <div v-if="status === 'pending'">Loading data...</div>
    <section id="relations" v-else>
      <h3 class="text-center uppercase">Relations</h3>

      <LazyGroupsRelationsMain
        :personsRelatedCyto="data.personsRelationsCyto"
        :personsRelated="data.personsRelationsTable"
        :placesRelated="data.placesRelated"
      />
    </section>
    <ScrollTop target="window" :threshold="100" icon="pi pi-arrow-up" />
  </div>
</template>

<script setup>
// import { usePersonsStore } from "@/stores/personsStore";
definePageMeta({
  middleware: ["protected"],
});

import { useFilterStore } from "@/stores/filterStore";

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

// const store = usePersonsStore();
// const { persons } = storeToRefs(store);

const storefilter = useFilterStore();
const { filter } = storeToRefs(storefilter);

// NOTE: no veo diferencia usando uselazyfetch... por qué?
// const { data, status, error } = await useFetch(`${api}/groups`, {
const { data, status, error } = await useFetch(`${api}/groups`, {
  method: "POST",
  body: filter.value,
});

provide("persons", data.value.personsDetails);
</script>
