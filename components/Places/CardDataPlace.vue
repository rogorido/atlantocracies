<template>
  <div class="list-items">
    <Card>
      <template #title>Births</template>
      <template #content>
        <p class="numero">
          {{ place.totalbirths != null ? place.totalbirths : 0 }}
        </p>
      </template>
    </Card>

    <Card>
      <template #title>Deaths</template>
      <template #content>
        <p class="numero">
          {{ place.totaldeaths != null ? place.totaldeaths : 0 }}
        </p>
      </template>
    </Card>

    <Card>
      <template #title>Events</template>
      <template #content>
        <p class="numero">
          {{ place.totalevents != null ? place.totalevents : 0 }}
        </p>
      </template>
    </Card>

    <Card>
      <template #title>Positions</template>
      <template #content>
        <p class="numero">
          {{ place.totalpositions != null ? place.totalpositions : 0 }}
        </p>
      </template>
    </Card>

    <Card>
      <template #title>Relations</template>
      <template #content>
        <p class="numero">
          {{ place.totalrelations != null ? place.totalrelations : 0 }}
        </p>
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({ place: { type: Object, required: true } });
</script>

<style scoped>
.numero {
  font-size: 2.4rem;
}

.p-card {
  /* border: 3px dashed #d12f0d; */
  border: 3px dashed var(--primary-color);
}

.list-items {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}
</style>
