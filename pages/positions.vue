<template>
  <div>
    <h1 class="text-center">Positions</h1>

    <PositionsTable :positions="positions" tabStyle="max-width: 50rem" />
  </div>
</template>

<script setup>
import { usePositionsStore } from "../stores/positionsStore";

const positionsstore = usePositionsStore();

const positions = ref([]);
const loaded = ref(false);

if (!positionsstore.initialized) {
  await positionsstore.fetchPositions();
}

positions.value = positionsstore.positions;
loaded.value = true;
</script>
