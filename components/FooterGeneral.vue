<template>
  <footer>
    <div class="flex">
      <div>
        <a href="https://github.com/rogorido/atlantocracies"
          >AtlantoUI version</a
        >: {{ uiversion }}
      </div>
      <div>
        <a href="https://github.com/rogorido/apiatlantocracies">API version</a>:
        {{ stats.version }}
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useStatsStore } from "../stores/statsStore";
const config = useRuntimeConfig();
const uiversion = config.public.uiVersion;

const stats = ref({});
const statsstore = useStatsStore();

if (!statsstore.initialized) {
  await statsstore.fetchStats();
}
stats.value = statsstore.stats;
</script>

<style scoped>
footer {
  background-color: #f5f5f5;
}

.flex {
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  max-width: 1200px;
  align-items: center;
  margin: 0 auto;
}

a {
  text-decoration: none;
}
</style>
