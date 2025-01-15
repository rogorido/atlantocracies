<template>
  <div class="p-container">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <MainPageBlocksData :stats="stats" class="mt-5" />
    </div>
    <MainPageDescriptions />
  </div>
</template>

<script setup>
import { useStatsStore } from "../stores/statsStore";
import { useFilterStore } from "../stores/filterStore";
import { useAuthStore } from "../stores/auth";

const stats = ref({});
const statsstore = useStatsStore();
const filterstore = useFilterStore();
const authstore = useAuthStore();

const { filter } = storeToRefs(filterstore);

const loading = ref(true);

if (!statsstore.initialized) {
  await statsstore.fetchStats();
}
stats.value = statsstore.stats;

loading.value = false;

// TODO: en teoría habría que hacerlo con el callOnce de <nuxt>
// pero no sé si es posible con el async?
onMounted(() => {
  if (process.client) {
    if (localStorage.getItem("filter")) {
      const filterstring = localStorage.getItem("filter");

      if (filterstring) {
        filter.value = JSON.parse(filterstring);
      }
    }
  }
});

await callOnce(async () => {
  console.log("This will only be logged once");
  await authstore.checkAuth();
});
</script>
