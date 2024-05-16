<template>
  <div>
    <h1 class="text-center">Relations</h1>

    <RelationsTable :relations="relations" tabStyle="max-width: 50rem" />
  </div>
</template>

<script setup>
import { useRelationsStore } from "../stores/relationsStore";

const relationsstore = useRelationsStore();

const relations = ref([]);
const loaded = ref(false);

const config = useRuntimeConfig();
const api = config.public.apiBaseUrl;

if (!relationsstore.initialized) {
  await relationsstore.fetchRelations();
}

relations.value = relationsstore.relations;
loaded.value = true;
</script>
