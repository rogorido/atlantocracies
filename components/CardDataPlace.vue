<template>
  <div class="col">
    <Card>
      <template #title>Births</template>
      <template #content>
        <p class="numero">
          {{ place.totalbirths != null ? place.totalbirths : 0 }}
        </p>
      </template>
    </Card>
  </div>
  <div class="col">
    <Card>
      <template #title>Deaths</template>
      <template #content>
        <p class="m-0">
          {{ place.totaldeaths != null ? place.totaldeaths : 0 }}
        </p>
      </template>
    </Card>
  </div>
  <div class="col">
    <Card>
      <template #title>Events</template>
      <template #content>
        <p class="m-0">
          {{ place.totalevents != null ? place.totalevents : 0 }}
        </p>
      </template>
    </Card>
  </div>
  <div class="col">
    <Card>
      <template #title>Positions</template>
      <template #content>
        <p class="m-0">
          {{ place.totalpositions != null ? place.totalpositions : 0 }}
        </p>
      </template>
    </Card>
  </div>
  <div class="col">
    <Card>
      <template #title>Relations</template>
      <template #content>
        <p class="m-0">
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
</style>
