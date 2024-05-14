<template>
  <div class="grid">
    <div class="col-12 md:col-6 lg:col-4">
      <Card>
        <template #title>Total persons</template>
        <template #content>
          <p class="numero">
            {{ stats.totalPersons != null ? stats.totalPersons : 0 }}
          </p>
        </template>
      </Card>
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <Card>
        <template #title>Total places</template>
        <template #content>
          <p class="numero">
            {{ stats.totalPlaces != null ? stats.totalPlaces : 0 }}
          </p>
        </template>
      </Card>
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <Card>
        <template #title>Total positions</template>
        <template #content>
          <p>
            {{ stats.totalPositions != null ? stats.totalPositions : 0 }}
          </p>
        </template>
      </Card>
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <Card>
        <template #title>Total events</template>
        <template #content>
          <p>
            {{ stats.totalEvents != null ? stats.totalEvents : 0 }}
          </p>
        </template>
      </Card>
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <Card>
        <template #title>Total relations</template>
        <template #content>
          <p>
            {{ stats.totalRelations != null ? stats.totalRelations : 0 }}
          </p>
        </template>
      </Card>
    </div>
    <div class="col-12 md:col-6 lg:col-4">
      <Card>
        <template #title>Total titles</template>
        <template #content>
          <p>
            {{ stats.totalTitles != null ? stats.totalTitles : 0 }}
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({ stats: { type: Object, required: true } });
</script>

<style scoped>
.numero {
  font-size: 2.4rem;
}

.p-card {
  /* border: 3px dashed #d12f0d; */
  border: 3px dashed var(--primary-color);
}

.p-card-content > p {
  font-size: 2.4rem;
  color: #af2f14;
  text-align: center;
}
</style>
