<template>
  <div class="p-container">
    <h1 class="text-center">Positions</h1>

    <div class="grid">
      <div class="col-12 lg:col-6">
        <div class="flex showdata">
          <div>Total type of positions</div>
          <div class="numero">
            {{ positions.length }}
          </div>
        </div>

        <p>
          Our datababase contains information about the titles held by the
          persons. If you click on a row, you will get details about the
          selected title (which persons held it, where and when was it granted,
          etc.).
        </p>
        <p v-show="!authStore.isAuthenticated">
          You have to be
          <Button as="router-link" label="logged in" to="/login" /> in order to
          see the details!
        </p>
      </div>
      <div class="col-12 lg:col-6">
        <PositionsTable :positions="positions" tabStyle="max-width: 50rem" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePositionsStore } from "../stores/positionsStore";
import { useAuthStore } from "../stores/auth";

const positionsstore = usePositionsStore();
const authStore = useAuthStore();

const positions = ref([]);
const loaded = ref(false);

if (!positionsstore.initialized) {
  await positionsstore.fetchPositions();
}

positions.value = positionsstore.positions;
loaded.value = true;
</script>

<style scoped>
.numero {
  font-size: 1.9rem;
  color: #fff;
  background-color: #af2f14;
  width: 80px;
  border-radius: 50% 20% / 10% 40%;
  text-align: right;
}

.showdata {
  border: 3px dashed var(--primary-color);
  padding: 10px;
  justify-content: space-between;
  font-size: 1.6rem;
  align-items: center;
  margin-bottom: 10px;
}
</style>
